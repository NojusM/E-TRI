import { TileLayer, LayersControl } from "react-leaflet";
import Chargers from "./Chargers";
import VuRoute from "./VuRoute";

function LayerControlComponent() {
  return (
    <LayersControl position="bottomright" collapsed={true}>
      <LayersControl.BaseLayer name="CartoDB_Voyager" checked>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains={"abcd"}
          maxNativeZoom={20}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="OpenStreetMap">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Stadia Maps">
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        />
      </LayersControl.BaseLayer>
      <Chargers />
      <VuRoute />
    </LayersControl>
  );
}

export default LayerControlComponent;
