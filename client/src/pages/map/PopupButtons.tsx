import { useContext } from "react";
import { CoordinateContext } from "../../context/CoordinateContext";

export default function PopupButtons({
  coordinates,
}: {
  coordinates: [number, number];
}) {
  // const { setPrimaryCoordinates, setOtherCoordinates } =
  const { setPrimaryCoordinates } = useContext(CoordinateContext);
  return (
    <div className="buttons">
      <button
        className="button"
        onClick={() => setPrimaryCoordinates(coordinates, "start")}
      >
        Start
      </button>
      <button
        className="button"
        onClick={() => setPrimaryCoordinates(coordinates, "end")}
      >
        End
      </button>
      {/* <button
        className="button"
        onClick={() => setOtherCoordinates(coordinates)}
      >
        Add to route
      </button> */}
    </div>
  );
}
