import { OpenStreetMapProvider } from "leaflet-geosearch";
import { SearchResults } from "../types/types";

const provider = new OpenStreetMapProvider();

export default async function autosuggest(input: string) {
  try {
    const searchResults = await provider.search({ query: input });
    const formattedResults: SearchResults[] = searchResults.map((result) => {
      return {
        lat: result.y,
        long: result.x,
        label: result.label,
      };
    });
    return formattedResults;
  } catch (e) {
    console.log(e);
    return [];
  }
}
