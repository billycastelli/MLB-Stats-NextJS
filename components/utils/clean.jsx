const cleanAverageString = (avg) => {
  if (isNaN(avg)) {
    return "0.000";
  }
  return avg;
};

const cleanNan = (stat) => {
  if (typeof stat === "string") {
    return stat;
  }
  if (isNaN(stat)) {
    return 0;
  }
  return stat;
};

const cleanChartStats = (battingStats, chartStat) => {
  return battingStats
    .filter((line) => line.stint === 1)
    .map(
      ((stat, line) => {
        return {
          x: parseInt(`${line.yearid}`),
          y: cleanNan(line[`${stat}`]),
        };
      }).bind(null, chartStat)
    );
};

module.exports = { cleanAverageString, cleanNan, cleanChartStats };
