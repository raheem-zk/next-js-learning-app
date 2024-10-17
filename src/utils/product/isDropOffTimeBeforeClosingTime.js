export const isDropOffTimeBeforeClosingTime = (dropOffTimeString, closingTimeString) => {
    const currentDate = new Date();
  
    // Helper function to parse time strings
    const parseTimeString = (timeString) => {
      const [time, modifier] = timeString.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier.toLowerCase() === "pm" && hours !== 12) {
        hours += 12;
      } else if (modifier.toLowerCase() === "am" && hours === 12) {
        hours = 0;
      }
      return { hours, minutes };
    };
  
    // Parse the drop-off time and closing time
    const { hours: dropOffHours, minutes: dropOffMinutes } = parseTimeString(dropOffTimeString);
    const { hours: closingHours, minutes: closingMinutes } = parseTimeString(closingTimeString);
  
    // Create Date objects for drop-off time and closing time
    const dropOffDate = new Date(currentDate);
    dropOffDate.setHours(dropOffHours);
    dropOffDate.setMinutes(dropOffMinutes);
    dropOffDate.setSeconds(0);
    dropOffDate.setMilliseconds(0);
  
    const closingDate = new Date(currentDate);
    closingDate.setHours(closingHours);
    closingDate.setMinutes(closingMinutes);
    closingDate.setSeconds(0);
    closingDate.setMilliseconds(0);
  
    // Compare the two times
    return dropOffDate <= closingDate;
  };
  