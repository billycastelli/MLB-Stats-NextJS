import Head from "next/head";
import { useState } from "react";

const SearchResult = (props) => {
    return (
        <React.Fragment>
            <li className="card" key={props.player.playerid}>
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
                    <SearchResult player={player} />
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

export default function Home() {
    const [searchResponse, setSearchResponse] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState("");

    const handleInput = (e) => {
        console.log(e.target.value);
        setSearchInputValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url =
            "https://gzsj6zuxel.execute-api.us-west-2.amazonaws.com/dev/players?name_input=";
        const completeUrl = url + searchInputValue;
        const response = await fetch(completeUrl, {
            mode: "cors",
        });
        const data = await response.json();
        let results = [];
        for (let i = 0; i < data.hits.length; i++) {
            results.push(data.hits[i]._source.player);
        }
        console.log(results);
        setSearchResponse(results);
    };

    return (
        <div className="container">
            <Head>
                <title>MLB Player Search</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">Search for any baseball player</h1>
                <div className="search-div">
                    <form onSubmit={handleSubmit}>
                        <input type="text" onChange={handleInput} />
                        <button type="submit">Submit</button>
                    </form>
                </div>

                {searchResponse.length > 0 && (
                    <SearchResults results={searchResponse} />
                )}
            </main>
            {}

            <footer>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{" "}
                    <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
                </a>
            </footer>

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
        </div>
    );
}
