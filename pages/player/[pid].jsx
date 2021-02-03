import Head from "next/head";

import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Header from "../../components/Header/Header";
import SearchInput from "../../components/SearchInput/SearchInput";
import PlayerHero from "../../components/PlayerHero/PlayerHero";
import BattingStats from "../../components/BattingStats/BattingStats";
import useSWR from "swr";

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
        <div style={{ marginTop: "18px" }}>
          <SearchInput center={true} />
        </div>
      </div>
      {playerData && (
        <>
          <PlayerHero data={playerData} />
          <BattingStats
            batting={playerData.batting}
            career={playerData.career_batting}
            playerid={playerData.playerid}
          />
        </>
      )}
    </>
  );
};

export default PlayerPage;
