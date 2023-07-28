import { useQuery } from "@tanstack/react-query";
import { Popup, LayerGroup, LayersControl, Marker } from "react-leaflet";
import { useMemo, useEffect, useState, useContext } from "react";
import { Charger } from "../../types/types";
import getChargers from "../../api/getChargers";
import PopupButtons from "./PopupButtons";
import { AlertsContext } from "../../context/AlertsContext";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import chargerIcon10 from "../../assets/charging_station_10.png";
import chargerIcon20 from "../../assets/charging_station_20.png";
import chargerIcon50 from "../../assets/charging_station_50.png";
import chargerIcon00 from "../../assets/charging_station_50+.png";
export interface Chargers {
  red: JSX.Element[] | [];
  yellow: JSX.Element[] | [];
  green: JSX.Element[] | [];
  cyan: JSX.Element[] | [];
  black: JSX.Element[] | [];
}
const ICON10 = L.icon({
  iconUrl: chargerIcon10,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
});
const ICON20 = L.icon({
  iconUrl: chargerIcon20,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
});
const ICON50 = L.icon({
  iconUrl: chargerIcon50,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
});
const ICON00 = L.icon({
  iconUrl: chargerIcon00,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
});

export default function Chargers() {
  const chargerQuery = useQuery({
    queryKey: ["chargers"],
    queryFn: getChargers,
  });
  const { showAlert, cancelAlert } = useContext(AlertsContext);
  const [chargingStations, setChargingStations] = useState<Chargers>();

  const markers = useMemo(() => {
    return function markers(ch: Charger, icon: L.Icon<L.IconOptions>) {
      if (ch.geojson === null || ch.geojson.coordinates === null) return <></>;
      return (
        <Marker key={ch.id} position={ch.geojson.coordinates} icon={icon}>
          <Popup position={ch.geojson.coordinates}>
            <div>
              <p>{`Total power: ${ch.connections_power_kw_total} kw`}</p>
              <p>{`Coordinates: ${ch.geojson.coordinates}`}</p>
              {ch.geojson?.coordinates && (
                <PopupButtons coordinates={ch.geojson.coordinates} />
              )}
            </div>
          </Popup>
        </Marker>
      );
    };
  }, []);

  useEffect(() => {
    if (chargerQuery.data && chargerQuery.data.length > 0) {
      const sortedData: Chargers = chargerQuery.data.reduce(
        (acc: any, ch: Charger) => {
          if (ch.geojson === null || ch.geojson.coordinates === null) {
          } else if (ch.connections_power_kw_total !== null) {
            const total_kw = ch.connections_power_kw_total;
            if (total_kw <= 10) {
              acc.red.push(markers(ch, ICON10));
            } else if (total_kw <= 20) {
              acc.yellow.push(markers(ch, ICON20));
            } else if (total_kw <= 50) {
              acc.green.push(markers(ch, ICON50));
            } else {
              acc.cyan.push(markers(ch, ICON00));
            }
          }
          return acc;
        },
        { red: [], yellow: [], green: [], cyan: [], black: [] }
      );
      setChargingStations(sortedData);
    }
  }, [chargerQuery.data]);

  useEffect(() => {
    if (chargerQuery.isLoading) {
      showAlert(
        "chargers-loading",
        "Charging stations are being loaded.",
        0,
        "yellow",
        true
      );
    } else if (chargerQuery.isError || chargerQuery.data.length === 0) {
      cancelAlert("chargers-loading");
      showAlert(
        "chargers-error",
        "Charging stations failed to load.",
        3,
        "red",
        false
      );
    } else if (chargerQuery.isSuccess) {
      cancelAlert("chargers-loading");
      showAlert(
        "chargers-loaded",
        "Charging stations loaded!",
        3,
        "green",
        false
      );
    }
  }, [chargerQuery.isLoading, chargerQuery.isError, chargerQuery.isSuccess]);

  return (
    <>
      <LayersControl.Overlay key={"markers"} name="Charging stations" checked>
        <LayerGroup>
          <MarkerClusterGroup chunkedLoading>
            {chargingStations && (
              <>
                {chargingStations.red && chargingStations.red}
                {chargingStations.yellow && chargingStations.yellow}
                {chargingStations.green && chargingStations.green}
                {chargingStations.cyan && chargingStations.cyan}
                {chargingStations.black && chargingStations.black}
              </>
            )}
          </MarkerClusterGroup>
        </LayerGroup>
      </LayersControl.Overlay>
    </>
  );
}
