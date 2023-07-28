import { useEffect, useContext } from "react";
import { Popup, useMap, Marker } from "react-leaflet";
import { SearchContext } from "../../context/SearchContext";
import PopupButtons from "./PopupButtons";
import searchIcon from "../../assets/search.png";
import L from "leaflet";

const ICON = L.icon({
  iconUrl: searchIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
});

export default function SearchMarker() {
  const map = useMap();
  const { searchCoordinates } = useContext(SearchContext);
  const { lat, long, label } = searchCoordinates;

  useEffect(() => {
    if (!searchCoordinates) return;
    const { lat, long } = searchCoordinates;
    if (lat && long) {
      map.flyTo([lat, long]);
    }
  }, [searchCoordinates, map]);

  return lat === null || long === null ? null : (
    <Marker position={[lat, long]} icon={ICON}>
      <Popup>
        <b>Location:</b> {label} <br />
        <b>Latitude:</b> {parseFloat(lat.toFixed(5))} <br />
        <b>Longtitude:</b> {parseFloat(long.toFixed(5))} <br />
        <PopupButtons coordinates={[lat, long]} />
      </Popup>
    </Marker>
  );
}
