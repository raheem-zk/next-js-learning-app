import { setingDiscount } from "../discountSetting";

export const pricingHourlyDailyAndMonthly = (
  hourlyPricing,
  dayPricing,
  monthlyPricing,
  timeDuration,
  durationInDays,
  durationInMonths,
  setTotalPaymentOptions
) => {
  let status = true;
  let message = "";
  let total = 0;
  let actualMonthDuration = 0;
  const months = Math.floor(durationInMonths);
  const remainingDays = durationInDays;

  let hourly = {
    totalAmount: total,
    perHourlyAmount: hourlyPricing?.hourlyAmount,
  };
  let daily = {
    totalAmount: total,
    perDayAmount: dayPricing.dailyAmount,
  };
  let monthly = {
    totalAmount: total,
    perMonthAmount: monthlyPricing.monthlyAmount,
  };
  if (hourlyPricing) {
    if (
      timeDuration < hourlyPricing?.min &&
      months == 0 &&
      durationInDays == 0
    ) {
      // status = false;
      // message = `Minimum ${hourlyPricing?.min} hour is required`;
      total = hourlyPricing?.min * hourlyPricing?.hourlyAmount;
      if (hourlyPricing?.discounts && hourlyPricing?.discounts?.length !== 0) {
        const percentage = setingDiscount(
          hourlyPricing?.discounts,
          hourlyPricing?.min
        );
        if (percentage && percentage > 0) {
          const discountAmount = (hourlyPricing?.min * hourlyPricing?.hourlyAmount) * (percentage / 100);
          total -= discountAmount;

          hourly = {
            ...hourly,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      setTotalPaymentOptions((prev) => ({
        ...prev,
        daily: daily,
        monthly: monthly,
      }));
      return { status, message, total , actualMonthDuration , monthlyDiscountData : monthly };
    }
    if (
      timeDuration <= hourlyPricing?.max &&
      months == 0 &&
      durationInDays == 0
    ) {
      // status = false;
      // message = `Minimum ${hourlyPricing?.min} hour is required`;
      total = timeDuration * hourlyPricing?.hourlyAmount;
      if (hourlyPricing?.discounts && hourlyPricing?.discounts.length !== 0) {
        const percentage = setingDiscount(
          hourlyPricing?.discounts,
          timeDuration
        );
        if (percentage && percentage > 0) {
          const discountAmount = (timeDuration * hourlyPricing?.hourlyAmount) * (percentage / 100);
          total -= discountAmount;

          hourly = {
            ...hourly,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      setTotalPaymentOptions((prev) => ({
        ...prev,
        daily: daily,
        monthly: monthly,
      }));
      return { status, message, total , actualMonthDuration , monthlyDiscountData : monthly };
    }
  }

  if (monthlyPricing && months > 0) {
    if (monthlyPricing?.max < months) {
      status = false;
      message = `Maximum ${monthlyPricing?.max} month(s) are allowed`;
    }
    if (monthlyPricing?.max === months && timeDuration > 0) {
      status = false;
      message = `Maximum ${monthlyPricing?.max} month(s) have been reached. Additional hour are not allowed`;
    }
    if (monthlyPricing?.max == months && remainingDays > 0) {
      status = false;
      message = `Maximum ${monthlyPricing?.max} month(s) have been reached. Additional days are not allowed`;
    }
  }

  if (status) {
    if (durationInDays < dayPricing?.min && months == 0) {
      // status = false;
      // message = `Minimum ${dayPricing?.min} days are required`;
      total = dayPricing?.min * dayPricing?.dailyAmount;
      if (dayPricing?.discounts && dayPricing?.discounts?.length !== 0) {
        const percentage = setingDiscount(
          dayPricing.discounts,
          durationInDays + 1
        );
        if (percentage && percentage > 0) {
          const discountAmount = (dayPricing?.min * dayPricing?.dailyAmount) * (percentage / 100);
          total -= discountAmount;

          daily = {
            ...daily,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      setTotalPaymentOptions((prev) => ({
        ...prev,
        daily: daily,
        monthly: monthly,
      }));
      return { status, message, total , actualMonthDuration , monthlyDiscountData : monthly };
    }

    if (durationInDays < dayPricing?.max && months == 0) {
      total = durationInDays * dayPricing?.dailyAmount;
      if (dayPricing?.discounts && dayPricing?.discounts?.length !== 0) {
        const percentage = setingDiscount(dayPricing.discounts, durationInDays);
        if (percentage && percentage > 0) {
          const discountAmount = (durationInDays * dayPricing?.dailyAmount) * (percentage / 100);
          total -= discountAmount;

          daily = {
            ...daily,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      total += timeDuration * hourlyPricing?.hourlyAmount;
      if (hourlyPricing?.discounts && hourlyPricing?.discounts.length !== 0) {
        const percentage = setingDiscount(
          hourlyPricing?.discounts,
          timeDuration
        );
        if (percentage && percentage > 0) {
          const discountAmount =
            (timeDuration * hourlyPricing?.hourlyAmount) * (percentage / 100);
          // const discountAmount = total * (percentage / 100);
          total -= discountAmount;

          hourly = {
            ...hourly,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      setTotalPaymentOptions((prev) => ({
        ...prev,
        daily: daily,
        monthly: monthly,
      }));
      return { status, message, total , actualMonthDuration , monthlyDiscountData : monthly };
    }
    if (durationInDays <= dayPricing?.max && months == 0 && timeDuration == 0) {
      total = durationInDays * dayPricing?.dailyAmount;
      if (dayPricing?.discounts && dayPricing?.discounts.length !== 0) {
        const percentage = setingDiscount(
          dayPricing?.discounts,
          durationInDays
        );
        if (percentage && percentage > 0) {
          const discountAmount =
            (durationInDays * dayPricing?.dailyAmount) * (percentage / 100);
          total -= discountAmount;

          daily = {
            ...daily,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      setTotalPaymentOptions((prev) => ({
        ...prev,
        daily: daily,
        monthly: monthly,
      }));
      return { status, message, total , actualMonthDuration , monthlyDiscountData : monthly };
    }

    if (months == 0 && dayPricing?.max < durationInDays) {
      total += monthlyPricing?.min * monthlyPricing?.monthlyAmount;
      if (monthlyPricing?.discounts && monthlyPricing?.discounts.length !== 0) {
        const percentage = setingDiscount(
          monthlyPricing?.discounts,
          monthlyPricing?.min
        );
        if (percentage && percentage > 0) {
          const discountAmount = (monthlyPricing?.min * monthlyPricing?.monthlyAmount) * (percentage / 100);
          total -= discountAmount;

          monthly = {
            ...monthly,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      actualMonthDuration = monthlyPricing?.min
      setTotalPaymentOptions((prev) => ({
        ...prev,
        daily: daily,
        monthly: monthly,
      }));
      return { status, message, total , actualMonthDuration , monthlyDiscountData : monthly };
    }

    if (months >= 0 && monthlyPricing?.min > months) {
      total += monthlyPricing?.min * monthlyPricing?.monthlyAmount;
      if (monthlyPricing?.discounts && monthlyPricing?.discounts.length !== 0) {
        const percentage = setingDiscount(
          monthlyPricing?.discounts,
          monthlyPricing?.min
        );
        if (percentage && percentage > 0) {
          const discountAmount = (monthlyPricing?.min * monthlyPricing?.monthlyAmount) * (percentage / 100);
          total -= discountAmount;

          monthly = {
            ...monthly,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      actualMonthDuration = monthlyPricing?.min
      setTotalPaymentOptions((prev) => ({
        ...prev,
        daily: daily,
        monthly: monthly,
      }));
      return { status, message, total , actualMonthDuration , monthlyDiscountData : monthly };
    }

    if (months >= 0 && monthlyPricing?.max >= months) {
      total += months * monthlyPricing?.monthlyAmount;
      if (
        monthlyPricing?.discounts &&
        monthlyPricing?.discounts?.length !== 0
      ) {
        const percentage = setingDiscount(monthlyPricing?.discounts, months);
        if (percentage && percentage > 0) {
          const discountAmount = (months * monthlyPricing?.monthlyAmount) * (percentage / 100);
          // const discountAmount = total * (percentage / 100);
          total -= discountAmount;

          monthly = {
            ...monthly,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      total += durationInDays * dayPricing?.dailyAmount;
      if (dayPricing?.discounts && dayPricing?.discounts.length !== 0) {
        const percentage = setingDiscount(
          dayPricing?.discounts,
          durationInDays
        );
        if (percentage && percentage > 0) {
          const discountAmount =
            (durationInDays * dayPricing?.dailyAmount) * (percentage / 100);
          total -= discountAmount;

          daily = {
            ...daily,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      total += timeDuration * hourlyPricing?.hourlyAmount;
      if (hourlyPricing?.discounts && hourlyPricing?.discounts.length !== 0) {
        const percentage = setingDiscount(
          hourlyPricing?.discounts,
          timeDuration
        );
        if (percentage && percentage > 0) {
          const discountAmount =
            (timeDuration * hourlyPricing?.hourlyAmount) * (percentage / 100);
          total -= discountAmount;

          hourly = {
            ...hourly,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      actualMonthDuration = months || 0
      setTotalPaymentOptions((prev) => ({
        ...prev,
        daily: daily,
        monthly: monthly,
      }));
      return { status, message, total , actualMonthDuration , monthlyDiscountData : monthly };
    }
  }
  setTotalPaymentOptions((prev) => ({
    ...prev,
    daily: daily,
    monthly: monthly,
  }));
  return { status, message, total , actualMonthDuration , monthlyDiscountData : monthly };
};
