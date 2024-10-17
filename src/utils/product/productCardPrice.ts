export const productCardPriceFrom = (pricing) => {
  const { dayPricing, monthlyPricing, hourlyPricing , packagePricing } = pricing;
  
  let amount = 0;
  if(packagePricing?.length > 0 ) {
    amount = packagePricing[0].price;
    return amount.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  }
  if (hourlyPricing && hourlyPricing.hourlyAmount && hourlyPricing.min) {
    // amount = hourlyPricing.min * hourlyPricing.hourlyAmount;
    amount = hourlyPricing.hourlyAmount;
  } else if (dayPricing && dayPricing.dailyAmount && dayPricing.min) {
    // amount = dayPricing.min * dayPricing.dailyAmount;
    amount = dayPricing.dailyAmount;
  } else if (monthlyPricing && monthlyPricing.monthlyAmount && monthlyPricing.min) {
    // amount = monthlyPricing.min * monthlyPricing.monthlyAmount;
    amount = monthlyPricing.monthlyAmount;
  }
  
  return amount.toLocaleString("en-IN", { maximumFractionDigits: 2 });
};
