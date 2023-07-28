import { useState } from "react";
import getJunction from "../api/getJunction";
import { Coordinates, Loading } from "../types/types";

export default function useCoordinates() {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    startJunction: null,
    endJunction: null,
    // otherJunctions: [],
    startClick: null,
    endClick: null,
    // otherClicks: [],
    sjid: null,
    ejid: null,
  });

  const [loading, setLoading] = useState<Loading>({
    start: null,
    end: null,
    other: null,
  });

  async function setPrimaryCoordinates(
    clickCoordinates: [number, number],
    name: string
  ) {
    var coordinateName: Array<keyof Coordinates> = [];
    if (name === "start") {
      coordinateName = ["startClick", "startJunction", "sjid"];
    } else if (name === "end") {
      coordinateName = ["endClick", "endJunction", "ejid"];
    } else {
      return;
    }

    setLoading((current) => ({ ...current, [name]: "loading" }));
    const junctionCoordinates = await getJunction(clickCoordinates, name);
    if (junctionCoordinates === "error") {
      setLoading((current) => ({ ...current, [name]: "error" }));
      return;
    } else if (junctionCoordinates === "cancel") {
      setLoading((current) => ({ ...current, [name]: null }));
      return;
    }
    setLoading((current) => ({ ...current, [name]: "succ" }));

    setCoordinates((coordinates) => ({
      ...coordinates,
      [coordinateName[0]]: clickCoordinates,
      [coordinateName[1]]: junctionCoordinates[0],
      [coordinateName[2]]: junctionCoordinates[1],
    }));
  }

  function removePrimaryCoordinates(name: string) {
    setCoordinates((coordinates) => ({
      ...coordinates,
      [name]: null,
    }));
  }

  // async function setOtherCoordinates(clickCoordinates: [number, number]) {
  //   setLoading((current) => ({ ...current, other: "loading" }));
  //   const junctionCoordinates = await getJunction(clickCoordinates, "other");
  //   if (junctionCoordinates === "error") {
  //     setLoading((current) => ({ ...current, other: "error" }));
  //     return;
  //   } else if (junctionCoordinates === "cancel") {
  //     setLoading((current) => ({ ...current, other: null }));
  //     return;
  //   }
  //   setLoading((current) => ({ ...current, other: "succ" }));

  //   setCoordinates((coordinates) => ({
  //     ...coordinates,
  //     ["otherClicks"]: [...(coordinates.otherClicks || []), clickCoordinates],
  //     ["otherJunctions"]: [
  //       ...(coordinates.otherJunctions || []),
  //       junctionCoordinates[0],
  //     ],
  //   }));
  // }

  // function removeOtherCoordinates(index: number) {
  //   setCoordinates((coordinates) => {
  //     var arrayC = coordinates["otherClicks"];
  //     var arrayJ = coordinates["otherJunctions"];
  //     if (arrayC && arrayJ) {
  //       arrayC.splice(index, 1);
  //       arrayJ.splice(index, 1);
  //       return {
  //         ...coordinates,
  //         ["otherClicks"]: arrayC,
  //         ["otherJunctions"]: arrayJ,
  //       };
  //     }
  //     return coordinates;
  //   });
  // }

  return {
    coordinates,
    setPrimaryCoordinates,
    removePrimaryCoordinates,
    // setOtherCoordinates,
    // removeOtherCoordinates,
    loading,
    setLoading,
  };
}
