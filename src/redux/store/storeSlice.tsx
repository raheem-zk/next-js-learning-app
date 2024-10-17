import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  success: false,
};

const storeSlice = createSlice({
  name: "storeData",
  initialState,
  reducers: {
    setStoreData: (state, action) => {
      state.data = action.payload;
      state.success = true;
    },
  },
});

export const { setStoreData } = storeSlice.actions;
export default storeSlice.reducer;
