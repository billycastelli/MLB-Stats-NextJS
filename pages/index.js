import Head from "next/head";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";

const SearchResult = (props) => {
    return (
        <React.Fragment key={props.player.playerid}>
            <li
                className="card"
                key={props.player.playerid}
                // onClick={() => props.handlePlayerClick(props.player.playerid)}
            >
                <h3>{props.player.name}</h3>
                <p>
                    avg {props.player.career_batting.avg} • hits{" "}
                    {props.player.career_batting.hits} • hr{" "}
                    {props.player.career_batting.homeruns}
                </p>
            </li>
            <style jsx>{`
                .grid {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;

                    max-width: 800px;
                    margin-top: 3rem;
                }

                .card {
                    margin: 1rem;
                    flex-basis: 45%;
                    padding: 1.5rem;
                    text-align: center;
                    color: inherit;
                    text-decoration: none;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    transition: color 0.15s ease, border-color 0.15s ease;
                }

                .card:hover,
                .card:focus,
                .card:active {
                    color: #0070f3;
                    border-color: #0070f3;
                }

                .card h3 {
                    margin: 0 0 1rem 0;
                    font-size: 1.25rem;
                }

                .card p {
                    margin: 0;
                    font-size: 0.8rem;
                    line-height: 1.5;
                }
            `}</style>
        </React.Fragment>
    );
};

const SearchResults = (props) => {
    return (
        <React.Fragment>
            <ul>
                {props.results.map((player) => (
                    <SearchResult
                        player={player}
                        handlePlayerClick={props.handlePlayerClick}
                    />
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
                    <input type="text" onChange={props.handleSearchInput} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <style jsx>{`
                .input {
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
        console.log(router.query.q);
        // Add a check for pages below 1, pages above max
        // if (router.query.page < 1) {
        //     Router.push({
        //         pathname: router.pathname,
        //         query: { q: searchInput, page: 1 },
        //     });
        // }
        const search = async () => {
            let result_size = requestedResultSize;
            let starting_index =
                (parseInt(router.query.page) - 1) * result_size;

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
        Router.push({
            pathname: router.pathname,
            query: { q: searchInput, page: 1 },
        });
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
            <main>
                <h1>MLB Player Search</h1>
                <SearchInput
                    handleSearchInput={handleSearchInput}
                    handleSearchSubmit={handleSearchSubmit}
                />

                {fetchResults !== [] && responseSize !== undefined && (
                    <React.Fragment>
                        {router.query.page > 1 && (
                            <button onClick={toPrevPage}>prev page</button>
                        )}
                        {router.query.page * requestedResultSize <
                            responseSize && (
                            <button onClick={toNextPage}>next page</button>
                        )}
                        <SearchResults results={fetchResults} />
                        {router.query.page > 1 && (
                            <button onClick={toPrevPage}>prev page</button>
                        )}
                        {router.query.page * requestedResultSize <
                            responseSize && (
                            <button onClick={toNextPage}>next page</button>
                        )}
                        <p>
                            Results found for '{router.query.q}': {responseSize}
                        </p>
                    </React.Fragment>
                )}
            </main>
            <style jsx>{`
                .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                footer img {
                    margin-left: 0.5rem;
                }

                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                a {
                    color: inherit;
                    text-decoration: none;
                }

                .title a {
                    color: #0070f3;
                    text-decoration: none;
                }

                .title a:hover,
                .title a:focus,
                .title a:active {
                    text-decoration: underline;
                }

                .title {
                    margin: 0;
                    line-height: 1.15;
                    font-size: 4rem;
                }

                .title,
                .description {
                    text-align: center;
                }

                .description {
                    line-height: 1.5;
                    font-size: 1.5rem;
                }

                code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                        DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                        monospace;
                }

                .grid {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;

                    max-width: 800px;
                    margin-top: 3rem;
                }

                .card {
                    margin: 1rem;
                    flex-basis: 45%;
                    padding: 1.5rem;
                    text-align: left;
                    color: inherit;
                    text-decoration: none;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    transition: color 0.15s ease, border-color 0.15s ease;
                }

                .card:hover,
                .card:focus,
                .card:active {
                    color: #0070f3;
                    border-color: #0070f3;
                }

                .card h3 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                }

                .card p {
                    margin: 0;
                    font-size: 1.25rem;
                    line-height: 1.5;
                }

                .logo {
                    height: 1em;
                }

                @media (max-width: 600px) {
                    .grid {
                        width: 100%;
                        flex-direction: column;
                    }
                }
                .search-div {
                    padding-top: 3em;
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </React.Fragment>
    );
}
