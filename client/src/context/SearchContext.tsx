import { createContext, useState } from "react";
import { SearchResults } from "../types/types";

interface SearchContextProps {
  searchCoordinates: SearchResults;
  setSearchCoordinates: React.Dispatch<React.SetStateAction<SearchResults>>;
}

export const SearchContext = createContext<SearchContextProps>({
  searchCoordinates: { lat: null, long: null, label: null },
  setSearchCoordinates: () => {},
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchCoordinates, setSearchCoordinates] = useState<SearchResults>({
    lat: null,
    long: null,
    label: null,
  });
  return (
    <SearchContext.Provider
      value={{
        searchCoordinates,
        setSearchCoordinates,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
