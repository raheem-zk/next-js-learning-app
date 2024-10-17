import { setingDiscount } from "../discountSetting";

export const pricingHourlyOnly = (
  hourlyPricing,
  totalDuration,
  setTotalPaymentOptions,
  pickupTime,
  setDropOffTime
) => {
  let status = true;
  let message = "";
  let total = 0;
  let hourly = {
    totalAmount: total,
    perHourlyAmount: hourlyPricing?.hourlyAmount,
  };
  if (hourlyPricing) {
    if (totalDuration < hourlyPricing?.min) {
      // if (totalDuration === 0) {
      //   const [hour, minute, period] = pickupTime.split(/[:\s]+/);
      //   const pickupDate = new Date();
      //   pickupDate.setHours(
      //     parseInt(hour) +
      //       (period.toLowerCase() === "pm" && hour !== "12" ? 12 : 0)
      //   );
      //   pickupDate.setMinutes(parseInt(minute));

      //   // Calculate dropOffTime
      //   const dropOffDate = new Date(pickupDate);
      //   dropOffDate.setHours(dropOffDate.getHours() + 1);

      //   // Format dropOffTime back to "9:00 am" format
      //   const dropOffTime = `${dropOffDate.getHours() % 12 || 12}:${dropOffDate
      //     .getMinutes()
      //     .toString()
      //     .padStart(2, "0")} ${dropOffDate.getHours() < 12 ? "am" : "pm"}`;

      //   setDropOffTime(dropOffTime);
      // }
      // status = false;
      // message = `Minimum ${hourlyPricing?.min} hour are required`;
      total = hourlyPricing?.min * hourlyPricing?.hourlyAmount;
      if (hourlyPricing?.discounts && hourlyPricing?.discounts?.length !== 0) {
        const percentage = setingDiscount(
          hourlyPricing?.discounts,
          totalDuration
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
      setTotalPaymentOptions((prev) => ({ ...prev, hourly: hourly }));
      return { status, message, total };
    }
    // alert(`${hourlyPricing?.max} max ${totalDuration} totalDuration `)
    if (hourlyPricing?.max < totalDuration) {
        status = false;
        message = `Maximum ${hourlyPricing?.max} hour is allowed`;
    }
  }
  if (status) {
    total = totalDuration * hourlyPricing?.hourlyAmount;
    if (hourlyPricing?.discounts && hourlyPricing?.discounts?.length !== 0) {
      const percentage = setingDiscount(
        hourlyPricing?.discounts,
        totalDuration
      );
      if (percentage && percentage > 0) {
        const discountAmount = (totalDuration * hourlyPricing?.hourlyAmount) * (percentage / 100);
        total -= discountAmount;

        hourly = {
          ...hourly,
          totalAmount: total,
          discountAmount: discountAmount,
          discountPercentage: percentage,
        };
      }
    }
  }
  setTotalPaymentOptions((prev) => ({ ...prev, hourly: hourly }));

  return { status, message, total };
};
