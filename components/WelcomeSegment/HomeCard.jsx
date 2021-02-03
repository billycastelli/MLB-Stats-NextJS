import styles from "./HomeCard.module.scss";

const HomeCard = () => {
  return (
    <div className={`container ${styles.homeCard}`}>
      <div className="columns">
        <div className="column">
          <div className={`card has-text-centered ${styles.centerCard}`}>
            <div className={`card-content ${styles.centerCard}`}>
              <h1 style={{ fontSize: "1.8em" }}>Analyze Trends</h1>
              <hr />
              <p>Graphically view batting stats of any player over time</p>
              <br />
              <img src="/images/graph-icon.svg" style={{ width: "25%" }} />
            </div>
          </div>
        </div>
        <div className="column">
          <div className={`card has-text-centered ${styles.centerCard}`}>
            <div className={`card-content ${styles.centerCard}`}>
              <h1 style={{ fontSize: "1.8em" }}>Intelligent Search</h1>
              <hr />
              <p>
                Leverages Elasticsearch's fuzzy search API to provide accurate
                results
              </p>
              <br />
              <img src="/images/search-icon.svg" style={{ width: "25%" }} />
            </div>
          </div>
        </div>
        <div className="column">
          <div className={`card has-text-centered ${styles.centerCard}`}>
            <div className={`card-content ${styles.centerCard}`}>
              <h1 style={{ fontSize: "1.8em" }}>Download Statistics</h1>
              <hr />
              <p>Download any set of statistics from a player's profile page</p>
              <br />
              <img src="/images/download-icon.svg" style={{ width: "25%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
