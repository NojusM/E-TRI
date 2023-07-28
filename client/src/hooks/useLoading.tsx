import { useContext, useEffect } from "react";
import { AlertsContext } from "../context/AlertsContext";
import { CoordinateContext } from "../context/CoordinateContext";

export default function useLoading() {
  const { showAlert, cancelAlert } = useContext(AlertsContext);
  const { loading, setLoading } = useContext(CoordinateContext);
  useEffect(() => {
    const propertiesToCheck = ["start", "end"];
    // const propertiesToCheck = ["start", "end", "other"];

    const alertMessage: { [key: string]: string[] } = {
      start: [
        "Fetching starting junction",
        "Failed to find starting junction",
        "Starting junction found",
      ],
      end: [
        "Fetching destination junction",
        "Failed to find destination junction",
        "Destination junction found",
      ],
      // other: [
      //   "Fetching stop junction",
      //   "Failed to find stop junction",
      //   "Stop junction found",
      // ],
    };

    propertiesToCheck.forEach((property) => {
      switch (loading[property]) {
        case "loading":
          cancelAlert(property);
          showAlert(property, alertMessage[property][0], 30, "yellow", true);
          break;
        case "error":
          cancelAlert(property);
          showAlert(property, alertMessage[property][1], 3, "red", false);
          break;
        case "succ":
          cancelAlert(property);
          showAlert(property, alertMessage[property][2], 3, "green", false);
          break;
        default:
          break;
      }
    });
    setLoading({
      start: null,
      end: null,
      // other: null,
    });
  }, [
    loading.start,
    loading.end,
    // loading.other,
    setLoading,
    showAlert,
    cancelAlert,
  ]);
}
