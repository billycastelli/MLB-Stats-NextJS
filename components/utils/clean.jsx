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

module.exports = { cleanAverageString, cleanNan };
