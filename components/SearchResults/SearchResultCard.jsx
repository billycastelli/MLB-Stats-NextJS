import styles from "./SearchResultCard.module.scss";
import Router, { useRouter } from "next/router";
import { cleanAverage } from "../utils/clean";

const SearchResultCard = (props) => {
  const router = useRouter();

  const handlePlayerClick = (playerid) => {
    router.push({ pathname: `/player/${playerid}` });
  };

  return (
    <div className={styles.borderDiv}>
      <li
        className={styles.card}
        key={props.player.playerid}
        onClick={() => handlePlayerClick(props.player.playerid)}
      >
        <h3 className={styles.playerName}>{props.player.name}</h3>
        <p>
          {props.player.batting.filter((x) => x.stint == 1).length} yr &#903;{" "}
          {cleanAverage(props.player.career_batting.avg)} AVG &#903;{" "}
          {props.player.career_batting.hits} Hits &#903;{" "}
          {props.player.career_batting.homeruns} HR{" "}
        </p>
      </li>
    </div>
  );
};

export default SearchResultCard;
