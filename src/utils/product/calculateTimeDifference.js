const parseTime = (time) => {
  const [timeString, period] = time.split(" ");
  let [hours, minutes] = timeString.split(":").map(Number);

  if (period.toLowerCase() === "pm" && hours < 12) {
    hours += 12;
  }
  if (period.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};

export const calculateTimeDifference = (openingTime, closingTime) => {
  const storeOpeningTime = parseTime(openingTime);
  const storeClosingTime = parseTime(closingTime);

  const storeOpeningMinutes =
    storeOpeningTime.hours * 60 + storeOpeningTime.minutes;
  const storeClosingMinutes =
    storeClosingTime.hours * 60 + storeClosingTime.minutes;

  const differenceInMinutes = storeClosingMinutes - storeOpeningMinutes;
  const differenceInHours = differenceInMinutes / 60;

  return differenceInHours;
};

// Example usage
//   const openingTime = "9:00 am";
//   const closingTime = "6:00 pm";
//   const differenceInHours = calculateTimeDifference(openingTime, closingTime);
//   console.log(`The difference in hours is: ${differenceInHours} hours`); // Output: 9 hours
