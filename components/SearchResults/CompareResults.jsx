import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./CompareResults.module.scss";
import { searchFetcher } from "../utils/fetchers";
import useSWR from "swr";
import Loader from "../Loader/Loader";

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

    // Stop displaying result list on selection
    props.setDisplay(false);
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
      {props.display && (
        <div className={`${styles.resultsContainer}`}>
          <div className={styles.resultsTitleContainer}>
            <p>Results for {props.query}</p>
            <img
              className={styles.closeIcon}
              src="/cancel-24px.svg"
              onClick={() => props.setDisplay(false)}
            />
          </div>
          {!data && !error && <Loader text="Searching..." />}
          {data && data.hits && data.hits.length == 0 && (
            <>
              <p>No results found</p>
            </>
          )}

          {data && data.hits && data.hits.length > 0 && (
            <div className={styles.listContainer}>
              {data.hits.map((hit, index) => (
                <p>
                  <a
                    className={styles.playerResult}
                    key={index}
                    onClick={() => addPlayer(hit._source.player.playerid)}
                  >
                    {hit._source.player.name}{" "}
                    <span className={styles.addIcon}>⊕</span>
                  </a>
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CompareResults;
