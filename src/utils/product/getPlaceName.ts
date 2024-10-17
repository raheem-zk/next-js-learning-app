export const getPlaceName = (address)=> {
    if(!address) return;
    const addressParts = address.split(",").map(part => part.trim());
    const specificItem = addressParts[addressParts.length - 3];
    return specificItem
}