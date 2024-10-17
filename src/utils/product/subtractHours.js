// export const subtractHours = (time, hoursToSubtract = 1) => {
//     let [hoursPart, minutesPart] = time.split(':');
//     let [hours, minutes] = [parseInt(hoursPart), parseInt(minutesPart)];
//     const period = time.includes('pm') ? 'pm' : 'am';
  
//     hours = (hours % 12) - hoursToSubtract; // Subtract the specified number of hours
//     if (hours <= 0) {
//       if (period === 'am') {
//         hours = 12 + hours;
//       } else {
//         hours = 12 + hours;
//       }
//     } else {
//       hours = hours % 12;
//     }
  
//     const newPeriod = ((hours - hoursToSubtract) >= 12 && period === 'am') || ((hours - hoursToSubtract) < 12 && period === 'pm') ? 'pm' : 'am';
//     const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${newPeriod}`;
//     return formattedTime;
// };

export const subtractHours = (time, hoursToSubtract = 1) => {
  let [timePart, period] = time.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);

  // Convert hours to 24-hour format if in PM
  if (period === 'pm' && hours !== 12) {
      hours += 12;
  } else if (period === 'am' && hours === 12) {
      hours = 0;
  }

  // Subtract the specified number of hours
  hours -= hoursToSubtract;

  // Handle negative hours and wrap around
  if (hours < 0) {
      hours += 24;
  }

  // Convert back to 12-hour format
  let newPeriod = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  if (hours === 0) {
      hours = 12;
  }

  // Format the time string
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${newPeriod}`;
  return formattedTime;
};

// Example usage:
// let timeString = "1:00 pm";
// let hoursToSubtract = 2;
// let newTime = subtractHours(timeString, hoursToSubtract);
// console.log(newTime); // Output: "11:00 am"