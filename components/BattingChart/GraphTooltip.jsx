import styles from "./GraphTooltip.module.scss";

const GraphTooltip = (props) => {
  return (
    <div className={styles.tooltip}>
      <p className={styles.playerName}>{props.playerName}</p>
      <p>Year: {props.year}</p>
      <p>
        {props.chartStat}:{" "}
        {props.chartStat === "avg"
          ? props.statValue.toFixed(3)
          : props.statValue}
      </p>
    </div>
  );
};

export default GraphTooltip;
