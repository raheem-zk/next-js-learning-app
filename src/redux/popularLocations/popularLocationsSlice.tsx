import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storedPopularLocations: [],
  popularLocationsAddedDate:null,
};

const popularLocations = createSlice({
  name: "popularLocations",
  initialState,
  reducers: {
    addPopularLocations: (state, action) => {
      state.storedPopularLocations = action.payload;
      state.popularLocationsAddedDate = new Date();
    },
  },
});

export const { addPopularLocations } = popularLocations.actions;
export default popularLocations.reducer;
