import styles from "./SearchResultCard.module.scss";
import Router, { useRouter } from "next/router";

const SearchResultCard = (props) => {
  const router = useRouter();

  const handlePlayerClick = (playerid) => {
    router.push({ pathname: "/player", query: { pid: playerid } });
  };

  return (
    <li
      className={styles["card"]}
      key={props.player.playerid}
      onClick={() => handlePlayerClick(props.player.playerid)}
    >
      {/* <a href={`/player?pid=${props.player.playerid}`}>tests</a> */}
      <h3>{props.player.name}</h3>
      <p>
        {props.player.career_batting.avg} AVG •{" "}
        {props.player.career_batting.hits} Hits •{" "}
        {props.player.career_batting.homeruns} HR{" "}
      </p>
    </li>
  );
};

export default SearchResultCard;
