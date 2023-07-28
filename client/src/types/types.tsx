import { Data, Config, Layout } from "plotly.js";

export interface Coordinates {
  startJunction: [number, number] | null;
  endJunction: [number, number] | null;
  // otherJunctions: [number, number][];
  startClick: [number, number] | null;
  endClick: [number, number] | null;
  // otherClicks: [number, number][];
  sjid: number | null;
  ejid: number | null;
}

export interface TableItem {
  id: string;
  time: string;
  charge: string;
  probability: number;
}

export interface SearchResults {
  lat: number | null;
  long: number | null;
  label: string | null;
}

export interface SquareData {
  x: [Date, Date];
  y: [number, number];
  probability: number;
}

export interface PlotData {
  data: Data[] | undefined;
  config: Partial<Config> | undefined;
  layout: Partial<Layout> | undefined;
}

export interface Loading {
  start: "loading" | "error" | "succ" | null;
  end: "loading" | "error" | "succ" | null;
  // other: "loading" | "error" | "succ" | null;
  [key: string]: string | null;
}

export interface Charger {
  addr_id: number | null;
  connections_js: {
    Amps: number | null;
    ConnectionTypeID: number | null;
    CurrentTypeID: number | null;
    ID: number | null;
    LevelID: number | null;
    PowerKW: number | null;
    Quantity: number | null;
    StatusTypeID: number | null;
    Voltage: number | null;
  } | null;
  connections_power_kw_total: number | null;
  data_provider_id: number | null;
  data_quality_level: number | null;
  date_created: string | null;
  date_last_status_update: string | null;
  date_last_verified: string | null;
  geogr: string | null;
  geojson: { type: string | null; coordinates: [number, number] | null } | null;
  geom: string | null;
  id: number;
  is_recently_verified: boolean | null;
  number_of_points: number | null;
  operator_id: number | null;
  snap_node_dist: number | null;
  snap_node_id: number | null;
  status_type_id: number | null;
  submission_status_type_id: number | null;
  usagetype_id: number | null;
  uuid: string | null;
}

export interface FormParameters {
  idFrom: number | null;
  idTo: number | null;
  fromSec: number | null;
  toSec: number | null;
  initCh: number | null;
  car: CarStatus | null;
  fromDate: Date | null;
  toDate: Date | null;
  noOfRoutes: number | null;
  temp: number | null;
  weather: string | null;
  detour: number | null;
  model: string | null;
}

export interface CarStatus {
  mass: number;
  batt_size_wh: number;
  internalmomentofinertia: number;
  fronsurfacearea: number;
  airdragcoef: number;
  rolldragcoef: number;
  radialdragcoef: number;
  constantpowerintake: number;
  propulsioneficiency: number;
  recuperationeficiency: number;
}

export interface VuResponse {
  id: number;
  qidfrom: number;
  qidto: number;
  qcar: CarStatus;
  qfromdate: Date;
  qtodate: Date;
  qfromsec: number;
  qtosec: number;
  qkroutno: number;
  qinitcharge: number;
  qother: any;
  status: string;
  kresult: [Legs];
  tt: any;
}

export interface Legs {
  charging_stop: {
    ID: number;
    Node_ID: number;
  };
  lb: {
    arrival_time: number;
    charge_from: number;
    charge_to: number;
    departure_time: number;
    extra_ch_needed: number;
    path: [[number, number]];
  };
  leg_id: number;
  parent: number;
  ub: {
    arrival_time: number;
    charge_from: number;
    charge_to: number;
    departure_time: number;
    extra_ch_needed: number;
    path: [[number, number]];
    geoJsonGeometry: {
      type: "LineString";
      coordinates: [[number, number]];
    };
  };
}
