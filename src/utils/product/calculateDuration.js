export const calculateDuration = (pickupDate, dropOffDate, pickupTime, dropOffTime)=> {
    // Parse the dates and times
  // Ensure the dates are strings
  pickupDate = pickupDate.toString();
  dropOffDate = dropOffDate.toString();

  // Combine date and time strings into a single Date object
  const pickupDateTime = new Date(`${pickupDate.split(' ').slice(0, 4).join(' ')} ${pickupTime} GMT+0530`);
  const dropOffDateTime = new Date(`${dropOffDate.split(' ').slice(0, 4).join(' ')} ${dropOffTime} GMT+0530`);

  // Calculate the difference in milliseconds
  const diff = dropOffDateTime - pickupDateTime;

  // Convert milliseconds to days and hours
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  // Calculate the total hours
  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const durationInMonths = Math.floor(diffInDays / 28);
  const durationInDays = diffInDays % 28;

    return {
        durationInMonths,
        durationInDays,
        timeDuration: remainingHours,
        durationInHours: totalHours
    };
}
// Example usage
// const startDateTime = '2024-07-11T17:00:00';
// const endDateTime = '2024-07-12T09:00:00';

// const duration = calculateDuration(startDateTime, endDateTime);
// console.log(`${duration.days} days and ${duration.hours} hours`);
