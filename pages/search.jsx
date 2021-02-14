import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useRouter } from "next/router";
import SearchInput from "../components/SearchInput/SearchInput";
import SearchResults from "../components/SearchResults/SearchResults";
import SearchPagination from "../components/SearchPagination/SearchPagination";
import useSWR from "swr";
import SearchQueryMeta from "../components/SearchResults/SearchQueryMeta";

const fetcher = async (route, query_string, result_size, starting_index) => {
  try {
    const url = `https://gzsj6zuxel.execute-api.us-west-2.amazonaws.com/dev/${route}?name_input=${query_string}&result_size=${result_size}&starting_index=${starting_index}`;
    const response = await fetch(url, {
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default function SearchHome() {
  const router = useRouter();
  const requestedResultSize = 10;

  let result_size = requestedResultSize;
  let starting_index = (parseInt(router.query.page) - 1) * result_size;
  const { data, error } = useSWR(
    router.query.q && result_size && starting_index >= 0
      ? ["/players", router.query.q, result_size, starting_index]
      : null,
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
        <title>Search</title>
      </Head>
      <main>
        <Header />

        <div className="container">
          {/* Idle state */}
          {!data && !router.query.q && (
            <div style={{ marginBottom: "600px" }}></div>
          )}

          {/* Loading state */}
          {!data && router.query.q && (
            <div style={{ marginBottom: "600px" }}>
              <SearchQueryMeta prefix="Searching for " query={router.query.q} />
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
        <Footer />
      </main>
    </>
  );
}
