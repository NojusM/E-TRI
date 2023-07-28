import { Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { useContext } from "react";
import { CoordinateContext } from "../../context/CoordinateContext";
import markerIcon from "../../assets/marker_icon_foot.png";

const ICON = L.icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
});

interface Props {
  clickCoordinates: [number, number];
  junctionCoordinates: [number, number];
  marker: string;
  index?: number | undefined;
}

export default function CustomMarker({
  clickCoordinates,
  junctionCoordinates,
  marker,
  index = undefined,
}: Props) {
  // const { removePrimaryCoordinates, removeOtherCoordinates } =
  const { removePrimaryCoordinates } = useContext(CoordinateContext);

  var clickName = "";
  var junctionName = "";
  var coordinateName = ["", ""];

  switch (marker) {
    case "start":
      clickName = "Starting point";
      junctionName = "Route start";
      coordinateName = ["startClick", "startJunction"];
      break;
    case "end":
      clickName = "Destination";
      junctionName = "Route end";
      coordinateName = ["endClick", "endJunction"];
      break;
    // case "other":
    //   if (typeof index !== "undefined") {
    //     clickName = `Waypoint ${index + 1}`;
    //     junctionName = `Route stop ${marker + 1}`;
    //   }
    //   break;
  }

  function removeCoordinate() {
    if (typeof index !== "undefined") {
      // removeOtherCoordinates(index);
    } else {
      removePrimaryCoordinates(coordinateName[0]);
      removePrimaryCoordinates(coordinateName[1]);
    }
  }

  return (
    <>
      <Marker
        position={clickCoordinates}
        key={clickCoordinates + "marker"}
        icon={ICON}
      >
        <Popup>
          <div>
            <b>{clickName}</b>
            <p>
              <b>Position: </b>
              {parseFloat(clickCoordinates[0].toFixed(5))}

              <b> lat </b>
              {parseFloat(clickCoordinates[1].toFixed(5))}
              <b> lng</b>
            </p>
            <div className="buttons">
              <button
                className="button"
                onClick={() => {
                  removeCoordinate();
                }}
              >
                Remove waypoint
              </button>
            </div>
          </div>
        </Popup>
      </Marker>
      <Marker
        position={junctionCoordinates}
        key={junctionCoordinates + "marker"}
      >
        <Popup>
          <div>
            <b>{junctionName}</b>
            <p>
              <b>Position: </b>
              {parseFloat(junctionCoordinates[0].toFixed(5))}

              <b> lat </b>
              {parseFloat(junctionCoordinates[1].toFixed(5))}
              <b> lng</b>
            </p>
            <div className="buttons">
              <button
                className="button"
                onClick={() => {
                  removeCoordinate();
                }}
              >
                Remove waypoint
              </button>
            </div>
          </div>
        </Popup>
      </Marker>
      <Polyline
        positions={[clickCoordinates, junctionCoordinates]}
        pathOptions={{ color: "black", weight: 7 }}
        key={` ${clickCoordinates} + ${junctionCoordinates} + polyline1 `}
      />
      <Polyline
        positions={[clickCoordinates, junctionCoordinates]}
        pathOptions={{ color: "white", weight: 3, dashArray: "5, 10" }}
        key={` ${clickCoordinates} + ${junctionCoordinates} + polyline2 `}
      />
    </>
  );
}
