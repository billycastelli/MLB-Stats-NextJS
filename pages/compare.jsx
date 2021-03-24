import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PlayerItem from "../components/PlayerItem/PlayerItem";
import ComparisonChart from "../components/ComparisonChart/ComparisonChart";
import CompareInput from "../components/SearchInput/CompareInput";
import CompareResults from "../components/SearchResults/CompareResults";

const ComparisonPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState(undefined);

  const removePlayer = (playerid) => {
    if (router.query.players) {
      const oldPlayerString = router.query.players;
      const oldPlayerArr = oldPlayerString.split("+");
      const newPlayerArr = oldPlayerArr.filter((player) => player !== playerid);
      const newPlayerString = newPlayerArr.join("+");
      if (newPlayerString === "") {
        return Router.push({
          pathname: router.pathname,
        });
      }
      Router.push({
        pathname: router.pathname,
        query: {
          players: newPlayerString,
        },
      });
    }
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
        <title>Player comparison</title>
      </Head>
      <div className="flex-page">
        <Header />
        <main className="flex-content">
          <div className="container section">
            <div className="columns is-centered">
              <div className="column is-three-quarters">
                <h1>Player comparison</h1>
                <div className="columns">
                  <div className="column is-half">
                    <p style={{ marginBottom: "8px" }}>
                      Search for players to graphically compare career stats,
                      <br /> or see an{" "}
                      <Link href="/compare?players=rodrial01%2Bpujolal01%2Bjeterde01%2B">
                        <a>example</a>
                      </Link>
                    </p>
                    <CompareInput setQuery={setQuery} />
                    {query && <CompareResults query={query} />}
                  </div>
                  <div className="column is-half">
                    {router.query.players && (
                      <>
                        {router.query.players
                          .split("+")
                          .slice(0, -1)
                          .map((player, index) => {
                            return (
                              <PlayerItem
                                key={index}
                                playerid={player}
                                removePlayer={removePlayer}
                              />
                            );
                          })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {router.query.players && (
              <>
                <ComparisonChart
                  players={decodeURIComponent(router.query.players)
                    .split("+")
                    .filter((x) => x)}
                />
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ComparisonPage;
