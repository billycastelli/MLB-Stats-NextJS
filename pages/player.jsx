import Head from "next/head";

import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";

const SearchBar = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const handleSearchInput = (e) => {
        console.log(e.target.value);
        setSearchInput(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        Router.push({
            pathname: "/search",
            query: { q: searchInput, page: 1 },
        });
    };

    return (
        <>
            <div className="search-div">
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Player"
                        onChange={handleSearchInput}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <style jsx>{`
                input {
                    margin: 0;
                    padding: 12px;
                    line-height: 1.5rem;
                    font-size: 1.25rem;
                    border: 3px solid #eee;
                    border-radius: 12px;
                    outline: none;
                }
            `}</style>
        </>
    );
};

const PlayerHero = (props) => {
    return (
        <>
            <h1>{props.data.name}</h1>
            <style jsx>{`
                h1 {
                    font-family: Poppins, sans-serif;
                }
            `}</style>
        </>
    );
};

const BattingStats = (props) => {
    const years = props.batting.filter((line) => line.stint === 1).length;
    return (
        <>
            <div className="scrollable">
                <table>
                    <tr>
                        <th>Year</th>
                        <th>Stint</th>
                        <th>Team</th>
                        <th>League</th>
                        <th>G</th>
                        <th>AB</th>
                        <th>Runs</th>
                        <th>Hits</th>
                        <th>2B</th>
                        <th>3B</th>
                        <th>HR</th>
                        <th>RBI</th>
                        <th>SB</th>
                        <th>CS</th>
                        <th>BB</th>
                        <th>SO</th>
                        <th>IBB</th>
                        <th>HBP</th>
                        <th>SH</th>
                        <th>SF</th>
                        <th>GIDP</th>
                        <th>AVG</th>
                    </tr>
                    {props.batting.map((line, index) => (
                        <tr>
                            {Object.values(line)
                                .slice(1)
                                .map((stat) => (
                                    <td>{stat}</td>
                                ))}
                        </tr>
                    ))}
                    <tr>
                        {[
                            `${years} years`,
                            "",
                            "",
                            "",
                            ...Object.values(props.career),
                        ].map((stat, index) => (
                            <td>{stat}</td>
                        ))}
                    </tr>
                </table>
            </div>
            <style jsx>{`
                .scrollable {
                    overflow-x: auto;
                    width: 100%;
                }
                table,
                th,
                td {
                    font-family: Poppins, sans-serif;
                    border: 1px solid black;
                    position: sticky;
                    top: 0;
                    z-index: 999;
                    border-collapse: collapse;
                    padding: 6px;
                }
            `}</style>
        </>
    );
};

const PlayerPage = () => {
    const router = useRouter();
    const [playerData, setPlayerData] = useState(null);

    useEffect(() => {
        const fetchPlayerInfo = async (pid) => {
            const response = await fetch(
                `https://gzsj6zuxel.execute-api.us-west-2.amazonaws.com/dev/player?playerid=${pid}`,
                { mode: "cors" }
            );
            const data = await response.json();
            console.log(data._source.player);
            setPlayerData(data._source.player);
        };
        if (router.query.pid) {
            fetchPlayerInfo(router.query.pid);
            console.log(playerData);
        }
    }, [router.query]);
    return (
        <>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css?family=Poppins"
                    rel="stylesheet"
                />
            </Head>
            <SearchBar />
            {playerData && (
                <>
                    <PlayerHero data={playerData} />
                    <BattingStats
                        batting={playerData.batting}
                        career={playerData.career_batting}
                    />
                </>
            )}
            <style jsx>{`
                html,
                body,
                p,
                h1 {
                    font-family: Poppins, sans-serif;
                }
            `}</style>
        </>
    );
};

export default PlayerPage;
