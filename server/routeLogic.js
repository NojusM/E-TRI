async function fetchCoordinates(client, id) {
  try {
    const data = await client.query("REDACTED", [id]);

    const row = data.rows[0];
    row.geojson = JSON.parse(row.geojson);
    return row.geojson.coordinates;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

const handleVURequest = async (client, req, res) => {
  const routingReq = req.body;
  try {
    const insertQuery = "REDACTED";
    const selectQuery = "REDACTED";
    const values = [
      routingReq.idFrom,
      routingReq.idTo,
      routingReq.car,
      routingReq.fromDate,
      routingReq.toDate,
      routingReq.fromSec,
      routingReq.toSec,
      routingReq.noOfRoutes,
      routingReq.initCh,
    ];

    const insertResult = await client.query(insertQuery, values);
    const insertedId = insertResult.rows[0].id;

    let data = null;
    let retries = 0;
    const maxRetries = 60;

    while (retries < maxRetries) {
      const selectResult = await client.query(selectQuery, [insertedId]);
      data = selectResult.rows[0];

      if (data) {
        break;
      }

      retries++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (retries === maxRetries) {
      // Maximum retries reached, handle the error or timeout condition
      res.status(500).send("Data retrieval timed out");
    } else {
      // Send the data back in the response
      const car = JSON.parse(data.qcar);
      const qidfrom = await Promise.all(fetchCoordinates(client, data.qidfrom));
      const qidto = await Promise.all(fetchCoordinates(client, data.qidto));
      const legs = JSON.parse(data.kresult);
      const legsWithCoords = await Promise.all(
        legs.map(async (leg) => {
          const path = leg.ub.path;
          const coordinates = await Promise.all(
            path.map(async (id) => await fetchCoordinates(client, id))
          );

          const geojsonGeometry = {
            type: "LineString",
            coordinates: coordinates,
          };

          leg.ub.path = coordinates;
          leg.ub.geojsonGeometry = geojsonGeometry;
          return leg;
        })
      );

      res.send({
        ...data,
        kresult: legsWithCoords,
        qcar: car,
        qidfrom: qidfrom,
        qidto: qidto,
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to fetch route");
  }
};

module.exports = handleVURequest;
