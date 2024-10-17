import moment from "moment";

export const checkPickupAndDropOffTimeValid = (pickupTimeStr, dropOffTimeStr, openingTimeStr, closingTimeStr) => {
    let status = true;
    let message = "";

    const pickupTime = moment(pickupTimeStr, 'h:mm a');
    const dropOffTime = moment(dropOffTimeStr, 'h:mm a');
    const openingTime = moment(openingTimeStr, 'h:mm a');
    const closingTime = moment(closingTimeStr, 'h:mm a');

    const is24HoursOpen = openingTimeStr == closingTimeStr
    if(!is24HoursOpen ){
        if (pickupTime.isBefore(openingTime) || pickupTime.isAfter(closingTime)) {
            status = false;
            message = `Pickup time must be between ${openingTime.format('h:mm A')} and ${closingTime.format('h:mm A')}. `;
        }
    }

    // if (dropOffTime.isBefore(openingTime) || dropOffTime.isAfter(closingTime) || dropOffTime.isBefore(pickupTime)) {
    //     status = false;
    //     message += `Drop-off time must be between ${openingTime.format('h:mm A')} and ${closingTime.format('h:mm A')}, and after pickup time. `;
    // }
    return { status, message };
}