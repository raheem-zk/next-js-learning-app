import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reduxCategoryData: [],
  categoryAddedDate: null,
};

const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategoryData: (state, action) => {
      state.reduxCategoryData = action.payload;
      state.categoryAddedDate = new Date();
    },
  },
});

export const { addCategoryData } = category.actions;
export default category.reducer;
