import useSWR from "swr";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { searchFetcher, SearchFetcher } from "../components/utils/fetchers";
import SearchResults from "../components/SearchResults/SearchResults";
import SearchPagination from "../components/SearchPagination/SearchPagination";
import SearchQueryMeta from "../components/SearchResults/SearchQueryMeta";

export default function SearchHome() {
  const router = useRouter();
  const requestedResultSize = 10;

  let result_size = requestedResultSize;
  let starting_index = (parseInt(router.query.page) - 1) * result_size;
  const { data, error } = useSWR(
    router.query.q && result_size && starting_index >= 0
      ? ["/players", router.query.q, result_size, starting_index]
      : null,
    searchFetcher
  );

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width" />
        <title>Search</title>
      </Head>
      <div className="flex-page">
        <Header />
        <main className="flex-content">
          <div className="container">
            {/* Idle state */}
            {!data && !router.query.q && (
              <div style={{ marginBottom: "600px" }}></div>
            )}

            {/* Loading state */}
            {!data && router.query.q && (
              <div style={{ marginBottom: "600px" }}>
                <SearchQueryMeta
                  prefix="Searching for "
                  query={router.query.q}
                />
              </div>
            )}

            {/* Data found */}
            {data && data.total.value && data.hits && data.hits !== [] && (
              <>
                <SearchQueryMeta
                  prefix="Results for "
                  query={router.query.q}
                  count={data.total.value}
                />
                <SearchResults results={data.hits} />
                <SearchPagination
                  router={router}
                  data={data}
                  requestedResultSize={requestedResultSize}
                />

                {/* <p className="center-text">
                Results found for '{router.query.q}': {data.total.value}
              </p> */}
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
