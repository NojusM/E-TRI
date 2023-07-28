import axios from "axios";

const JUNCTIONS_API = `${import.meta.env.VITE_API}/junction`;

type coordinates = [number, number];

const activeRequests: { [key: string]: any } = {};

export default async function getJunction(
  coordinates: coordinates,
  type: string
) {
  try {
    if (activeRequests[type]) {
      activeRequests[type].cancel();
    }
    const cancelToken = axios.CancelToken.source();
    activeRequests[type] = cancelToken;

    const response = await axios.get(
      `${JUNCTIONS_API}/${coordinates[0]}/${coordinates[1]}`,
      {
        cancelToken: cancelToken.token,
      }
    );

    return [
      response.data.geojson.coordinates.reverse(),
      response.data.katch_vertex_id,
    ];
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request cancelled by user");
      return "cancel";
    } else {
      console.error("Failed to fetch junction coordinates");
      console.error(error);
      return "error";
    }
  }
}
