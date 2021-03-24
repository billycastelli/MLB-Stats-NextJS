import styles from "./ComparisonChart.module.scss";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import BattingChart from "../BattingChart/BattingChart";
import Loader from "../Loader/Loader";
import { pidFetcher } from "../utils/fetchers";
import useSWR from "swr";

const groupFetcher = async (players) => {
  let allPlayerStats = [];
  for (let playerid of players) {
    allPlayerStats.push(await pidFetcher(`batting/${playerid}`));
  }
  return allPlayerStats;
};

const ComparisonChart = (props) => {
  const router = useRouter();
  const { data, error } = useSWR([props.players], groupFetcher);
  console.log(data);

  return (
    <>
      {!data && !error && (
        <div className={`container`}>
          <div className="columns is-centered">
            <div className="column is-two-thirds">
              <h1 style={{ paddingTop: "24px" }}>Stat Chart</h1>
              <hr className={styles.greenHr} />
              <Loader text="Loading..." />
            </div>
          </div>
        </div>
      )}
      {data && data.length > 0 && <BattingChart playerData={data} />}
    </>
  );
};

export default ComparisonChart;
