import { setingDiscount } from "../discountSetting";

export const pricingMonthOnly = (monthlyPricing, durationInDays,durationInMonths, setTotalPaymentOptions) => {
    let status = true;
    let message = "";
    let total = 0;
    let actualMonthDuration = 0;
    const months = Math.floor(durationInMonths);
    // const months = Math.floor(durationInDays / 28);
    const remainingDays = durationInDays;
    let monthly = {
        totalAmount: total,
        perMonthAmount: monthlyPricing.monthlyAmount,
    };

    if (months < monthlyPricing?.min) {
        // status = false;
        // message = `Minimum ${monthlyPricing?.min} month(s) are required`;
        total = monthlyPricing?.min * monthlyPricing.monthlyAmount;
        if (monthlyPricing.discounts && monthlyPricing.discounts.length !== 0) {
            const percentage = setingDiscount(monthlyPricing.discounts, months);
            if (percentage && percentage > 0) {
                const discountAmount = (monthlyPricing?.min * monthlyPricing.monthlyAmount) * (percentage / 100);
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
        setTotalPaymentOptions((prev) => ({ ...prev, monthly: monthly }));
        return { status, message, total , actualMonthDuration , monthlyDiscountData : monthly };
    }
    if (monthlyPricing?.max < months) {
        status = false;
        message = `Maximum ${monthlyPricing?.max} month(s) are allowed`;
    }
    if (monthlyPricing?.max == months && remainingDays > 0) {
        status = false;
        message = `Maximum ${monthlyPricing?.max} month(s) have been reached. Additional days are not allowed`;
    }

    if (status) {
        if (remainingDays > 0) {
            total = (months + 1) * monthlyPricing.monthlyAmount;
            if (monthlyPricing.discounts && monthlyPricing.discounts.length !== 0) {
                const percentage = setingDiscount(monthlyPricing.discounts, (months + 1));
                if (percentage && percentage > 0) {
                    const discountAmount = ((months + 1) * monthlyPricing.monthlyAmount) * (percentage / 100);
                    total -= discountAmount;

                    monthly = {
                        ...monthly,
                        totalAmount: total,
                        discountAmount: discountAmount,
                        discountPercentage: percentage,
                    };
                }
            }
            actualMonthDuration = months + 1
        } else {
            total = months * monthlyPricing.monthlyAmount;
            if (monthlyPricing.discounts && monthlyPricing.discounts.length !== 0) {
                const percentage = setingDiscount(monthlyPricing.discounts, months);
                if (percentage && percentage > 0) {
                    const discountAmount = (months * monthlyPricing.monthlyAmount) * (percentage / 100);
                    total -= discountAmount;

                    monthly = {
                        ...monthly,
                        totalAmount: total,
                        discountAmount: discountAmount,
                        discountPercentage: percentage,
                    };
                }
            }
            actualMonthDuration = months || 0
        }
    }
    setTotalPaymentOptions((prev) => ({ ...prev, monthly: monthly }));
    return { status, message, total , actualMonthDuration , monthlyDiscountData : monthly };
}