import { useState } from "react";
import CompareInput from "../SearchInput/CompareInput";
import CompareResults from "../SearchResults/CompareResults";

const CompareSearch = () => {
  const [query, setQuery] = useState(undefined);
  const [resultDisplay, setResultsDisplay] = useState(true);

  const updateQuery = (query) => {
    setQuery(query);
    setResultsDisplay(true);
  };

  return (
    <>
      <CompareInput updateQuery={updateQuery} />
      {query && (
        <CompareResults
          query={query}
          display={resultDisplay}
          setDisplay={setResultsDisplay}
        />
      )}
    </>
  );
};

export default CompareSearch;
