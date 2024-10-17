export const addTimeToDate = (date, limit = 1, unit = "days") => {
    const newDate = new Date(date);
  
    switch (unit) {
      case 'days':
        newDate.setDate(newDate.getDate() + limit);
        break;
      case 'hours':
        newDate.setHours(newDate.getHours() + limit);
        break;
      case 'minutes':
        newDate.setMinutes(newDate.getMinutes() + limit);
        break;
      case 'seconds':
        newDate.setSeconds(newDate.getSeconds() + limit);
        break;
      default:
        throw new Error('Invalid unit provided. Use "days", "hours", "minutes", or "seconds".');
    }
    return newDate;
  };
  
  
  // Example usage:
//   const originalDate = new Date();
//   const limit = 5;
//   const unit = 'days';
//   const newDate = addTimeToDate(originalDate, limit, unit);
//   console.log(`Original Date: ${originalDate}`);
//   console.log(`New Date: ${newDate}`);
  