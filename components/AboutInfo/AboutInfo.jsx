import styles from "./AboutInfo.module.scss";
import Link from "next/link";

const AboutInfo = () => {
  return (
    // <div className="container">
    <div className={styles.aboutDiv}>
      <h1>Search through Lahman's Baseball Database using Elasticsearch</h1>
      <hr className={styles.greenHr} />
      <p>
        Leverages the speed of Elasticsearch to deliver near instant access to
        Major League Batting data
      </p>
      <br />
      <p>
        Raw data retrieved from{" "}
        <a href="http://www.seanlahman.com/baseball-archive/statistics/">
          Sean Lahman's site.
        </a>{" "}
        Data was extracted, cleaned, and put into an Elasticsearch cluster for
        search. For more information about the data wrangling, view the
        documentation in the{" "}
        <a href="https://github.com/billycastelli/Lahman-to-Elasticsearch">
          Lahman-to-Elasticsearch repository
        </a>
        .
      </p>
    </div>
    // </div>
  );
};

export default AboutInfo;
