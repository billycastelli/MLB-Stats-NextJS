import styles from "./StatSelectionDropdown.module.scss";

const StatSelectionDropdown = (props) => {
  //   const [statOption, setStatOption] = "";
  const updateOption = (e) => {
    props.setChartStat(e.target.value);
  };
  const stats = [
    "ab",
    "avg",
    "bb",
    "cs",
    "doubles",
    "games",
    "gidp",
    "hbp",
    "hits",
    "homeruns",
    "ibb",
    "rbi",
    "runs",
    "sb",
    "sf",
    "sh",
    "so",
    "triples",
  ];

  return (
    <div className={styles.dropdown}>
      <div className="select">
        <select
          onChange={(e) => updateOption(e)}
          className={styles.selectionItem}
          defaultValue="homeruns"
        >
          {stats.map((stat, index) => {
            return (
              <option value={stat} key={index}>
                {stat}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default StatSelectionDropdown;
