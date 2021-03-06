import Router, { useRouter } from "next/router";
import styles from "./CompareResults.module.scss";
import { searchFetcher } from "../utils/fetchers";
import useSWR from "swr";

const CompareResults = (props) => {
  const router = useRouter();
  const result_size = 15;
  let starting_index = 0;
  const { data, error } = useSWR(
    props.query && result_size && starting_index >= 0
      ? ["/players", props.query, result_size, starting_index]
      : null,
    searchFetcher
  );

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
            <p>
              <a
                className={styles.playerResult}
                key={index}
                onClick={() => addPlayer(hit._source.player.playerid)}
              >
                {hit._source.player.name} +
              </a>
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default CompareResults;
