import { getDayDifference } from "./getDayDifference";

export const findNextUnavailableSlot = (pickupTime, unavailableSlots) => {
    let nextUnavailableSlot = null;
    let minDayDifference = Infinity;
  
    for (const slot of unavailableSlots) {
      const slotStartDate = new Date(slot.startDate);
  
      if (slotStartDate > pickupTime && getDayDifference(pickupTime, slotStartDate) < minDayDifference) {
        nextUnavailableSlot = slot;
        minDayDifference = getDayDifference(pickupTime, slotStartDate);
      }
    }
  
    return {
      nextUnavailableSlot,
      dayDifference: minDayDifference
    };
  };