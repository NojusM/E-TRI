import { useState, useContext } from "react";
import { FormContext } from "../../context/FormContext";
import { CoordinateContext } from "../../context/CoordinateContext";
import { CarStatus } from "../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faSun,
  faCloudRain,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";

interface FormDate {
  fromDate: Date;
  fromSeconds: number;
  toDate: Date;
  toSeconds: number;
}

export default function RouteForm() {
  const { setFormParameters } = useContext(FormContext);
  const { coordinates } = useContext(CoordinateContext);
  const [initialCharge, setInitialCharge] = useState<number | null>(null);
  const [toggleCars, setToggleCars] = useState(false);
  const [noOfRoutes, setNoOfRoutes] = useState(1);
  const [weather, setWeather] = useState("sun");
  const [detour, setDetour] = useState<number | null>(null);
  const [temp, setTemp] = useState<number | null | "-">(null);
  const [model, setModel] = useState("Machine Learning");
  const [carParamsValid, setCarParamsValid] = useState(true);
  const [carStats, setCarStatus] = useState<CarStatus>({
    mass: 1715,
    batt_size_wh: 62000,
    internalmomentofinertia: 0.01,
    fronsurfacearea: 2.54,
    airdragcoef: 0.28,
    rolldragcoef: 0.01,
    radialdragcoef: 0.3,
    constantpowerintake: 200,
    propulsioneficiency: 0.82,
    recuperationeficiency: 0.8,
  });
  const [formDate, setFormDate] = useState<FormDate>({
    fromDate: new Date(),
    fromSeconds: 0,
    toDate: new Date(),
    toSeconds: 0,
  });
  const carParameters = [
    "Mass",
    "Battery size (wh)",
    "Moment of inertia",
    "Front surface area",
    "Air drag coefficient",
    "Roll drag coefficient",
    "Radial drag coefficient",
    "Constant power intake",
    "Propulsion efficiency",
    "Recuperation efficiency",
  ];

  function handleDateSelect(
    e: React.ChangeEvent<HTMLInputElement>,
    inputRef: number
  ) {
    const tempDate = new Date(e.target.value);
    const timeZoneOffsetMinutes = new Date().getTimezoneOffset();
    tempDate.setMinutes(tempDate.getMinutes() - timeZoneOffsetMinutes);

    const hours = tempDate.getHours();
    const minutes = tempDate.getMinutes();
    const seconds = tempDate.getSeconds();

    const totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    if (inputRef === 0) {
      setFormDate(() => ({
        toDate: tempDate,
        toSeconds: totalSeconds,
        fromDate: tempDate,
        fromSeconds: totalSeconds,
      }));
    } else {
      if (formDate.fromDate < tempDate) {
        setFormDate((current) => ({
          ...current,
          toDate: tempDate,
          toSeconds: totalSeconds,
        }));
      } else {
        setFormDate((current) => ({
          ...current,
          toDate: tempDate,
          toSeconds: totalSeconds,
          fromDate: tempDate,
          fromSeconds: totalSeconds,
        }));
      }
    }
  }

  function handleCarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (/^\d+$/.test(value)) {
      const trueValue = parseInt(value, 10);

      setCarStatus((current) => ({
        ...current,
        [name]: trueValue,
      }));
      setCarParamsValid(true);
    } else {
      setCarStatus((current) => ({
        ...current,
        [name]: null,
      }));
      setCarParamsValid(false);
    }
  }

  function handleRouteFinder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (temp === "-" || temp === null) setTemp(0);
    if (detour === null) setDetour(0);
    setFormParameters({
      idFrom: coordinates.sjid,
      idTo: coordinates.ejid,
      fromSec: formDate.fromSeconds,
      toSec: formDate.toSeconds,
      initCh: initialCharge,
      car: carStats,
      fromDate: formDate.fromDate,
      toDate: formDate.toDate,
      noOfRoutes: noOfRoutes,
      temp: temp === "-" ? 0 : temp === null ? 0 : temp,
      weather: weather,
      detour: detour === null ? 0 : detour,
      model: model,
    });
  }

  function handleWeatherSelect(weather: string) {
    setWeather(weather);
  }
  function handleTempSelect(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    if (value === "-") {
      setTemp("-");
      return;
    }

    if (/^-?\d*$/.test(value) && value != "") {
      const temp = parseInt(value, 10);

      if (temp > 100) {
        setTemp(100);
      } else if (temp < -100) {
        setTemp(-100);
      } else {
        setTemp(temp);
      }
    } else {
      setTemp(null);
    }
  }

  function handleDetourSelect(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    if (/^\d+$/.test(value)) {
      const detour = parseInt(value, 10);
      if (detour > 100) {
        setDetour(100);
      } else if (detour < 0) {
        setDetour(0);
      } else {
        setDetour(detour);
      }
    } else {
      setDetour(null);
    }
  }

  function handleModelSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = parseInt(e.target.value);
    if (value === 1) setModel("Machine Learning");
    else setModel("Physical");
  }

  function handleInitialCharge(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    if (/^\d+$/.test(value)) {
      const initialCharge = parseInt(value, 10);
      if (initialCharge > 100) {
        setInitialCharge(100);
      } else if (initialCharge < 0) {
        setInitialCharge(0);
      } else {
        setInitialCharge(initialCharge);
      }
    } else {
      setInitialCharge(null);
    }
  }

  function handleCarButtonClick() {
    if (carParamsValid) {
      setToggleCars((current) => !current);
    }
  }

  return (
    <>
      <div className="chapter">Routing</div>
      <form className="routing-form" onSubmit={handleRouteFinder}>
        <div className="vu-form">
          <div className="select-input">
            <label htmlFor="nor" className="select-label">
              Number of routes
            </label>
            <select
              id="nor"
              name="nor"
              className="select-field"
              onChange={(e) => setNoOfRoutes(parseInt(e.target.value))}
            >
              <option key="nor1" value={1}>
                1
              </option>
              <option key="nor2" value={2}>
                2
              </option>
              <option key="nor3" value={3}>
                3
              </option>
            </select>
          </div>
          <div className="form-input">
            <input
              type="text"
              id="detour"
              className="form-field"
              value={detour !== null ? detour.toString() : ""}
              onChange={handleDetourSelect}
              placeholder="Charging detour"
              name="detour"
              required
            />
            <label htmlFor="detour" className="form-label">
              Charging detour
            </label>
          </div>
          <div className="date-input">
            <label htmlFor="departure">Aproximate departure time from</label>
            <input
              type="datetime-local"
              id="departure1"
              className="date-field"
              placeholder="Aproximate departure time from"
              value={formDate.fromDate.toISOString().slice(0, 16)}
              onChange={(e) => handleDateSelect(e, 0)}
            />
          </div>
          <div className="date-input">
            <label htmlFor="departure2">Aproximate departure time to</label>
            <input
              type="datetime-local"
              id="departure2"
              className="date-field"
              placeholder="Aproximate departure time to"
              value={formDate.toDate.toISOString().slice(0, 16)}
              onChange={(e) => handleDateSelect(e, 1)}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              id="initialCharge"
              className="form-field"
              placeholder="Initial Charge"
              value={initialCharge === null ? "" : initialCharge}
              onChange={handleInitialCharge}
            />
            <label htmlFor="initialCharge" className="form-label">
              Initial charge
            </label>
          </div>
          <div className="chapter">Energy Estimation</div>
          <button
            className="car-button"
            type="button"
            onClick={handleCarButtonClick}
          >
            Car parameters{" "}
            {toggleCars ? (
              <FontAwesomeIcon icon={faArrowAltCircleUp} />
            ) : (
              <FontAwesomeIcon icon={faArrowAltCircleDown} />
            )}
          </button>
          {toggleCars && (
            <div className="car-param-wrapper">
              {Object.entries(carStats).map(([param, value], index) => (
                <div key={param} className="car-params">
                  <div className="form-input">
                    <input
                      type="text"
                      className="form-field"
                      id={param}
                      name={param}
                      value={value === null ? "" : value.toString()}
                      onChange={handleCarChange}
                      placeholder={carParameters[index]}
                      required
                    />
                    <label htmlFor={param} className="form-label">
                      {carParameters[index]}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="select-input">
            <select
              id="model"
              name="model"
              className="select-field"
              onChange={handleModelSelect}
              required
              placeholder="Model"
            >
              <option key="machine-learning" value={1}>
                Machine Learning
              </option>
              <option key="mathematical" value={2}>
                Physical
              </option>
            </select>
            <label htmlFor="model" className="select-label">
              Model
            </label>
          </div>
          <div className="form-input">
            <input
              type="text"
              id="temp"
              className="form-field"
              value={temp !== null ? temp.toString() : ""}
              onChange={handleTempSelect}
              placeholder="Temperature"
              required
            />
            <label htmlFor="temp" className="form-label">
              Temperature °C
            </label>
          </div>
          <div className="form-input weather-input">
            <label htmlFor="weather" className="form-label">
              Weather
            </label>
            <div className="weather-wrapper">
              <div
                className={`weather ${weather === "sun" ? "sun selected" : ""}`}
                onClick={() => handleWeatherSelect("sun")}
                title="Sunny/Dry"
              >
                <FontAwesomeIcon icon={faSun} spin />
              </div>
              <div
                className={`weather ${
                  weather === "rain" ? "rain selected" : ""
                }`}
                onClick={() => handleWeatherSelect("rain")}
                title="Rain/Wet"
              >
                <FontAwesomeIcon icon={faCloudRain} beatFade />
              </div>
              <div
                className={`weather ${
                  weather === "snow" ? "snow selected" : ""
                }`}
                onClick={() => handleWeatherSelect("snow")}
                title="Snow/Ice"
              >
                <FontAwesomeIcon icon={faSnowflake} spin />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="button route-button">
          Find route
        </button>
      </form>
    </>
  );
}
