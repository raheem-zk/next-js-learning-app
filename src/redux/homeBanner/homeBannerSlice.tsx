import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeBannerData: [],
  bannerAddedDate: null,
};

const homeBanner = createSlice({
  name: "homeBanner",
  initialState,
  reducers: {
    addHomeBanner: (state, action) => {
      state.homeBannerData = action.payload;
      state.bannerAddedDate = new Date().toISOString();
    },
  },
});

export const { addHomeBanner } = homeBanner.actions;
export default homeBanner.reducer;
