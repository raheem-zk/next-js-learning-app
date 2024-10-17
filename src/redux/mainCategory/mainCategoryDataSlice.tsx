import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reduxMainCategoryData: [],
  dataStoredDate :null
};

const mainCategory = createSlice({
  name: "mainCategory",
  initialState,
  reducers: {
    addMainCategoryData: (state, action) => {
      state.dataStoredDate = new Date()
      state.reduxMainCategoryData = action.payload;
    },
  },
});

export const { addMainCategoryData } = mainCategory.actions;
export default mainCategory.reducer;
