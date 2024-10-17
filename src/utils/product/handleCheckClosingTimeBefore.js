export const handleCheckClosingTimeBefore = (closingTimeString, hoursBefore) => {
  const currentDate = new Date();
  
  // Parse the closing time string (e.g., "5:00 pm")
  const [time, modifier] = closingTimeString.split(" ");
  let [closingHours, closingMinutes] = time.split(":").map(Number);
  if (modifier.toLowerCase() === "pm" && closingHours !== 12) {
    closingHours += 12;
  } else if (modifier.toLowerCase() === "am" && closingHours === 12) {
    closingHours = 0;
  }
  
  // Create a Date object for the closing time
  const closingDate = new Date(currentDate);
  closingDate.setHours(closingHours);
  closingDate.setMinutes(closingMinutes);
  closingDate.setSeconds(0);
  closingDate.setMilliseconds(0);

  // Calculate the time `hoursBefore` before the closing time
  const timeBeforeClosing = new Date(closingDate);
  timeBeforeClosing.setHours(closingDate.getHours() - hoursBefore);

  // Check if the current time is before the calculated time
  const isValidTime = currentDate <= timeBeforeClosing;
  return isValidTime;
};