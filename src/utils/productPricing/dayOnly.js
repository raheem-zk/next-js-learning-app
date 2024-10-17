import { setingDiscount } from "../discountSetting";

export const pricingDailyOnly = (
  dayPricing,
  durationInDays,
  timeDuration,
  setTotalPaymentOptions
) => {
  let status = true;
  let message = "";
  let total = 0;
  let daily = {
    totalAmount: total,
    perDayAmount: dayPricing.dailyAmount,
  };

  if (dayPricing) {
    if (durationInDays < dayPricing?.min) {
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
      setTotalPaymentOptions((prev) => ({ ...prev, daily: daily }));
      return { status, message, total };
    }
    // if (dayPricing?.max < durationInDays) {
    //     status = false;
    //     message = `Maximum ${dayPricing?.max} days is allowed`;
    // }
    // if(dayPricing?.max == durationInDays && timeDuration > 0){
    //     status = false;
    //     message =` Maximum ${dayPricing?.max} days have been reached. Additional hours are not allowed`
    // }
  }

  if (status) {
    if (timeDuration > 0) {
      total += (durationInDays + 1) * dayPricing.dailyAmount;
      if (dayPricing.discounts && dayPricing.discounts.length !== 0) {
        const percentage = setingDiscount(
          dayPricing.discounts,
          durationInDays + 1
        );
        if (percentage && percentage > 0) {
          const discountAmount = ((durationInDays + 1) * dayPricing.dailyAmount) * (percentage / 100);
          total -= discountAmount;

          daily = {
            ...daily,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
    } else {
      total = durationInDays * dayPricing.dailyAmount;

      if (dayPricing.discounts && dayPricing.discounts.length !== 0) {
        const percentage = setingDiscount(dayPricing.discounts, durationInDays);
        if (percentage && percentage > 0) {
          const discountAmount = (durationInDays * dayPricing.dailyAmount) * (percentage / 100);
          total -= discountAmount;

          daily = {
            ...daily,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
    }
  }
  setTotalPaymentOptions((prev) => ({ ...prev, daily: daily }));
  return { status, message, total };
};
