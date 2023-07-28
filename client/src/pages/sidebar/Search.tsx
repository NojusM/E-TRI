import { useState, useContext } from "react";
import getSearchResults from "../../api/getSearch";
import { SearchContext } from "../../context/SearchContext";
import { SearchResults } from "../../types/types";

export default function Search() {
  const [suggestions, setSuggestions] = useState<SearchResults[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { setSearchCoordinates } = useContext(SearchContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.currentTarget.value);
    setShowSuggestions(true);
    getSearchResults(e.currentTarget.value).then((res: SearchResults[]) => {
      setSuggestions(res);
    });
  };

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const suggestion = suggestions.find(
      (suggestion: SearchResults) =>
        suggestion.label === e.currentTarget.innerText
    );
    if (suggestion !== undefined) {
      setSearchCoordinates(suggestion);
    }
    setSuggestions([]);
    setUserInput(e.currentTarget.innerText);
    setShowSuggestions(false);
  };
  const onMouseOut = () => {
    // setShowSuggestions(false);
  };
  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (suggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions" onMouseLeave={onMouseOut}>
          {suggestions.map((suggestion, index) => {
            return (
              <li
                key={`${suggestion.lat}  ${suggestion.long}`}
                onClick={onClick}
              >
                {suggestion.label}
              </li>
            );
          })}
        </ul>
      );
    }
  }

  return (
    <>
      <div className="chapter">Search</div>
      <div className="search-wrapper">
        <input
          autoComplete="off"
          id="search-1"
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={onChange}
          value={userInput}
        />
        {suggestionsListComponent}
      </div>
    </>
  );
}
