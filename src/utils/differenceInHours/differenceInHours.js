const differenceInHours = (date1, date2) => {
  const msInHour = 1000 * 60 * 60;
  return Math.abs(date1 - date2) / msInHour;
};

export default differenceInHours;
