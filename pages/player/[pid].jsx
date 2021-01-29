import Head from "next/head";

import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Header from "../../components/Header/Header";
import SearchInput from "../../components/SearchInput/SearchInput";
import PlayerHero from "../../components/PlayerHero/PlayerHero";
import useSWR from "swr";

const BattingStats = (props) => {
  const years = props.batting.filter((line) => line.stint === 1).length;
  return (
    <>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <div className="table-container" style={{ overflowX: "scroll" }}>
              <table
                className="table is-bordered is-striped is-hoverable"
                style={{ borderRadius: "12px" }}
              >
                <thead>
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
                </thead>
                <tbody>
                  {props.batting.map((line, index) => (
                    <tr>
                      {Object.values(line)
                        .slice(1)
                        .map((stat) => (
                          <td>{stat}</td>
                        ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  {[
                    `${years} years`,
                    "",
                    "",
                    "",
                    ...Object.values(props.career),
                  ].map((stat, index) => (
                    <td>{stat}</td>
                  ))}
                </tfoot>
              </table>
            </div>
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

const PlayerPage = () => {
  const router = useRouter();
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const fetchPlayerInfo = async (pid) => {
      const response = await fetch(
        `https://gzsj6zuxel.execute-api.us-west-2.amazonaws.com/dev/player?playerid=${pid}`,
        { mode: "cors" }
      );
      const data = await response.json();
      console.log(data._source.player);
      setPlayerData(data._source.player);
    };
    if (router.query.pid) {
      fetchPlayerInfo(router.query.pid);
      console.log(playerData);
    }
  }, [router.query]);
  return (
    <>
      <Header />

      <div className="container">
        <div className="columns">
          <div className="column is-three-quarters"></div>
          <div className="column" style={{ marginTop: "8px" }}>
            <SearchInput />
          </div>
        </div>
      </div>
      {playerData && (
        <>
          <PlayerHero data={playerData} />
          <BattingStats
            batting={playerData.batting}
            career={playerData.career_batting}
          />
        </>
      )}
    </>
  );
};

export default PlayerPage;
