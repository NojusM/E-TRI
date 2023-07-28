import axios from "axios";
import { FormParameters } from "../types/types";

const ROUTER_API = `${import.meta.env.VITE_API}/router/vu`;
let activeRequest: any = null;

export default async function getVuRoute(formParameters: FormParameters) {
  try {
    if (activeRequest) {
      activeRequest.cancel();
    }
    const cancelToken = axios.CancelToken.source();
    activeRequest = cancelToken;

    const response = await axios.post(`${ROUTER_API}`, formParameters, {
      cancelToken: cancelToken.token,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request cancelled by user");
      return "cancel";
    } else {
      console.error("Failed to fetch route!");
      return "error";
    }
  }
}
