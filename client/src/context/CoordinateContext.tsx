import { createContext } from "react";
import useCoordinates from "../hooks/useCoordinates";
import { Coordinates, Loading } from "../types/types";

interface CoordinateContextProps {
  coordinates: Coordinates;
  setPrimaryCoordinates: (
    clickCoordinates: [number, number],
    name: string
  ) => void;
  removePrimaryCoordinates: (name: string) => void;
  // setOtherCoordinates: (clickCoordinates: [number, number]) => void;
  // removeOtherCoordinates: (index: number) => void;
  loading: Loading;
  setLoading: React.Dispatch<React.SetStateAction<Loading>>;
}

export const CoordinateContext = createContext<CoordinateContextProps>({
  coordinates: {
    startJunction: null,
    endJunction: null,
    // otherJunctions: [],
    startClick: null,
    endClick: null,
    // otherClicks: [],
    sjid: null,
    ejid: null,
  },
  setPrimaryCoordinates: () => {},
  removePrimaryCoordinates: () => {},
  // setOtherCoordinates: () => {},
  // removeOtherCoordinates: () => {},
  loading: { start: null, end: null, other: null },
  setLoading: () => {},
});

export const CoordinateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    coordinates,
    setPrimaryCoordinates,
    removePrimaryCoordinates,
    // setOtherCoordinates,
    // removeOtherCoordinates,
    loading,
    setLoading,
  } = useCoordinates();

  return (
    <CoordinateContext.Provider
      value={{
        coordinates,
        setPrimaryCoordinates,
        removePrimaryCoordinates,
        // setOtherCoordinates,
        // removeOtherCoordinates,
        loading,
        setLoading,
      }}
    >
      {children}
    </CoordinateContext.Provider>
  );
};
