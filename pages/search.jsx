import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import SearchInput from "../components/SearchInput/SearchInput";
import SearchResultCard from "../components/SearchResultCard/SearchResultCard";

const SearchResults = (props) => {
  return (
    <React.Fragment>
      <ul>
        {props.results.map((player, index) => (
          <SearchResultCard player={player} key={index} />
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

export default function SearchHome() {
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
        <div className="container">
          <SearchInput />

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
        </div>
        <Footer />
      </main>

      <style jsx global>{`
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
      `}</style>
    </React.Fragment>
  );
}
