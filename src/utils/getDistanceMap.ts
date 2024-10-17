
export const getDistance = async (origin, destination) => {
  return new Promise((resolve, reject) => {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        const distance = response.rows[0].elements[0].distance?.text;
        resolve(distance);
      } else {
        reject(new Error('Failed to get distance'));
      }
    });
  });
}

export const calculateDistancePrice = (deliveryCharges, distanceString) => {
  if (!deliveryCharges || deliveryCharges.length === 0 || !distanceString) {
    return -1;
  }

  const distance = parseInt(distanceString.split(" ")[0]);
  const roundedDistance = Math.round(distance); // Round to nearest integer
  let deliveryPrice = -1;
  let maxKilometer = 0;
  deliveryCharges.forEach(delivery => {
    if (roundedDistance >= delivery.start && roundedDistance <= delivery.end) {
      deliveryPrice = delivery.price;
    }
    if (delivery.end > maxKilometer) {
      maxKilometer = delivery.end;
    }
  });

  if (maxKilometer < roundedDistance) {
    return -1;
  }

  return deliveryPrice;
};


export const getLargestDeliveryCharge = (deliveryCharge) => {
  // Check if deliveryCharge is provided, is an array, and is not empty
  if (!deliveryCharge || !Array.isArray(deliveryCharge) || deliveryCharge.length === 0) {
     return null;
  }
 
  let largestEnd = deliveryCharge[0].end;
  deliveryCharge.forEach(delivery => {
     // Check if each delivery object has an 'end' property
     if (delivery.end && delivery.end > largestEnd) {
       largestEnd = delivery.end;
     }
  });
 
  return largestEnd;
 };
 