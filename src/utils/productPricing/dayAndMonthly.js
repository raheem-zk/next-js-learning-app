import { setingDiscount } from "../discountSetting";

export const pricingDailyAndMonthly = (
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
  let daily = {
    totalAmount: total,
    perDayAmount: dayPricing.dailyAmount,
  };
  let monthly = {
    totalAmount: total,
    perMonthAmount: monthlyPricing.monthlyAmount,
  };

  if (dayPricing) {
    if (durationInDays <= dayPricing?.min && months == 0) {
      // status = false;
      // message = `Minimum ${dayPricing?.min} days are required`;
      total = dayPricing?.min * dayPricing?.dailyAmount;
      if (dayPricing.discounts && dayPricing.discounts.length !== 0) {
        const percentage = setingDiscount(
          dayPricing.discounts,
          durationInDays + 1
        );
        if (percentage && percentage > 0) {
          const discountAmount =
            dayPricing?.min * dayPricing?.dailyAmount * (percentage / 100);
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
      return { status, message, total, actualMonthDuration , monthlyDiscountData : monthly };
    }
    if (durationInDays < dayPricing?.max && months == 0) {
      let totalDays = durationInDays;
      if (timeDuration > 0) {
        totalDays = durationInDays + 1;
      }
      total = totalDays * dayPricing?.dailyAmount;
      if (dayPricing.discounts && dayPricing.discounts.length !== 0) {
        const percentage = setingDiscount(dayPricing.discounts, totalDays);
        if (percentage && percentage > 0) {
          const discountAmount =
            totalDays * dayPricing?.dailyAmount * (percentage / 100);
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
      return { status, message, total, actualMonthDuration , monthlyDiscountData : monthly };
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
    if (months == 0 && dayPricing.max >= durationInDays && timeDuration > 0) {
      total += monthlyPricing?.min * monthlyPricing.monthlyAmount;
      if (monthlyPricing?.discounts && monthlyPricing?.discounts.length !== 0) {
        const percentage = setingDiscount(
          monthlyPricing?.discounts,
          monthlyPricing?.min
        );
        if (percentage && percentage > 0) {
          const discountAmount =
            monthlyPricing?.min *
            monthlyPricing.monthlyAmount *
            (percentage / 100);
          total -= discountAmount;

          monthly = {
            ...monthly,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      actualMonthDuration = monthlyPricing?.min || 0;
      setTotalPaymentOptions((prev) => ({
        ...prev,
        daily: daily,
        monthly: monthly,
      }));
      return { status, message, total, actualMonthDuration , monthlyDiscountData : monthly };
    } else if (
      months == 0 &&
      dayPricing.max >= durationInDays &&
      timeDuration == 0
    ) {
      total += durationInDays * dayPricing.dailyAmount;
      if (dayPricing.discounts && dayPricing.discounts.length !== 0) {
        const percentage = setingDiscount(dayPricing.discounts, durationInDays);
        if (percentage && percentage > 0) {
          const discountAmount =
            durationInDays * dayPricing.dailyAmount * (percentage / 100);
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
      return { status, message, total, actualMonthDuration , monthlyDiscountData : monthly };
    } else if (months == 0 && dayPricing?.max < durationInDays) {
      total += monthlyPricing?.min * monthlyPricing?.monthlyAmount;
      if (monthlyPricing?.discounts && monthlyPricing?.discounts.length !== 0) {
        const percentage = setingDiscount(
          monthlyPricing?.discounts,
          monthlyPricing?.min
        );
        if (percentage && percentage > 0) {
          const discountAmount =
            monthlyPricing?.min *
            monthlyPricing?.monthlyAmount *
            (percentage / 100);
          total -= discountAmount;

          monthly = {
            ...monthly,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      actualMonthDuration = monthlyPricing?.min || 0;
      setTotalPaymentOptions((prev) => ({
        ...prev,
        daily: daily,
        monthly: monthly,
      }));
      return { status, message, total, actualMonthDuration , monthlyDiscountData : monthly };
    }
    if (months >= 0 && monthlyPricing?.min > months) {
      total += monthlyPricing?.min * monthlyPricing?.monthlyAmount;
      if (monthlyPricing?.discounts && monthlyPricing?.discounts.length !== 0) {
        const percentage = setingDiscount(
          monthlyPricing?.discounts,
          monthlyPricing?.min
        );
        if (percentage && percentage > 0) {
          const discountAmount =
            monthlyPricing?.min *
            monthlyPricing?.monthlyAmount *
            (percentage / 100);
          total -= discountAmount;

          monthly = {
            ...monthly,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      actualMonthDuration = monthlyPricing?.min || 0;
      setTotalPaymentOptions((prev) => ({
        ...prev,
        daily: daily,
        monthly: monthly,
      }));
      return { status, message, total, actualMonthDuration , monthlyDiscountData : monthly };
    }

    if (months >= 0 && monthlyPricing?.max >= months) {
      total += months * monthlyPricing?.monthlyAmount;
      if (monthlyPricing?.discounts && monthlyPricing?.discounts.length !== 0) {
        const percentage = setingDiscount(monthlyPricing?.discounts, months);
        if (percentage && percentage > 0) {
          const discountAmount =
            months * monthlyPricing?.monthlyAmount * (percentage / 100);
          total -= discountAmount;

          monthly = {
            ...monthly,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      // Calculate the total days, including additional hours as a full day if applicable
      let totalDays = durationInDays;
      if (timeDuration > 0) {
        totalDays = durationInDays + 1;
      }
      total += totalDays * dayPricing.dailyAmount;
      if (dayPricing.discounts && dayPricing.discounts.length !== 0) {
        const percentage = setingDiscount(dayPricing.discounts, totalDays);
        if (percentage && percentage > 0) {
          const discountAmount =
            totalDays * dayPricing.dailyAmount * (percentage / 100);
          total -= discountAmount;

          daily = {
            ...daily,
            totalAmount: total,
            discountAmount: discountAmount,
            discountPercentage: percentage,
          };
        }
      }
      actualMonthDuration = months || 0;
      setTotalPaymentOptions((prev) => ({
        ...prev,
        daily: daily,
        monthly: monthly,
      }));
      return { status, message, total, actualMonthDuration , monthlyDiscountData : monthly };
    }
  }
  setTotalPaymentOptions((prev) => ({
    ...prev,
    daily: daily,
    monthly: monthly,
  }));
  return { status, message, total, actualMonthDuration , monthlyDiscountData : monthly };
};
