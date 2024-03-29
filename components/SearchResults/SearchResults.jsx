import SearchResultCard from "./SearchResultCard";

const SearchResults = (props) => {
  return (
    <div className="container">
      <div className="section">
        <ul>
          {props.results.map((player, index) => (
            <div className="columns is-centered is-mobile" key={index}>
              <div className="column is-two-thirds-desktop is-two-thirds-tablet is-four-fifths-mobile  p-0">
                <SearchResultCard player={player._source.player} key={index} />
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
