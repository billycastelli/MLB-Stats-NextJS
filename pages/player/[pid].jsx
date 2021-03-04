import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PlayerHero from "../../components/PlayerHero/PlayerHero";
import BattingStats from "../../components/BattingStats/BattingStats";
import BattingChart from "../../components/BattingChart/BattingChart";
import { pidFetcher } from "../../components/utils/fetchers";
import useSWR from "swr";

const PlayerPage = () => {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.pid ? [`batting/${router.query.pid}`] : null,
    pidFetcher
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
          <BattingChart playerData={[data]} />
        </>
      )}
      <Footer />
    </>
  );
};

export default PlayerPage;
