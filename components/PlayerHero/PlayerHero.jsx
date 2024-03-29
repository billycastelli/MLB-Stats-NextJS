import styles from "./PlayerHero.module.scss";

const PlayerHero = (props) => {
  return (
    <div className={`container ${styles.customMobile} ${styles.heroContainer}`}>
      {/* <div classname="container"> */}
      {/* <div className={`columns is-centered is-mobile ${styles.banner}`}>
        <div className="column is-four-fifths-desktop is-four-fifths-tablet is-full-mobile"> */}
      <div className="columns is-centered">
        <div className="column is-two-thirds">
          <h1 className={styles.playerName}>{props.data.name}</h1>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <p>Bats: {props.data.bats}</p>
              <p>
                DOB: {props.data.birthmonth}/{props.data.birthday}/
                {props.data.birthyear}
              </p>
              <p>
                From: {props.data.birthcity}, {props.data.birthcountry}
              </p>
            </div>
            <div className="column is-two-fifths">
              <div className={styles.quickStats}>
                <div className={styles.quickStatsTitle}>
                  <span>
                    Highlights <img src="/images/emoji_events-24px.svg" />
                  </span>
                </div>
                <div className="columns is-mobile">
                  <div className="column">
                    <p className={styles.highlightLabel}>HITS</p>
                    <p>{props.data.career_batting.hits}</p>
                  </div>
                  <div className="column">
                    <p className={styles.highlightLabel}>HR</p>
                    <p>{props.data.career_batting.homeruns}</p>
                  </div>
                  <div className="column">
                    <p className={styles.highlightLabel}>AVG</p>
                    <p>{props.data.career_batting.avg}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHero;
