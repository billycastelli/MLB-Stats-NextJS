import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import useSWR from "swr";
import BattingChart from "../components/BattingChart/BattingChart";

import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

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
  console.log(data);
  const addPlayer = (playerid) => {
    Router.push({
      pathname: router.pathname,
      query: {
        players: `${
          router.query.players ? router.query.players : ""
        }${playerid}+`,
      },
    });
    console.log(playerid);
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

const ComparisonChart = (props) => {
  const router = useRouter();
  const [datas, setDatas] = useState([]);
  const fetcher = async (path) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_LAMBDA_API_ENDPOINT}/batting/${path}`;
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

  useEffect(() => {
    const getAllPlayers = async () => {
      let datas = [];
      for (let player of props.players) {
        const playerData = await fetcher(player);
        datas.push(playerData);
      }
      setDatas(datas);
    };
    getAllPlayers();
  }, [router.query]);
  console.log(datas);

  return (
    <>
      {datas.length > 0 && (
        <BattingChart
          batting={datas[0]._source.player.batting}
          playerName={datas[0]._source.player.name}
        />
      )}
    </>
  );
};

const ComparisonPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState(undefined);
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
        <h1>Player comparison</h1>
        <SearchInput setQuery={setQuery} />
        {query && <SelectorBox query={query} />}
        {router.query.players && (
          <ComparisonChart
            players={decodeURIComponent(router.query.players)
              .split("+")
              .filter((x) => x)}
          />
        )}

        <Footer />
      </main>
    </>
  );
};

export default ComparisonPage;
