export const setingDiscount = (discount, duration) => {
    if (!discount || !duration) {
        return 0;
    }
    console.log(discount , duration, ' in fff')
    const disc = discount.find(dis => duration >= dis.startDay && duration <= dis.endDay);

    return disc ? disc.percentage : 0;
};

export const getUpToDiscount = (pricing) => {
    if(!pricing){
        return 0;
    }
    let discounts = [];
    const { dayPricing, hourlyPricing, monthlyPricing } = pricing;

    if (dayPricing.discounts.length !== 0) {
        discounts = [...discounts, ...dayPricing.discounts];
    }
    if (hourlyPricing.discounts.length !== 0) {
        discounts = [...discounts, ...hourlyPricing.discounts];
    }
    if (monthlyPricing.discounts.length !== 0) {
        discounts = [...discounts, ...monthlyPricing.discounts];
    }

    if (discounts.length === 0) {
        return 0;
    }

    return Math.max(...discounts.map(discount => discount.percentage));
};
