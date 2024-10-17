import axios from "axios";

export const getUserCountryData = async (setFieldValue) => {
  try {
    const response = await axios.get(import.meta.env.VITE_USER_ID_DATA_API);
    if (response) {
      const result = await axios.get(
        `${import.meta.env.VITE_USER_COUNTRY_DATA_API}/${response.data}`
      );
      if (result) {
        setFieldValue("country", result.data?.country);
        setFieldValue("pincode", result.data?.zip);
        setFieldValue("state", result.data?.regionName);
        return result.data;
      }
    }
    return {};
  } catch (error) {
    console.error("Failed to fetch IP:", error);
  }
};

export const getLocationAddress = async (
  lat,
  lng,
  setClickedLocationAddress
) => {
  try {
    const geocoder = new window.google.maps.Geocoder();
    const location = { lat: lat, lng: lng };

    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results[0]) {
        const address = results[0].formatted_address;
        setClickedLocationAddress(address);
        console.log("Clicked Location Address:", address);
        // Extract the city name
        const addressComponents = results[0].address_components;
        const cityComponent = addressComponents.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("administrative_area_level_2")
        );
        const cityName = cityComponent
          ? cityComponent.long_name
          : "City not found";
        // alert(cityName);
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          status
        );
      }
    });
  } catch (error) {}
};

// locationUtils.js
export const getLocationFromAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`
    );

    if (response.data.results && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error("Location not found for the provided address");
    }
  } catch (error) {
    console.error("Error fetching location from address:", error);
    throw new Error("Failed to fetch location from address");
  }
};

export const getUseCurrentLocation = (callback) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log("current location ", data?.results[0]);
          const locationData = {
            name: data?.results[0]?.address_components?.[1]?.long_name || "",
            lat: latitude,
            lng: longitude,
            currentSelectedLocation: data?.results[0]?.formatted_address || "",
            address: `${data?.results[0]?.address_components?.[1]?.long_name || ""}-${data?.results[0]?.address_components?.[3]?.long_name || ""}-${data?.results[0]?.address_components?.[5]?.long_name || ""}`,
          };
          localStorage.setItem(
            "currentSelectedLocation",
            JSON.stringify(locationData)
          );
          callback(locationData);
        })
        .catch((error) => {
          console.error("Error fetching location data:", error);
          callback(null, error);
        });
    },
    (error) => {
      console.error("Geolocation error:", error);
      callback(null, error);
    },
    { timeout: 10000, maximumAge: 60000 }
  );
};
