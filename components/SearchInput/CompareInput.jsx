import { useState } from "react";
import styles from "./CompareInput.module.scss";

const CompareInput = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    props.setQuery(searchInput);
  };
  return (
    <div className={`field has-addons ${styles["compare-input-div"]}`}>
      <div className="control">
        <form onSubmit={handleSearchSubmit}>
          <input
            className={`input`}
            type="text"
            placeholder="Find a player"
            onChange={handleSearchInput}
          />
        </form>
      </div>

      <div className="control">
        <a className={`button is-info`} onClick={handleSearchSubmit}>
          Submit
        </a>
      </div>
    </div>
  );
};

export default CompareInput;
