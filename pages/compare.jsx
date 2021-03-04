import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import useSWR from "swr";

import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PlayerItem from "../components/PlayerItem/PlayerItem";
import ComparisonChart from "../components/ComparisonChart/ComparisonChart";

const fetcher = async (route, query_string, result_size, starting_index) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_LAMBDA_API_ENDPOINT}/search`;
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        name_input: query_string,
        result_size: result_size,
        starting_index: starting_index,
      }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

const SearchInput = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    props.setQuery(searchInput);
  };
  return (
    <div
      className={`field has-addons ${
        props.center === true && "has-addons-centered"
      }`}
    >
      <div className="control">
        <form onSubmit={handleSearchSubmit}>
          <input
            className={`input`}
            type="text"
            placeholder="Find a player"
            onChange={handleSearchInput}
          />
        </form>
      </div>

      <div className="control">
        <a className={`button is-info`} onClick={handleSearchSubmit}>
          Submit
        </a>
      </div>
    </div>
  );
};

const SelectorBox = (props) => {
  const router = useRouter();
  const result_size = 15;
  let starting_index = 0;
  const { data, error } = useSWR(
    props.query && result_size && starting_index >= 0
      ? ["/players", props.query, result_size, starting_index]
      : null,
    fetcher
  );
  //   console.log(data);
  const addPlayer = (playerid) => {
    if (router.query.players) {
      const playersString = router.query.players;
      const playersArr = playersString.split("+");
      if (playersArr.includes(playerid)) {
        return;
      }
    }
    Router.push({
      pathname: router.pathname,
      query: {
        players: `${
          router.query.players ? router.query.players : ""
        }${playerid}+`,
      },
    });
  };

  return (
    <>
      <p>Results for {props.query}</p>
      {data && (
        <div>
          {data.hits.map((hit, index) => (
            <p
              key={index}
              onClick={() => addPlayer(hit._source.player.playerid)}
            >
              <a>{hit._source.player.name}</a>
            </p>
          ))}
        </div>
      )}
    </>
  );
};

const ComparisonPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState(undefined);
  const removePlayer = (playerid) => {
    if (router.query.players) {
      const oldPlayerString = router.query.players;
      const oldPlayerArr = oldPlayerString.split("+");
      const newPlayerArr = oldPlayerArr.filter((player) => player !== playerid);
      const newPlayerString = newPlayerArr.join("+");
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
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width" />
        <title>Player comparison</title>
      </Head>
      <main>
        <Header />
        <div className="container">
          {/* <div className="columns"> */}
          {/* <div className="column is-one-quarter"> */}
          <h1>Player comparison</h1>
          <div className="columns">
            <div className="column">
              <SearchInput setQuery={setQuery} />
              {query && <SelectorBox query={query} />}
            </div>
            <div className="column">
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
          {/* </div> */}
          {/* <div className="column"> */}
          {router.query.players && (
            <>
              <ComparisonChart
                players={decodeURIComponent(router.query.players)
                  .split("+")
                  .filter((x) => x)}
              />
            </>
          )}
          {/* </div> */}
          {/* </div> */}
        </div>
        <Footer />
      </main>
    </>
  );
};

export default ComparisonPage;
