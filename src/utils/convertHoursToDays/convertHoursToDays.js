export const convertHoursToDays = (hours) => {
    const hoursInADay = 24;
    const days = Math.floor(hours / hoursInADay);
    const remainingHours = hours % hoursInADay;
    const totalDays = remainingHours >= 10 ? days + 1 : days;
    return totalDays;
  };
  
// Example usage:
//   const hours = 50;
//   const days = convertHoursToDays(hours);
//   console.log(`${hours} hours is approximately ${days} days`);
  

// convertHoursToDays(hourlyPricing.min),
// convertHoursToDays(hourlyPricing.max),