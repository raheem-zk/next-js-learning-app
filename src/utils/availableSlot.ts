//  first working one for day
// export const getAvailableDateRanges = (workingDays, setPickupDate, min, max, setDropOffDate, unavailableDates) => {
//     const currentDate = new Date();
//     const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//     const currentDay = days[currentDate.getDay()];

//     // Check if there are any unavailable dates
//     const isUnavailableDatesEmpty = unavailableDates.length === 0;

//     if (!isUnavailableDatesEmpty) {
//         // Check if current date is in any unavailable date range
//         const isCurrentDateUnavailable = unavailableDates.some(dateRange => {
//             const startDate = new Date(dateRange.startDate);
//             const endDate = new Date(dateRange.endDate);

//             return currentDate >= startDate && currentDate <= endDate;
//         });

//         if (isCurrentDateUnavailable) {
//             let nextWorkingDay = currentDay;
//             let dayOffset = 1;
//             while (true) {
//                 const nextDayIndex = (currentDate.getDay() + dayOffset) % 7;
//                 nextWorkingDay = days[nextDayIndex];

//                 const isNextDayWorking = workingDays.some(
//                     (holiday) => holiday.name === nextWorkingDay && holiday.working
//                 );
//                 if (isNextDayWorking) {
//                     break;
//                 }

//                 dayOffset++;
//             }

//             const nextWorkingDate = new Date();
//             nextWorkingDate.setDate(currentDate.getDate() + dayOffset);
//             setPickupDate(nextWorkingDate);

//             const dropOffDate = new Date(nextWorkingDate);
//             dropOffDate.setDate(dropOffDate.getDate() + min);
//             setDropOffDate(dropOffDate);
//         } else {
//             setPickupDate(currentDate);

//             const dropOffDate = new Date(currentDate);
//             dropOffDate.setDate(dropOffDate.getDate() + min);
//             setDropOffDate(dropOffDate);
//         }
//     } else {
//         // No unavailable dates, check if current day is a working day
//         const isCurrentDayWorking = workingDays.some(
//             (holiday) => holiday.name === currentDay && holiday.working
//         );

//         if (isCurrentDayWorking) {
//             setPickupDate(currentDate);

//             const dropOffDate = new Date(currentDate);
//             dropOffDate.setDate(dropOffDate.getDate() + min);
//             setDropOffDate(dropOffDate);
//         } else {
//             let nextWorkingDay = currentDay;
//             let dayOffset = 1;
//             while (true) {
//                 const nextDayIndex = (currentDate.getDay() + dayOffset) % 7;
//                 nextWorkingDay = days[nextDayIndex];

//                 const isNextDayWorking = workingDays.some(
//                     (holiday) => holiday.name === nextWorkingDay && holiday.working
//                 );
//                 if (isNextDayWorking) {
//                     break;
//                 }

//                 dayOffset++;
//             }

//             const nextWorkingDate = new Date();
//             nextWorkingDate.setDate(currentDate.getDate() + dayOffset);
//             setPickupDate(nextWorkingDate);

//             const dropOffDate = new Date(nextWorkingDate);
//             dropOffDate.setDate(dropOffDate.getDate() + min);
//             setDropOffDate(dropOffDate);
//         }
//     }
// };
//

export const getAvailableDateRanges = (
  workingDays,
  setPickupDate,
  min,
  max,
  setDropOffDate,
  unavailableDates
) => {
  const currentDate = new Date();
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentDay = days[currentDate.getDay()];

  // Check if there are any unavailable dates
  const isUnavailableDatesEmpty = unavailableDates.length === 0;

  if (!isUnavailableDatesEmpty) {
    // Check if current date is in any unavailable date range
    const isCurrentDateUnavailable = unavailableDates.some((dateRange) => {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);

      return currentDate >= startDate && currentDate <= endDate;
    });

    if (isCurrentDateUnavailable) {
      let nextWorkingDay = currentDay;
      let dayOffset = 1;
      while (true) {
        const nextDayIndex = (currentDate.getDay() + dayOffset) % 7;
        nextWorkingDay = days[nextDayIndex];

        const isNextDayWorking = workingDays.some(
          (holiday) => holiday.name === nextWorkingDay && holiday.working
        );
        if (isNextDayWorking) {
          break;
        }

        dayOffset++;
      }

      const nextWorkingDate = new Date();
      nextWorkingDate.setDate(currentDate.getDate() + dayOffset);
      setPickupDate(nextWorkingDate);

      let dropOffDate = new Date(nextWorkingDate);
      dropOffDate.setDate(dropOffDate.getDate() + min);

      // Check if drop-off date is a working day, if not, set it to the next working day
      while (
        !workingDays.some(
          (holiday) =>
            holiday.name === days[dropOffDate.getDay()] && holiday.working
        )
      ) {
        dropOffDate.setDate(dropOffDate.getDate() + 1);
      }

      // Check if the difference between pickup and drop-off dates exceeds max duration
      const differenceInDays =
        (dropOffDate - nextWorkingDate) / (1000 * 3600 * 24);
      if (differenceInDays > max) {
        // Reset pickup date and recalculate drop-off date
        dropOffDate = new Date(nextWorkingDate);
        dropOffDate.setDate(dropOffDate.getDate() + min);

        while (
          !workingDays.some(
            (holiday) =>
              holiday.name === days[dropOffDate.getDay()] && holiday.working
          )
        ) {
          dropOffDate.setDate(dropOffDate.getDate() + 1);
        }
        setPickupDate(dropOffDate);
      }

      setDropOffDate(dropOffDate);
    } else {
      setPickupDate(currentDate);

      let dropOffDate = new Date(currentDate);
      dropOffDate.setDate(dropOffDate.getDate() + min);

      // Check if drop-off date is a working day, if not, set it to the next working day
      while (
        !workingDays.some(
          (holiday) =>
            holiday.name === days[dropOffDate.getDay()] && holiday.working
        )
      ) {
        dropOffDate.setDate(dropOffDate.getDate() + 1);
      }

      // Check if the difference between pickup and drop-off dates exceeds max duration
      const differenceInDays = (dropOffDate - currentDate) / (1000 * 3600 * 24);
      if (differenceInDays > max) {
        // Reset pickup date and recalculate drop-off date
        dropOffDate = new Date(currentDate);
        dropOffDate.setDate(dropOffDate.getDate() + min);

        while (
          !workingDays.some(
            (holiday) =>
              holiday.name === days[dropOffDate.getDay()] && holiday.working
          )
        ) {
          dropOffDate.setDate(dropOffDate.getDate() + 1);
        }
        setPickupDate(dropOffDate);
      }

      setDropOffDate(dropOffDate);
    }
  } else {
    // No unavailable dates, check if current day is a working day
    const isCurrentDayWorking = workingDays.some(
      (holiday) => holiday.name === currentDay && holiday.working
    );

    if (isCurrentDayWorking) {
      setPickupDate(currentDate);

      let dropOffDate = new Date(currentDate);
      dropOffDate.setDate(dropOffDate.getDate() + min);

      // Check if drop-off date is a working day, if not, set it to the next working day
      while (
        !workingDays.some(
          (holiday) =>
            holiday.name === days[dropOffDate.getDay()] && holiday.working
        )
      ) {
        dropOffDate.setDate(dropOffDate.getDate() + 1);
      }

      // Check if the difference between pickup and drop-off dates exceeds max duration
      const differenceInDays = (dropOffDate - currentDate) / (1000 * 3600 * 24);
      if (differenceInDays > max) {
        // Reset pickup date and recalculate drop-off date
        dropOffDate = new Date(currentDate);
        dropOffDate.setDate(dropOffDate.getDate() + min);

        while (
          !workingDays.some(
            (holiday) =>
              holiday.name === days[dropOffDate.getDay()] && holiday.working
          )
        ) {
          dropOffDate.setDate(dropOffDate.getDate() + 1);
        }
        setPickupDate(dropOffDate);
      }

      setDropOffDate(dropOffDate);
    } else {
      let nextWorkingDay = currentDay;
      let dayOffset = 1;
      while (true) {
        const nextDayIndex = (currentDate.getDay() + dayOffset) % 7;
        nextWorkingDay = days[nextDayIndex];

        const isNextDayWorking = workingDays.some(
          (holiday) => holiday.name === nextWorkingDay && holiday.working
        );
        if (isNextDayWorking) {
          break;
        }

        dayOffset++;
      }

      const nextWorkingDate = new Date();
      nextWorkingDate.setDate(currentDate.getDate() + dayOffset);
      setPickupDate(nextWorkingDate);

      let dropOffDate = new Date(nextWorkingDate);
      dropOffDate.setDate(dropOffDate.getDate() + min);

      // Check if drop-off date is a working day, if not, set it to the next working day
      while (
        !workingDays.some(
          (holiday) =>
            holiday.name === days[dropOffDate.getDay()] && holiday.working
        )
      ) {
        dropOffDate.setDate(dropOffDate.getDate() + 1);
      }

      // Check if the difference between pickup and drop-off dates exceeds max duration
      const differenceInDays =
        (dropOffDate - nextWorkingDate) / (1000 * 3600 * 24);
      if (differenceInDays > max) {
        // Reset pickup date and recalculate drop-off date
        dropOffDate = new Date(nextWorkingDate);
        dropOffDate.setDate(dropOffDate.getDate() + min);

        while (
          !workingDays.some(
            (holiday) =>
              holiday.name === days[dropOffDate.getDay()] && holiday.working
          )
        ) {
          dropOffDate.setDate(dropOffDate.getDate() + 1);
        }
        setPickupDate(dropOffDate);
      }

      setDropOffDate(dropOffDate);
    }
  }
};

export const getAvailableMonthlyRanges = (
  workingDays,
  setPickupDate,
  min,
  max,
  setDropOffDate,
  unavailableDates,
  dayPricing
) => {
  const currentDate = new Date();
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentDay = days[currentDate.getDay()];

  // Check if there are any unavailable dates
  const isUnavailableDatesEmpty = unavailableDates.length === 0;
  if (!isUnavailableDatesEmpty) {
    // Check if current date is in any unavailable date range
    const isCurrentDateUnavailable = unavailableDates.some((dateRange) => {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);

      return currentDate >= startDate && currentDate <= endDate;
    });
    if (isCurrentDateUnavailable) {
      let nextWorkingDay = currentDay;
      let dayOffset = 1;
      while (true) {
        const nextDayIndex = (currentDate.getDay() + dayOffset) % 7;
        nextWorkingDay = days[nextDayIndex];

        const isNextDayWorking = workingDays.some(
          (holiday) => holiday.name === nextWorkingDay && holiday.working
        );
        if (isNextDayWorking) {
          break;
        }

        dayOffset++;
      }

      const nextWorkingDate = new Date();
      nextWorkingDate.setDate(currentDate.getDate() + dayOffset);
      setPickupDate(nextWorkingDate);

      let dropOffDate = new Date(nextWorkingDate);
      const monthDays = 28; // Assuming a month is 28 days for pricing calculation
      dropOffDate.setDate(dropOffDate.getDate() + min * monthDays); // Set drop-off date to min months after pickup date

      setDropOffDate(dropOffDate);
    } else {
      setPickupDate(currentDate);

      let dropOffDate = new Date(currentDate);
      const monthDays = 28; // Assuming a month is 28 days for pricing calculation
      dropOffDate.setDate(dropOffDate.getDate() + min * monthDays); // Set drop-off date to min months after pickup date

      setDropOffDate(dropOffDate);
    }
  } else {
    // No unavailable dates, check if current day is a working day
    const isCurrentDayWorking = workingDays.some(
      (holiday) => holiday.name === currentDay && holiday.working
    );

    if (isCurrentDayWorking) {
      setPickupDate(currentDate);

      let dropOffDate = new Date(currentDate);
      const monthDays = 28;
      dropOffDate.setDate(dropOffDate.getDate() + min * monthDays);

      setDropOffDate(dropOffDate);
    } else {
      let nextWorkingDay = currentDay;
      let dayOffset = 1;
      while (true) {
        const nextDayIndex = (currentDate.getDay() + dayOffset) % 7;
        nextWorkingDay = days[nextDayIndex];

        const isNextDayWorking = workingDays.some(
          (holiday) => holiday.name === nextWorkingDay && holiday.working
        );
        if (isNextDayWorking) {
          break;
        }

        dayOffset++;
      }

      const nextWorkingDate = new Date();
      nextWorkingDate.setDate(currentDate.getDate() + dayOffset);
      setPickupDate(nextWorkingDate);
      console.log(nextWorkingDate, "start date ", min, min * 28);
      let dropOffDate = new Date(nextWorkingDate);
      const monthDays = 28;
      dropOffDate.setDate(dropOffDate.getDate() + min * monthDays);

      const finalDropOffDate = setWorkingDay(dropOffDate, workingDays);
      if (finalDropOffDate.getTime() === dropOffDate.getTime()) {
        setDropOffDate(dropOffDate);
      } else {
        if (dayPricing && dayPricing.max) {
          const maxAllowDays =
            dayPricing.min < dayPricing.max ? dayPricing.max : dayPricing.min;
          const diffInDays = Math.ceil(
            (finalDropOffDate.getTime() - dropOffDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );
          console.log(
            diffInDays,
            "diff in days ",
            maxAllowDays,
            " max allow days "
          );
          if (diffInDays <= maxAllowDays) {
            setDropOffDate(finalDropOffDate);
          } else {
            setDropOffDate(finalDropOffDate);
          }
        } else {
          setDropOffDate(dropOffDate);
        }
      }
    }
  }
};

const setWorkingDay = (currentDate, workingDays) => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentDay = days[currentDate.getDay()];
  const isCurrentDayWorking = workingDays.some(
    (holiday) => holiday.name === currentDay && holiday.working
  );
  if (!isCurrentDayWorking) {
    return currentDate;
  } else {
    let nextWorkingDay = currentDay;
    let dayOffset = 1;
    while (true) {
      const nextDayIndex = (currentDate.getDay() + dayOffset) % 7;
      nextWorkingDay = days[nextDayIndex];

      const isNextDayWorking = workingDays.some(
        (holiday) => holiday.name === nextWorkingDay && holiday.working
      );
      if (isNextDayWorking) {
        break;
      }
      dayOffset++;
    }
    const nextWorkingDate = new Date(currentDate);
    nextWorkingDate.setHours(0, 0, 0, 0); // Set time to midnight to avoid issues with time zone changes
    nextWorkingDate.setDate(currentDate.getDate() + dayOffset);
    return nextWorkingDate;
  }
};

// export const getAvailableMonthlyRanges = async (workingDays, setPickupDate, min, max, setDropOffDate, unavailableDates, dayPricing) => {
//     const currentDate = new Date();
//     const workingDate = await setWorkingDay(currentDate, workingDays)
//     setPickupDate(workingDate)

//     let dropOffDate = new Date(workingDate);
//     const monthDays = 28;
//     dropOffDate.setDate(dropOffDate.getDate() + (min * monthDays)); // Set drop-off date to min months after pickup date
//     console.log(dropOffDate,' droooooooo 28+')
//     const finalDropOffDate = setWorkingDay(dropOffDate, workingDays);
//     console.log(finalDropOffDate, ' got drop and now going to check', finalDropOffDate.getTime() === dropOffDate.getTime())
//     if (finalDropOffDate.getTime() === dropOffDate.getTime()) {
//         setDropOffDate(dropOffDate);
//     } else {
//         console.log(dayPricing, ' day pricing ')
// if (dayPricing && dayPricing.max) {
//     const maxAllowDays = dayPricing.min < dayPricing.max ? dayPricing.max : dayPricing.min;
//     const diffInDays = Math.ceil((finalDropOffDate.getTime() - dropOffDate.getTime()) / (1000 * 60 * 60 * 24));
//     console.log(diffInDays, 'diff in days ', maxAllowDays, ' max allow days ')
//     if (diffInDays <= maxAllowDays) {
//         setDropOffDate(finalDropOffDate);
//     } else {
//         setDropOffDate(finalDropOffDate);
//     }
// } else {
//     setDropOffDate(finalDropOffDate);
// }
//     }
// }

// export const getAvailableMonthlyRanges = (workingDays, setPickupDate, min, max, setDropOffDate, unavailableDates, dayPricing) => {
//     const currentDate = new Date();
//     const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//     const currentDay = days[currentDate.getDay()];

//     // Check if there are any unavailable dates
//     const isUnavailableDatesEmpty = unavailableDates.length === 0;
//     if (!isUnavailableDatesEmpty) {
//         // Check if current date is in any unavailable date range
//         const isCurrentDateUnavailable = unavailableDates.some(dateRange => {
//             const startDate = new Date(dateRange.startDate);
//             const endDate = new Date(dateRange.endDate);

//             return currentDate >= startDate && currentDate <= endDate;
//         });
//         if (isCurrentDateUnavailable) {
//             let nextWorkingDay = currentDay;
//             let dayOffset = 1;
//             while (true) {
//                 const nextDayIndex = (currentDate.getDay() + dayOffset) % 7;
//                 nextWorkingDay = days[nextDayIndex];

//                 const isNextDayWorking = workingDays.some(
//                     (holiday) => holiday.name === nextWorkingDay && holiday.working
//                 );
//                 if (isNextDayWorking) {
//                     break;
//                 }

//                 dayOffset++;
//             }

//             const nextWorkingDate = new Date();
//             nextWorkingDate.setDate(currentDate.getDate() + dayOffset);
//             setPickupDate(nextWorkingDate);

//             let dropOffDate = new Date(nextWorkingDate);
//             dropOffDate.setMonth(dropOffDate.getMonth() + min);

//             while (!workingDays.some((holiday) => holiday.name === days[dropOffDate.getDay()] && holiday.working)) {
//                 dropOffDate.setDate(dropOffDate.getDate() + 1);
//             }

//             // Check if the drop-off date exceeds the max duration
//             const differenceInMonths = (dropOffDate.getFullYear() - nextWorkingDate.getFullYear()) * 12 + dropOffDate.getMonth() - nextWorkingDate.getMonth();
//             if (differenceInMonths > max) {
//                 // Reset pickup date and recalculate drop-off date
//                 dropOffDate = new Date(nextWorkingDate);
//                 dropOffDate.setMonth(dropOffDate.getMonth() + min);

//                 while (!workingDays.some((holiday) => holiday.name === days[dropOffDate.getDay()] && holiday.working)) {
//                     dropOffDate.setDate(dropOffDate.getDate() + 1);
//                 }
//                 setPickupDate(dropOffDate);
//             }

//             setDropOffDate(dropOffDate);
//         } else {
//             setPickupDate(currentDate);

//             let dropOffDate = new Date(currentDate);
//             dropOffDate.setMonth(dropOffDate.getMonth() + min); // Set drop-off date to min months after pickup date

//             // Check if drop-off date is a valid working day, if not, set it to the next working day
//             while (!workingDays.some((holiday) => holiday.name === days[dropOffDate.getDay()] && holiday.working)) {
//                 dropOffDate.setDate(dropOffDate.getDate() + 1);
//             }

//             // Check if the drop-off date exceeds the max duration
//             const differenceInMonths = (dropOffDate.getFullYear() - currentDate.getFullYear()) * 12 + dropOffDate.getMonth() - currentDate.getMonth();
//             if (differenceInMonths > max) {
//                 // Reset pickup date and recalculate drop-off date
//                 dropOffDate = new Date(currentDate);
//                 dropOffDate.setMonth(dropOffDate.getMonth() + min);

//                 while (!workingDays.some((holiday) => holiday.name === days[dropOffDate.getDay()] && holiday.working)) {
//                     dropOffDate.setDate(dropOffDate.getDate() + 1);
//                 }
//                 setPickupDate(dropOffDate);
//             }

//             setDropOffDate(dropOffDate);
//         }
//     } else {
//         // No unavailable dates, check if current day is a working day
//         const isCurrentDayWorking = workingDays.some(
//             (holiday) => holiday.name === currentDay && holiday.working
//         );

//         if (isCurrentDayWorking) {
//             setPickupDate(currentDate);

//             let dropOffDate = new Date(currentDate);
//             dropOffDate.setMonth(dropOffDate.getMonth() + min);

//             while (!workingDays.some((holiday) => holiday.name === days[dropOffDate.getDay()] && holiday.working)) {
//                 dropOffDate.setDate(dropOffDate.getDate() + 1);
//             }

//             // Check if the drop-off date exceeds the max duration
//             const differenceInMonths = (dropOffDate.getFullYear() - currentDate.getFullYear()) * 12 + dropOffDate.getMonth() - currentDate.getMonth();
//             if (differenceInMonths > max) {
//                 // Reset pickup date and recalculate drop-off date
//                 dropOffDate = new Date(currentDate);
//                 dropOffDate.setMonth(dropOffDate.getMonth() + min);

//                 while (!workingDays.some((holiday) => holiday.name === days[dropOffDate.getDay()] && holiday.working)) {
//                     dropOffDate.setDate(dropOffDate.getDate() + 1);
//                 }
//                 setPickupDate(dropOffDate);
//             }

//             setDropOffDate(dropOffDate);
//         } else {
//             let nextWorkingDay = currentDay;
//             let dayOffset = 1;
//             while (true) {
//                 const nextDayIndex = (currentDate.getDay() + dayOffset) % 7;
//                 nextWorkingDay = days[nextDayIndex];

//                 const isNextDayWorking = workingDays.some(
//                     (holiday) => holiday.name === nextWorkingDay && holiday.working
//                 );
//                 if (isNextDayWorking) {
//                     break;
//                 }

//                 dayOffset++;
//             }

//             const nextWorkingDate = new Date();
//             nextWorkingDate.setDate(currentDate.getDate() + dayOffset);
//             setPickupDate(nextWorkingDate);
//             console.log(nextWorkingDate, "nextWorkingDate")

//             let dropOffDate = new Date(nextWorkingDate);
//             dropOffDate.setMonth(dropOffDate.getMonth() + min); // Set drop-off date to min months after pickup date
//             console.log(workingDays.some((holiday) => holiday.name === days[dropOffDate.getDay()] && holiday.working), ' cheeeeeee')

//             // Check if drop-off date is a valid working day, if not, set it to the next working day
//             while (!workingDays.some((holiday) => holiday.name === days[dropOffDate.getDay()] && holiday.working)) {
//                 dropOffDate.setDate(dropOffDate.getDate() + 1);
//             }

//             // Check if the drop-off date exceeds the max duration
//             const differenceInMonths = (dropOffDate.getFullYear() - nextWorkingDate.getFullYear()) * 12 + dropOffDate.getMonth() - nextWorkingDate.getMonth();
//             if (differenceInMonths > max) {
//                 // Reset pickup date and recalculate drop-off date
//                 dropOffDate = new Date(nextWorkingDate);
//                 dropOffDate.setMonth(dropOffDate.getMonth() + min);

//                 // console.log(workingDays.some((holiday) => holiday.name === days[dropOffDate.getDay()] && holiday.working), ' cheeeeeee')
//                 while (!workingDays.some((holiday) => holiday.name === days[dropOffDate.getDay()] && holiday.working)) {
//                     dropOffDate.setDate(dropOffDate.getDate() + 1);
//                 }
//                 setPickupDate(dropOffDate);
//             }

//             setDropOffDate(dropOffDate);
//         }
//     }
// };

// working month but not working the drop off data contition
// export const getAvailableMonthlyRanges = (workingDays, setPickupDate, min, max, setDropOffDate, unavailableDates) => {
//     const currentDate = new Date();
//     const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//     const currentDay = days[currentDate.getDay()];

//     // Check if there are any unavailable dates
//     const isUnavailableDatesEmpty = unavailableDates.length === 0;
//     if (!isUnavailableDatesEmpty) {
//         // Check if current date is in any unavailable date range
//         const isCurrentDateUnavailable = unavailableDates.some(dateRange => {
//             const startDate = new Date(dateRange.startDate);
//             const endDate = new Date(dateRange.endDate);

//             return currentDate >= startDate && currentDate <= endDate;
//         });
//         if (isCurrentDateUnavailable) {
//             let nextWorkingDay = currentDay;
//             let dayOffset = 1;
//             while (true) {
//                 const nextDayIndex = (currentDate.getDay() + dayOffset) % 7;
//                 nextWorkingDay = days[nextDayIndex];

//                 const isNextDayWorking = workingDays.some(
//                     (holiday) => holiday.name === nextWorkingDay && holiday.working
//                 );
//                 if (isNextDayWorking) {
//                     break;
//                 }

//                 dayOffset++;
//             }

//             const nextWorkingDate = new Date();
//             nextWorkingDate.setDate(currentDate.getDate() + dayOffset);
//             setPickupDate(nextWorkingDate);

//             const dropOffDate = new Date(nextWorkingDate);
//             dropOffDate.setMonth(dropOffDate.getMonth() + min); // Set drop-off date to min months after pickup date
//             setDropOffDate(dropOffDate);
//         } else {
//             setPickupDate(currentDate);

//             const dropOffDate = new Date(currentDate);
//             dropOffDate.setMonth(dropOffDate.getMonth() + min); // Set drop-off date to min months after pickup date
//             setDropOffDate(dropOffDate);
//         }
//     } else {
//         // No unavailable dates, check if current day is a working day
//         const isCurrentDayWorking = workingDays.some(
//             (holiday) => holiday.name === currentDay && holiday.working
//         );

//         if (isCurrentDayWorking) {
//             setPickupDate(currentDate);

//             const dropOffDate = new Date(currentDate);
//             dropOffDate.setMonth(dropOffDate.getMonth() + min); // Set drop-off date to min months after pickup date
//             setDropOffDate(dropOffDate);
//         } else {
//             let nextWorkingDay = currentDay;
//             let dayOffset = 1;
//             while (true) {
//                 const nextDayIndex = (currentDate.getDay() + dayOffset) % 7;
//                 nextWorkingDay = days[nextDayIndex];

//                 const isNextDayWorking = workingDays.some(
//                     (holiday) => holiday.name === nextWorkingDay && holiday.working
//                 );
//                 if (isNextDayWorking) {
//                     break;
//                 }

//                 dayOffset++;
//             }

//             const nextWorkingDate = new Date();
//             nextWorkingDate.setDate(currentDate.getDate() + dayOffset);
//             setPickupDate(nextWorkingDate);

//             const dropOffDate = new Date(nextWorkingDate);
//             dropOffDate.setMonth(dropOffDate.getMonth() + min); // Set drop-off date to min months after pickup date
//             setDropOffDate(dropOffDate);
//         }
//     }
// };

// export const getAvailableDateRanges = (workingDays, setPickupDate, min, max, setDropOffDate, unavailableDates) => {
//     const currentDate = new Date();
//     const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//     const currentDay = days[currentDate.getDay()];

//     const isCurrentDayWorking = workingDays.some(
//         (holiday) => holiday.name === currentDay && holiday.working
//     );

//     if (!isCurrentDayWorking) {
//         let nextWorkingDay = currentDay;
//         let dayOffset = 1;
//         while (true) {
//             const nextDayIndex = (currentDate.getDay() + dayOffset) % 7;
//             nextWorkingDay = days[nextDayIndex];

//             const isNextDayWorking = workingDays.some(
//                 (holiday) => holiday.name === nextWorkingDay && holiday.working
//             );
//             if (isNextDayWorking) {
//                 break;
//             }

//             dayOffset++;
//         }

//         const nextWorkingDate = new Date();
//         nextWorkingDate.setDate(currentDate.getDate() + dayOffset);
//         setPickupDate(nextWorkingDate);

//         const dropOffDate = new Date(nextWorkingDate);
//         dropOffDate.setDate(dropOffDate.getDate() + min);
//         setDropOffDate(dropOffDate);
//     } else {
//         setPickupDate(currentDate);

//         const dropOffDate = new Date(currentDate);
//         dropOffDate.setDate(dropOffDate.getDate() + min);
//         setDropOffDate(dropOffDate);
//     }
// };
