import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";

const SearchResult = (props) => {
  const router = useRouter();

  const handlePlayerClick = (playerid) => {
    router.push({ pathname: "/player", query: { pid: playerid } });
  };

  return (
    <React.Fragment key={props.player.playerid}>
      <li
        className="card"
        key={props.player.playerid}
        onClick={() => handlePlayerClick(props.player.playerid)}
      >
        {/* <a href={`/player?pid=${props.player.playerid}`}>tests</a> */}
        <h3>{props.player.name}</h3>
        <p>
          {props.player.career_batting.avg} AVG •{" "}
          {props.player.career_batting.hits} Hits •{" "}
          {props.player.career_batting.homeruns} HR{" "}
        </p>
      </li>
      <style jsx>{`
        .card {
          border: 1px solid #eee;
          border-radius: 5px;
          padding: 12px;
          margin: 12px;
        }
        .card:hover {
          background-color: #fafafa;
          cursor: pointer;
        }
      `}</style>
    </React.Fragment>
  );
};

const SearchResults = (props) => {
  return (
    <React.Fragment>
      <ul>
        {props.results.map((player, index) => (
          <SearchResult player={player} key={index} />
        ))}
      </ul>
      <style jsx>{`
        * {
          list-style-type: none;
        }
      `}</style>
    </React.Fragment>
  );
};

const SearchInput = (props) => {
  return (
    <React.Fragment>
      <div className="search-div">
        <form onSubmit={props.handleSearchSubmit}>
          <input
            type="text"
            className="input-home"
            placeholder="A player's name"
            onChange={props.handleSearchInput}
          />
          <button type="submit" className="search-button">
            Submit
          </button>
        </form>
      </div>
      <style jsx>{`
        .input-home {
          max-height: 3rem;
          margin: 0;
          padding: 12px;
          line-height: 1.5rem;
          font-size: 1.25rem;
          border: 0;
          border-radius: 12px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          outline: none;
          -webkit-appearance: none;
          box-shadow: 4px 4px 8px 2px rgba(2, 64, 6, 0.1);
        }
        .input-home::placeholder {
          font-family: Poppins, sans-serif;
          font-size: 1rem;
        }
        .input-home:focus {
          transition: linear 0.15s all;
          box-shadow: 4px 4px 16px 8px rgba(2, 64, 6, 0.1);
        }

        .search-button {
          max-height: 3rem;
          margin: 0;
          cursor: pointer;
          padding: 12px;
          border: 1px solid #0fb377;
          border-radius: 12px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          background-color: #0fb377;
          color: #ffffff;
          line-height: 1.5rem;
          font-size: 1rem;
          font-family: Poppins, sans-serif;
          outline: none;
          box-shadow: 4px 4px 8px 2px rgba(2, 64, 6, 0.1);
        }
        .search-button:hover {
          transition: linear 0.2s all;
          border: 1px solid #0fb377;
          color: #0fb377;
          background-color: #ffffff;
        }
      `}</style>
    </React.Fragment>
  );
};

export default function SearchHome() {
  const [searchInput, setSearchInput] = useState("");
  const [fetchResults, setFetchResults] = useState([]);
  const [responseSize, setResponseSize] = useState(undefined);
  const requestedResultSize = 5;
  const router = useRouter();

  useEffect(() => {
    // Add a check for pages below 1, pages above max
    if (router.query.page < 1) {
      Router.push({
        pathname: router.pathname,
        query: { q: router.query.q, page: 1 },
      });
    }
    const search = async () => {
      let result_size = requestedResultSize;
      let starting_index = (parseInt(router.query.page) - 1) * result_size;

      const url = `https://gzsj6zuxel.execute-api.us-west-2.amazonaws.com/dev/players?name_input=${router.query.q}&result_size=${result_size}&starting_index=${starting_index}`;
      console.log(url);
      const response = await fetch(url, {
        mode: "cors",
      });
      const data = await response.json();
      setResponseSize(data.total.value);
      const results = [];
      data.hits.map((item) => {
        // console.log(item._source.player);
        results.push(item._source.player);
      });
      console.log(results);
      setFetchResults(results);
    };
    if (router.query.q) {
      search();
    }
  }, [router.query]);

  const handleSearchInput = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitted: ${searchInput}`);
    if (searchInput && searchInput.length > 0) {
      Router.push({
        pathname: router.pathname,
        query: { q: searchInput, page: 1 },
      });
    }
  };

  const toNextPage = () => {
    let currentPage = parseInt(router.query.page);
    console.log(currentPage);
    let nextPage = ++currentPage;
    console.log(nextPage);

    Router.push({
      pathname: router.pathname,
      query: { q: router.query.q, page: nextPage },
    });
  };

  const toPrevPage = () => {
    let currentPage = parseInt(router.query.page);
    console.log(currentPage);
    let prevPage = --currentPage;
    console.log(prevPage);

    Router.push({
      pathname: router.pathname,
      query: { q: router.query.q, page: prevPage },
    });
  };

  return (
    <React.Fragment>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width" />
      </Head>
      <main>
        <Header />

        <h1 className="center-text">Baseball Player Search</h1>
        <SearchInput
          handleSearchInput={handleSearchInput}
          handleSearchSubmit={handleSearchSubmit}
        />

        {fetchResults !== [] && responseSize !== undefined && (
          <React.Fragment>
            <SearchResults results={fetchResults} />
            <div>
              {router.query.page <= 1 && (
                <button onClick={toPrevPage} className="page-button-hidden">
                  Prev
                </button>
              )}
              {router.query.page > 1 && (
                <button onClick={toPrevPage} className="page-button-visible">
                  Prev
                </button>
              )}
              {router.query.page * requestedResultSize >= responseSize && (
                <button onClick={toNextPage} className="page-button-hidden">
                  Next
                </button>
              )}
              {router.query.page * requestedResultSize < responseSize && (
                <button onClick={toNextPage} className="page-button-visible">
                  Next
                </button>
              )}
            </div>

            <p className="center-text">
              Results found for '{router.query.q}': {responseSize}
            </p>
          </React.Fragment>
        )}
        {/* <div className="footer">
                    <p>Footer</p>
                </div> */}
        <Footer />
      </main>

      <style jsx global>{`
        html {
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: Poppins, sans-serif;
        }
        .center-text {
          text-align: center;
        }
        .page-button-visible {
          visibility: visible;
          padding: 8px;
          border: 1px solid #0fb377;
          border-radius: 12px;
          background-color: #ffffff;
          color: #0fb377;
          font-size: 1rem;
          font-family: Poppins, sans-serif;
          outline: none;
          cursor: pointer;
        }
        .page-button-visible:hover {
          transition: linear 0.2s all;
          border: 1px solid #0fb377;
          background-color: #0fb377;
          color: #ffffff;
        }
        .page-button-hidden {
          visibility: hidden;
        }
        .footer {
          flex: 0;
          width: 100%;
          background-color: #eee;
          color: black;
        }
      `}</style>
    </React.Fragment>
  );
}
