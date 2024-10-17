import { setingDiscount } from "../discountSetting";

export const pricingHourlyAndMonthly = (hourlyPricing ,monthlyPricing,timeDuration , durationInDays, durationInMonths, setTotalPaymentOptions)=>{
    let status = true;
    let message = "";
    let total = 0;
    const months = Math.floor(durationInMonths);
    const remainingDays = durationInDays;
    let actualMonthDuration = 0

    let hourly = {
        totalAmount: total,
        perHourlyAmount: hourlyPricing?.hourlyAmount,
    };
    let monthly = {
        totalAmount: total,
        perMonthAmount: monthlyPricing.monthlyAmount,
    };

    if (hourlyPricing) {
        if (timeDuration < hourlyPricing?.min && months == 0 && durationInDays == 0 ) {
            // status = false;
            // message = `Minimum ${hourlyPricing?.min} hour is required`;
            total = hourlyPricing?.min * hourlyPricing?.hourlyAmount;
            if (hourlyPricing?.discounts && hourlyPricing?.discounts.length !== 0) {
                const percentage = setingDiscount(hourlyPricing?.discounts, timeDuration);
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
            setTotalPaymentOptions((prev) => ({ ...prev, hourly: hourly, monthly: monthly }));
            return { status, message, total , actualMonthDuration : 0 , monthlyDiscountData : monthly };
        }
    }

    if((months == 0 && durationInDays > 0 ) || (hourlyPricing?.max < timeDuration && months == 0) || (months < monthlyPricing?.min && months > 0) ){
        total += monthlyPricing?.min * monthlyPricing?.monthlyAmount;
            if (monthlyPricing?.discounts && monthlyPricing?.discounts.length !== 0) {
                const percentage = setingDiscount(monthlyPricing?.discounts, monthlyPricing?.min);
                if (percentage && percentage > 0) {
                    const discountAmount = monthlyPricing?.min * monthlyPricing?.monthlyAmount * (percentage / 100)
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
        setTotalPaymentOptions((prev) => ({ ...prev, hourly: hourly, monthly: monthly }));
        return { status, message, total , actualMonthDuration : monthlyPricing?.min , monthlyDiscountData : monthly };
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
        if (hourlyPricing?.max < timeDuration || remainingDays > 0) {
            total += (months + 1) * monthlyPricing?.monthlyAmount;
            if (monthlyPricing?.discounts && monthlyPricing?.discounts.length !== 0) {
                const percentage = setingDiscount(monthlyPricing?.discounts, months + 1);
                if (percentage && percentage > 0) {
                    const discountAmount = ((months + 1) * monthlyPricing?.monthlyAmount) * (percentage / 100)
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
            actualMonthDuration = months + 1 || 0
        } else {
            total += months * monthlyPricing?.monthlyAmount;
            if (monthlyPricing?.discounts && monthlyPricing?.discounts.length !== 0) {
                const percentage = setingDiscount(monthlyPricing?.discounts, months);
                if (percentage && percentage > 0) {
                    const discountAmount = (months * monthlyPricing?.monthlyAmount) * (percentage / 100);
                    total -= discountAmount;

                    monthly = {
                        ...monthly,
                        totalAmount: total,
                        discountAmount: discountAmount,
                        discountPercentage: percentage,
                    };
                }
            }
            actualMonthDuration = months || 0;
            total += timeDuration * hourlyPricing?.hourlyAmount;
            if (hourlyPricing?.discounts && hourlyPricing?.discounts.length !== 0) {
                const percentage = setingDiscount(hourlyPricing?.discounts, timeDuration);
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
        }
    }
    setTotalPaymentOptions((prev) => ({ ...prev, hourly: hourly, monthly: monthly }));
    return { status, message, total , actualMonthDuration , monthlyDiscountData : monthly };
}