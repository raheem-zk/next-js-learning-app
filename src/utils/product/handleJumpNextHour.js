export const handleJumpNextHour = (hoursToJump = 1) => {
  const currentDate = new Date();

  // Get the current hours and minutes
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  // Round minutes to the nearest hour
  if (minutes > 0) {
    currentDate.setHours(hours + 1);
    currentDate.setMinutes(0);
  }

  // Increment the time by the specified number of hours
  currentDate.setHours(currentDate.getHours() + hoursToJump);

  // Format the new time string
  let newHours = currentDate.getHours();
  const newMinutes = currentDate.getMinutes().toString().padStart(2, "0");
  const newModifier = newHours >= 12 ? "pm" : "am";

  newHours = newHours % 12;
  newHours = newHours ? newHours : 12; // the hour '0' should be '12'

  return `${newHours}:${newMinutes} ${newModifier}`;
};