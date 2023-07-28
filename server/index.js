const express = require("express");
const cors = require("cors");
// const https = require("https"); // https module to create a ssl enabled server
const path = require("path"); // path module
// const fs = require("fs"); //file system module
const client = require("./db");
const handleVURequest = require("./routeLogic");

const PORT = 5000;
const app = express();
//middleware
app.use(cors());
app.use(express.json());
// Serve front-end
app.use(express.static(path.join(__dirname, "build")));

//get charging stations
app.get("/api/chargers", async (req, res) => {
  try {
    const data = await client.query("REDACTED");
    data.rows.forEach((row) => {
      row.geojson = JSON.parse(row.geojson);
      row.geojson.coordinates = row.geojson.coordinates.reverse();
    });
    res.send(data.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get junctions
app.get("/api/junction/:lat/:lon", async (req, res) => {
  try {
    const latLon = Object.values(req.params);
    const data = await client.query("REDACTED", [latLon[1], latLon[0]]);

    const row = data.rows[0];
    row.geojson = JSON.parse(row.geojson);

    res.send(row);
  } catch (error) {
    console.error(error.message);
  }
});

//get route VU
app.post("/api/router/vu", (req, res) => {
  handleVURequest(client, req, res);
});

//Prevent asking for icon
app.get("/favicon.ico", (req, res) => res.status(204));

// const options = {
//   key: fs.readFileSync(path.join(__dirname, "./cert/key.pem")),
//   cert: fs.readFileSync(path.join(__dirname, "./cert/cert.pem")),
// };

// const sslserver = https.createServer(options, app);

// sslserver.listen(PORT, () => {
//   console.log(`Secure Server is listening on port ${PORT}`);
// });

// Serve the index.html file for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5000, () => {
  console.log(`Server is listening on port ${PORT}`);
});

client.connect();
