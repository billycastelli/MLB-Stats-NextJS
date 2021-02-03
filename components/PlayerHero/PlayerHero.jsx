import styles from "./PlayerHero.module.scss";

const PlayerHero = (props) => {
  return (
    <div className="container">
      <div className={styles.banner}>
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
              From: {props.data.birthcity}, {props.data.irthcountry}
            </p>
          </div>
          <div className="column is-one-third">
            <div className={styles.quickStats}>
              <div className={styles.quickStatsTitle}>
                <span>
                  Highlights <img src="/images/emoji_events-24px.svg" />
                </span>
              </div>
              <div className="columns">
                <div className="column ">
                  <p className={styles.highlightLabel}>HITS</p>
                  <p>{props.data.career_batting.hits}</p>
                </div>
                <div className="column">
                  <p className={styles.highlightLabel} H>
                    HR
                  </p>
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
  );
};

export default PlayerHero;
