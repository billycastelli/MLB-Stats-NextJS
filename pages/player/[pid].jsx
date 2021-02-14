import Head from "next/head";

import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchInput from "../../components/SearchInput/SearchInput";
import PlayerHero from "../../components/PlayerHero/PlayerHero";
import BattingStats from "../../components/BattingStats/BattingStats";
import BattingChart from "../../components/BattingChart/BattingChart";
import useSWR from "swr";

const fetcher = async (route, pid) => {
  try {
    const url = `https://gzsj6zuxel.execute-api.us-west-2.amazonaws.com/dev/${route}?playerid=${pid}`;
    const response = await fetch(url, {
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const PlayerPage = () => {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.pid ? ["/player", router.query.pid] : null,
    fetcher
  );

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width" />
        {data && data._source.player.name ? (
          <title>{data._source.player.name} stats</title>
        ) : (
          <title>{router.query.pid}'s stats</title>
        )}
      </Head>
      <Header />

      {error && (
        <div className="container">
          <h1>Invalid player</h1>
        </div>
      )}
      {data && data._source.player && data._source.player.batting && (
        <>
          <PlayerHero data={data._source.player} />
          <BattingStats
            batting={data._source.player.batting}
            career={data._source.player.career_batting}
            playerid={data._source.player.playerid}
          />
          <BattingChart
            batting={data._source.player.batting}
            playerName={data._source.player.name}
          />
        </>
      )}
      <Footer />
    </>
  );
};

export default PlayerPage;
