import styles from "./WelcomeSegment.module.scss";
import SearchInput from "../SearchInput/SearchInput";

const WelcomeSegment = () => {
  return (
    <div className={styles["welcome-segment"]}>
      <div className="container">
        <div className="section">
          <h1 className={styles["welcome-text"]}>
            SEARCH BASEBALL RECORDS <br />
            WITH ELASTICSEARCH
          </h1>
          <p className={styles["welcome-info"]}>
            Quickly search through decades of historical baseball data
          </p>
          <div className={styles["search-holder"]}>
            <SearchInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSegment;
