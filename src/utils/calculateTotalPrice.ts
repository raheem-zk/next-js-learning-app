export const calculateTotalPrice = (
    productPriceHourly,
    productPriceDaily,
    pickupDate,
    pickupHour,
    pickupMinute,
    dropOffDate,
    dropOffHour,
    dropOffMinute
  ) => {
    const startDateTime = new Date(pickupDate);
    startDateTime.setHours(pickupHour, pickupMinute, 0, 0);
  
    const endDateTime = new Date(dropOffDate);
    endDateTime.setHours(dropOffHour, dropOffMinute, 0, 0);
  
    const timeDifference = endDateTime - startDateTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
  
    if (hoursDifference <= 0) {
      console.error("End date should be greater than start date.");
      return 0; // or handle it accordingly
    }
  
    if (hoursDifference <= 24) {
      // Calculate hourly price if the duration is less than or equal to 24 hours
      return productPriceHourly * hoursDifference;
    } else {
      // Calculate daily price if the duration is more than 24 hours
      const daysDifference = Math.ceil(hoursDifference / 24);
      return productPriceDaily * daysDifference;
    }
  };
  