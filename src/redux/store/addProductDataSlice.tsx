import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: {
    mainCategoryId: null,
    categoryId: null,
  },
};

const addProductDataSlice = createSlice({
  name: "addProductData",
  initialState,
  reducers: {
    setProductMainCategory: (state, action) => {
      state.productData = { mainCategoryId: action.payload };
    },
    setAddProductSecondPageData: (state, action) => {
      state.productData = { ...state.productData, ...action.payload };
    },
    cleareAddProductData: (state) => {
      state.productData = {};
    },
  },
});

export const {
  setProductMainCategory,
  cleareAddProductData,
  setAddProductSecondPageData,
} = addProductDataSlice.actions;
export default addProductDataSlice.reducer;
