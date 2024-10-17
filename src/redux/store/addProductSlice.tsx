import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const addProductSubCategory = createSlice({
  name: "productSubCategory",
  initialState,
  reducers: {
    addProductSubCategoryValue: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addProductSubCategoryValue } =
  addProductSubCategory.actions;
export default addProductSubCategory.reducer;
