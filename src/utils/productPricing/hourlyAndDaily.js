import { setingDiscount } from "../discountSetting";

export const pricingHourlyAndDaily = (
  hourlyPricing,
  dayPricing,
  timeDuration,
  durationInDays,
  setTotalPaymentOptions
) => {
  let status = true;
  let message = "";
  let total = 0;
  let hourly = {
    totalAmount: total,
    perHourlyAmount: hourlyPricing?.hourlyAmount,
  };
  let daily = {
    totalAmount: total,
    perDayAmount: dayPricing.dailyAmount,
  };

  // handling hourly min and max only
  if (hourlyPricing) {
    if (timeDuration <= hourlyPricing?.min && durationInDays == 0) {
      // status = false;
      // message = `Minimum ${hourlyPricing?.min} hour is required`;
      total = hourlyPricing?.min * hourlyPricing?.hourlyAmount;
      
      if (hourlyPricing?.discounts && hourlyPricing?.discounts.length !== 0) {
        const percentage = setingDiscount(
          hourlyPricing?.discounts,
          timeDuration
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
      setTotalPaymentOptions((prev) => ({ ...prev, hourly: hourly, daily: daily }));
      return { status, message, total };
    } else if(timeDuration <= hourlyPricing?.max && durationInDays == 0){
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
      setTotalPaymentOptions((prev) => ({ ...prev, hourly: hourly, daily: daily }));
      return { status, message, total };
    } else if (timeDuration > hourlyPricing?.max && durationInDays == 0){
      total = dayPricing?.min * dayPricing.dailyAmount;
      if (dayPricing.discounts && dayPricing.discounts.length !== 0) {
        const percentage = setingDiscount(dayPricing.discounts, durationInDays);
        if (percentage && percentage > 0) {
          const discountAmount = (dayPricing?.min * dayPricing.dailyAmount) * (percentage / 100);
          total -= discountAmount;

          daily = {
            ...daily,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      setTotalPaymentOptions((prev) => ({ ...prev, hourly: hourly, daily: daily }));
      return { status, message, total };
    }
  }

  // handling min days calculation
  if (dayPricing && durationInDays > 0) {
    if (durationInDays <= dayPricing?.min) {
      // status = false;
      // message = `Minimum ${dayPricing?.min} days are required`;
      total = dayPricing?.min * dayPricing.dailyAmount;
      if (dayPricing.discounts && dayPricing.discounts.length !== 0) {
        const percentage = setingDiscount(dayPricing.discounts, durationInDays);
        if (percentage && percentage > 0) {
          const discountAmount = (dayPricing?.min * dayPricing.dailyAmount) * (percentage / 100);
          total -= discountAmount;

          daily = {
            ...daily,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      setTotalPaymentOptions((prev) => ({ ...prev, hourly: hourly, daily: daily }));
      return { status, message, total };
    }

    if (dayPricing?.max < durationInDays) {
      const dayWord = durationInDays === 1 ? "day" : "days";

      status = false;
      message = `Maximum ${dayPricing?.max} ${dayWord} is allowed`;
    }
    if (dayPricing?.max === durationInDays && timeDuration > 0) {
      const dayWord = durationInDays === 1 ? "day" : "days";
      const hourWord = timeDuration === 1 ? "hour" : "hours";
      status = false;
      message = ` Maximum ${dayPricing?.max} ${dayWord} allowed. ${durationInDays} ${dayWord} ${timeDuration} ${hourWord} total.`;
    }
  }

  if (status) {
    if (durationInDays <= dayPricing?.max) {
      total += durationInDays * dayPricing?.dailyAmount;
      if (dayPricing?.discounts && dayPricing?.discounts.length !== 0) {
        const percentage = setingDiscount(
          dayPricing?.discounts,
          durationInDays
        );
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
        hourly: hourly,
        daily: daily,
      }));
      return { status, message, total };
    }
  }

  setTotalPaymentOptions((prev) => ({ ...prev, hourly: hourly, daily: daily }));
  return { status, message, total };
};