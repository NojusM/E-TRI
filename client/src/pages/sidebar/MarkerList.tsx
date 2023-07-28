import { useContext } from "react";
import { CoordinateContext } from "../../context/CoordinateContext";

export default function MarkerList() {
  // const { coordinates, removeOtherCoordinates, removePrimaryCoordinates } =
  const { coordinates, removePrimaryCoordinates } =
    useContext(CoordinateContext);
  const {
    startClick,
    endClick,
    startJunction,
    endJunction,
    // otherClicks,
    // otherJunctions,
  } = coordinates;

  return (
    <>
      <div className="chapter">Markers</div>
      <ul className="marker-list">
        <li>
          <b>Starting at: </b>
          <span>
            {startClick !== null ? (
              <>
                {parseFloat(startClick[0].toFixed(5))} <b>lat</b>,{" "}
                {parseFloat(startClick[1].toFixed(5))} <b>lng</b>
              </>
            ) : (
              "Not selected yet"
            )}
          </span>
          <br />
          <b>Route start: </b>
          <span>
            {startJunction ? (
              <>
                {parseFloat(startJunction[0].toFixed(5))} <b>lat</b>,{" "}
                {parseFloat(startJunction[1].toFixed(5))} <b>lng</b>
              </>
            ) : (
              "Not selected yet"
            )}
          </span>
          {startJunction && (
            <button
              className="button delete"
              onClick={() => {
                removePrimaryCoordinates("startClick");
                removePrimaryCoordinates("startJunction");
              }}
            >
              X
            </button>
          )}
        </li>
        {/* {otherJunctions.map((junction, index) => {
          return (
            <li key={`index + ${junction}`}>
              <b>Waypoint {index + 1}: </b>
              <span>
                {parseFloat(junction[0].toFixed(5))} <b>lat</b>,{" "}
                {parseFloat(junction[1].toFixed(5))} <b>lng</b>
              </span>{" "}
              <br />
              <b>Route stop {index + 1}: </b>
              <span>
                {parseFloat(otherClicks[index][0].toFixed(5))} <b>lat</b>,{" "}
                {parseFloat(otherClicks[index][1].toFixed(5))} <b>lng</b>
              </span>
              {otherJunctions && (
                <button
                  className="button delete"
                  onClick={() => {
                    removeOtherCoordinates(index);
                  }}
                >
                  X
                </button>
              )}
            </li>
          );
        })} */}
        <li>
          <b>Destination: </b>
          <span>
            {endClick ? (
              <>
                {parseFloat(endClick[0].toFixed(5))} <b>lat</b>,{" "}
                {parseFloat(endClick[1].toFixed(5))} <b>lng</b>
              </>
            ) : (
              "Not selected yet"
            )}
          </span>
          <br />
          <b>Route end: </b>
          <span>
            {endJunction ? (
              <>
                {parseFloat(endJunction[0].toFixed(5))} <b>lat</b>,{" "}
                {parseFloat(endJunction[1].toFixed(5))} <b>lng</b>
              </>
            ) : (
              "Not selected yet"
            )}
          </span>
          {endJunction && (
            <button
              className="button delete"
              onClick={() => {
                removePrimaryCoordinates("endClick");
                removePrimaryCoordinates("endJunction");
              }}
            >
              X
            </button>
          )}
        </li>
      </ul>
    </>
  );
}
