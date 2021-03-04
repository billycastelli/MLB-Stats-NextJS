import styles from "./PlayerItem.module.scss";
import { pidFetcher } from "../utils/fetchers";
import useSWR from "swr";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

const PlayerItem = (props) => {
  const removePlayer = () => {
    props.removePlayer(props.playerid);
  };
  const { data, error } = useSWR([`batting/${props.playerid}`], pidFetcher);
  return (
    <>
      {data && (
        <div className={styles["playerItem"]}>
          <p className={styles["playerItemText"]}>{data._source.player.name}</p>
          <button
            className={`button is-danger ${styles["removePlayerButton"]}`}
            onClick={removePlayer}
          >
            Remove
          </button>
        </div>
      )}
    </>
  );
};

export default PlayerItem;
