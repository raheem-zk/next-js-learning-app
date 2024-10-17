export const getDayDifference = (startDate, endDate) => {
    // Convert start and end dates to Date objects if they aren't already
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Set the time part of the dates to midnight
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
  
    // Calculate the difference in milliseconds
    const diffInMs = end - start;
  
    // Convert milliseconds to days
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
    return diffInDays;
  };
  
  // Example usage:
//   const currentDate = "Sun Jun 30 2024 16:11:29 GMT+0530 (India Standard Time)";
//   const min = 2; // Number of days to add to the pickupDate
  
//   let pickupDate = new Date(currentDate); // Initialize with your start date
//   let dropOffDate = new Date(pickupDate);
//   dropOffDate.setDate(dropOffDate.getDate() + min); // Add the number of days
  
//   const dayDifference = getDayDifference(pickupDate, dropOffDate);
//   console.log(`Day difference: ${dayDifference} days`); // This should output 2 days
  