const cleanAverageString = (avg) => {
  if (isNaN(avg)) {
    return "0.000";
  }
  return avg;
};

const cleanNanDisplay = (stat) => {
  if (typeof stat === "string") {
    if (stat == "") {
      return "-";
    }
    return stat;
  }

  if (isNaN(stat)) {
    return 0;
  }
  return stat;
};

const cleanNanChart = (stat) => {
  if (typeof stat === "string") {
    if (stat === "-" || stat === "") {
      return 0;
    }
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
          y: cleanNanChart(line[`${stat}`]),
        };
      }).bind(null, chartStat)
    );
};

module.exports = {
  cleanAverageString,
  cleanNanDisplay,
  cleanNanChart,
  cleanChartStats,
};
