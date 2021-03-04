import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import BattingChart from "../BattingChart/BattingChart";
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
      {data && data.length > 0 && (
        <BattingChart
          playerData={data}
          //   batting={data[0]._source.player.batting}
          //   playerName={data[0]._source.player.name}
        />
      )}
    </>
  );
};

export default ComparisonChart;
