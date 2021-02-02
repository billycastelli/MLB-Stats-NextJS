const cleanAverage = (avg) => {
  if (isNaN(avg)) {
    return "0.000";
  }
  return avg;
};

export { cleanAverage };
