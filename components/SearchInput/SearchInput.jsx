import React, { useState } from "react";
import styles from "./SearchInput.module.scss";
import Router, { useRouter } from "next/router";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput && searchInput.length > 0) {
      Router.push({
        pathname: "/search",
        query: { q: searchInput, page: 1 },
      });
    }
  };
  return (
    <div className="field has-addons">
      <div className="control">
        <form onSubmit={handleSearchSubmit}>
          <input
            className={`${styles["search-input"]} input`}
            type="text"
            placeholder="Find a player"
            onChange={handleSearchInput}
          />
        </form>
      </div>

      <div className="control">
        <a
          className={`${styles["search-button"]} button is-info`}
          onClick={handleSearchSubmit}
        >
          Submit
        </a>
      </div>
    </div>
  );
};

export default SearchInput;
