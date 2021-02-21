import styles from "./BattingStats.module.scss";
import { CSVLink, CSVDownload } from "react-csv";
import { cleanNan } from "../utils/clean";

const BattingStats = (props) => {
  const years = props.batting.filter((line) => line.stint === 1).length;
  return (
    <>
      {console.log(props)}
      <div className="container">
        <div className="columns is-centered">
          <div className={`column is-two-thirds ${styles.customMobile}`}>
            <h1>Batting Stats</h1>
            <hr className={styles.greenHr} />
            <div className="table-container" style={{ overflowX: "scroll" }}>
              <table
                className="table is-bordered is-striped is-hoverable"
                style={{ borderRadius: "12px" }}
              >
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Stint</th>
                    <th>Team</th>
                    <th>League</th>
                    <th>G</th>
                    <th>AB</th>
                    <th>Runs</th>
                    <th>Hits</th>
                    <th>2B</th>
                    <th>3B</th>
                    <th>HR</th>
                    <th>RBI</th>
                    <th>SB</th>
                    <th>CS</th>
                    <th>BB</th>
                    <th>SO</th>
                    <th>IBB</th>
                    <th>HBP</th>
                    <th>SH</th>
                    <th>SF</th>
                    <th>GIDP</th>
                    <th>AVG</th>
                  </tr>
                </thead>
                <tbody>
                  {props.batting.map((line, yearIndex) => (
                    <tr key={yearIndex}>
                      {Object.values(line)
                        .slice(1)
                        .map((stat, statIndex) => (
                          <>
                            {console.log(stat)}
                            <td key={statIndex}>{cleanNan(stat)}</td>
                          </>
                        ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    {[
                      `${years} years`,
                      "",
                      "",
                      "",
                      ...Object.values(props.career),
                    ].map((stat, index) => (
                      <td key={index}>{stat}</td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
            <CSVLink data={props.batting} filename={`${props.playerid}.csv`}>
              Download Batting stats as CSV
            </CSVLink>
          </div>
        </div>
      </div>
      {/* <style jsx>{`
          .scrollable {
            overflow-x: auto;
            width: 100%;
          }
          table,
          th,
          td {
            border: 1px solid black;
            position: sticky;
            top: 0;
            z-index: 999;
            border-collapse: collapse;
            padding: 6px;
            margin: 0 auto;
          }
        `}</style> */}
    </>
  );
};

export default BattingStats;
