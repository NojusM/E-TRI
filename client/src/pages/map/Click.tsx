import { useContext, useState } from "react";
import { useMapEvents, Popup } from "react-leaflet";
import { CoordinateContext } from "../../context/CoordinateContext";
import PopupButtons from "./PopupButtons";

export default function Click() {
  const { coordinates } = useContext(CoordinateContext);
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <div>
      <div>{coordinates.endClick}</div>
      <Popup key={"ClickMarker"} position={position}>
        <PopupButtons coordinates={position} />
      </Popup>
    </div>
  );
}
