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
                    <input type="text" onChange={handleSearchInput} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <style jsx>{`
                .input {
                }
            `}</style>
        </>
    );
};

const BattingStats = (props) => {
    console.log(props.career);
    return (
        <div>
            {props.batting.map((line, index) => (
                <p id={index}>{JSON.stringify(line)}</p>
            ))}
            <p>{JSON.stringify(props.career)}</p>
        </div>
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
            <SearchBar />
            {!playerData && <p>Loading...</p>}
            {playerData && (
                <>
                    <p>{playerData.name}</p>
                    <BattingStats
                        batting={playerData.batting}
                        career={playerData.career_batting}
                    />
                </>
            )}
        </>
    );
};

export default PlayerPage;
