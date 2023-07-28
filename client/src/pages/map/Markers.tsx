import { useContext } from "react";
import CustomMarker from "./CustomMarker";
import { CoordinateContext } from "../../context/CoordinateContext";

export default function Markers() {
  const { coordinates } = useContext(CoordinateContext);
  return (
    <>
      {coordinates.startClick && coordinates.startJunction && (
        <CustomMarker
          clickCoordinates={coordinates.startClick}
          junctionCoordinates={coordinates.startJunction}
          marker={"start"}
        />
      )}
      {coordinates.endClick && coordinates.endJunction && (
        <CustomMarker
          clickCoordinates={coordinates.endClick}
          junctionCoordinates={coordinates.endJunction}
          marker={"end"}
        />
      )}

      {/* {coordinates.otherClicks.length > 0 &&
        coordinates.otherJunctions.length > 0 &&
        coordinates.otherClicks.map(([lng, lat], index) => (
          <CustomMarker
            key={`${lng}${lat}${index}`}
            clickCoordinates={[lng, lat]}
            junctionCoordinates={coordinates.otherJunctions[index]}
            marker={"other"}
            index={index}
          />
        ))} */}
    </>
  );
}
