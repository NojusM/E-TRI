import { MapContainer } from "react-leaflet";
import LayerControl from "./pages/map/LayerControl";
import Click from "./pages/map/Click";
import "./App.css";
import "./Map.css";
import Sidebar from "./pages/sidebar/Sidebar";
import SearchMarker from "./pages/map/SearchMarker";
import Markers from "./pages/map/Markers";
import { useContext } from "react";
import { AlertsContext } from "./context/AlertsContext";
import useLoading from "./hooks/useLoading";

export default function App() {
  const { Alerts } = useContext(AlertsContext);
  useLoading();

  return (
    <>
      <Alerts />
      <Sidebar />
      <MapContainer
        center={[51.07544, 10.382591]}
        zoom={6}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <LayerControl />
        <Click />
        <Markers />
        <SearchMarker />
      </MapContainer>
    </>
  );
}
