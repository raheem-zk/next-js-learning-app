export const packagePricingDailyOnly = (
  pricing,
  selectedPackage,
  durationInDays,
  setTotalPaymentOptions
) => {
  const { packagePricing, extraDayCharge } = pricing;
  const pkg = packagePricing?.find((pkg) => pkg?._id == selectedPackage);

  // Ensure pkg exists and durationInDays is valid
  if (!pkg || !extraDayCharge || durationInDays <= 0) {
    console.error("Invalid package selection or duration.");
    setTotalPaymentOptions(null);
    return 0;
  }

  // Calculate extra days beyond package duration, ensuring no negative days
  const extraDays = Math.max(0, durationInDays - pkg?.days);

  // Calculate the total cost
  const totalCost = extraDays * extraDayCharge + pkg?.price;

  // Debugging alert (can remove in production)
  // alert(`Extra days: ${extraDays} || Package days: ${pkg?.days} || Total cost: ${totalCost}`);

  // Clear or set the total payment options
  setTotalPaymentOptions(null); // Adjust this logic as needed

  return totalCost;
};
