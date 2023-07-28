import axios from "axios";

const CHARGERS_API = `${import.meta.env.VITE_API}/chargers`;

export default async function getChargers() {
  try {
    const response = await axios.get(CHARGERS_API);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch charging stations");
    return [];
  }
}
