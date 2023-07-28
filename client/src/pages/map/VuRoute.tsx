import { useContext, useEffect, useRef, useState } from "react";
import { FeatureGroup, Marker, GeoJSON as RouteDraw } from "react-leaflet";
import { AlertsContext } from "../../context/AlertsContext";
import ROUTES from "../../data/vu-example.json";
import polyline from "polyline";
import { GeoJsonObject } from "geojson";
import { VuContext } from "../../context/VuContext";

export default function VuRoute() {
  const { showAlert, cancelAlert } = useContext(AlertsContext);
  const { vuResponse, vuLoading, setVuLoading } = useContext(VuContext);
  const [clickedLayerIndex, setClickedLayerIndex] = useState<number | null>(
    null
  );
  const selectedRoutes = [1];
  const layerRefs: any[][] = [];

  useEffect(() => {
    const alertMessage = [
      "Searching for VU route",
      "Failed to find VU route",
      "VU Route found",
    ];

    switch (vuLoading) {
      case "loading":
        cancelAlert("vuroute");
        showAlert("vuroute", alertMessage[0], 0, "yellow", true);
        break;
      case "error":
        cancelAlert("vuroute");
        showAlert("vuroute", alertMessage[1], 3, "red", false);
        break;
      case "succ":
        cancelAlert("vuroute");
        showAlert("vuroute", alertMessage[2], 3, "green", false);
        break;
      default:
        break;
    }
    setVuLoading(null);
  }, [vuLoading, setVuLoading, showAlert, cancelAlert]);

  function routeClickHandler(routeIndex: number) {
    setClickedLayerIndex(routeIndex);
  }

  // useEffect(() => {
  //   layerRefs.forEach((leg, legIndex) => {
  //     leg.forEach((ref, index) => {
  //       if (ref && ref.current) {
  //         const style = {
  //           color:
  //             index === clickedLayerIndex
  //               ? legIndex % 2 === 0
  //                 ? "red"
  //                 : "green"
  //               : "grey",
  //           opacity: index === clickedLayerIndex ? 1 : 0.5,
  //           weight: index === clickedLayerIndex ? 5 : 3,
  //         };
  //         if (index === clickedLayerIndex) {
  //           ref.current.bringToFront();
  //         }
  //         ref.current.setStyle(style);
  //       }
  //     });
  //   });
  // }, [clickedLayerIndex]);

  const ref: any = useRef();
  return (
    <>
      {ROUTES.map((route, index) => {
        if (!selectedRoutes.includes(index)) return;
        const geojson = route.kresult[0].ub.geojsonGeometry;

        return (
          <RouteDraw
            data={geojson as GeoJsonObject}
            key={route.id}
            style={{
              color: "blue",
              weight: 3,
              opacity: 0.9,
            }}
            // ref={ref}
            // onEachFeature={(feature, layer) => {
            //   layer.bindPopup(`Segment`);
            //   layer.on({
            //     click: () => ref.current.bringToFront(),
            //   });
            // }}
          />
        );
      })}
    </>
  );
}

function secTo24h(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
