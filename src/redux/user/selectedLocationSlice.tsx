import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locationAddress: null,
  };
const selectedLocationSlice  = createSlice({
  name: "selectedLocation",
  initialState,
  reducers: {
    updateSelectedLocation: (state, action) => {
      state.locationAddress = action.payload;
    },
  },
});

export const { updateSelectedLocation } = selectedLocationSlice.actions;
export default selectedLocationSlice.reducer;
