import { getDayDifference } from "./getDayDifference";

export const handleNextAvailableDate = (
  workingDays,
  setPickupDate,
  min,
  max,
  setDropOffDate,
  unavailableDates,
  currentDate = new Date()
) => {
  // Initial pickupDate and dropOffDate setup
  let pickupDate = new Date(currentDate); // Initialize with your start date
  let dropOffDate = new Date(pickupDate);
  dropOffDate.setDate(dropOffDate.getDate() + min); // Adjust as needed
  const isWorkingDay = (date) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const dayName = days[date.getDay()];

    const day = workingDays.find((day) => day.name === dayName);

    return day ? day.working : false;
  };

  const isSlotAvailable = (start, end, unavailableSlots) => {
    const copyOfStart = start;
    start = new Date(start).getTime(); // Convert start date to milliseconds
    end = new Date(end).getTime(); // Convert end date to milliseconds

    for (const slot of unavailableSlots) {
      // const slotStart = new Date(slot.startDate).getTime(); // Convert slot start date to milliseconds
      // const slotEnd = new Date(slot.endDate).getTime(); // Convert slot end date to milliseconds

      const slotStart = new Date(slot.startDate).setHours(0, 0, 0, 0); // Start of the day
      const slotEnd = new Date(slot.endDate).setHours(23, 59, 59, 999); // End of the day
  
      // Check for overlap
      if (!(end <= slotStart || start >= slotEnd)) {
        const dayDiff = getDayDifference(copyOfStart, slot.endDate);
        return {
          available: false,
          overlapDurationDays: dayDiff !== 0 ? Math.round(dayDiff + 1) : 1,
        };
      }
    }
    return {
      available: true,
      overlapDurationDays: 0,
    };
  };

  const findNextAvailableDates = (pickupDate, dropOffDate) => {
    while (!isWorkingDay(pickupDate) || !isWorkingDay(dropOffDate)) {
      pickupDate.setDate(pickupDate.getDate() + 1);
      dropOffDate.setDate(dropOffDate.getDate() + 1);
    }

    return { pickupDate, dropOffDate };
  };

  const adjustToNextAvailableDates = (pickupDate, dropOffDate) => {
    let isAdjusted = false;

    while (
      !isWorkingDay(pickupDate) ||
      !isWorkingDay(dropOffDate) ||
      !isSlotAvailable(pickupDate, dropOffDate, unavailableDates).available
    ) {
      if (!isWorkingDay(pickupDate) || !isWorkingDay(dropOffDate)) {
        const workingDaysResponse = findNextAvailableDates(pickupDate, dropOffDate);
        pickupDate = workingDaysResponse.pickupDate;
        dropOffDate = workingDaysResponse.dropOffDate;
        isAdjusted = true;
      } else {
        const { overlapDurationDays } = isSlotAvailable(
          pickupDate,
          dropOffDate,
          unavailableDates
        );

        pickupDate.setDate(pickupDate.getDate() + overlapDurationDays);
        dropOffDate.setDate(dropOffDate.getDate() + overlapDurationDays);
        isAdjusted = true;
      }
    }

    return { pickupDate, dropOffDate, isAdjusted };
  };

  let adjustedDates = adjustToNextAvailableDates(pickupDate, dropOffDate);
  pickupDate = adjustedDates.pickupDate;
  dropOffDate = adjustedDates.dropOffDate;

  // Set the state or take further actions with the next available dates
  setPickupDate(pickupDate);
  setDropOffDate(dropOffDate);
};