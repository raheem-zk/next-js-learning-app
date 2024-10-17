export const addHours = (timeString, hoursToAdd) => {
  // Split timeString into hours, minutes, and period (am/pm)
  let [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  // Convert hours to 24-hour format if in PM
  if (period === 'pm' && hours !== 12) {
      hours += 12;
  } else if (period === 'am' && hours === 12) {
      hours = 0; // Convert 12:00 am to 0 hours (midnight)
  }

  // Create a Date object with the given time
  let date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  // Add the specified hours
  date.setHours(date.getHours() + hoursToAdd);

  // Format the resulting time back to "hh:mm am/pm" format
  let newHours = date.getHours() % 12;
  let newMinutes = date.getMinutes();
  let newPeriod = (date.getHours() < 12) ? 'am' : 'pm';

  // Handle noon and midnight edge cases
  if (newHours === 0) {
      newHours = 12;
  }

  // Format the time string
  let newTimeString = `${newHours}:${newMinutes < 10 ? '0' : ''}${newMinutes} ${newPeriod}`;
  
  return newTimeString;
}



// const newTime = addHours("3:00 pm", 1); // "4:00 pm"
