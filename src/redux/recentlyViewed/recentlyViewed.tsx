import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recentlyViewedProducts: [],
};

const recentlyViewedProducts = createSlice({
  name: "recentlyViewedProducts",
  initialState,
  reducers: {
    addRecentlyViewedProductsData: (state, action) => {
      const newProduct = action.payload;

      const existingIndex = state.recentlyViewedProducts.findIndex(
        (pro) => pro?._id === newProduct?._id
      );

      if (existingIndex !== -1) {
        state.recentlyViewedProducts.splice(existingIndex, 1);
      }

      state.recentlyViewedProducts.push(newProduct);

      if (state.recentlyViewedProducts.length > 10) {
        state.recentlyViewedProducts.shift();
      }
    },
    clearAllRecentlyViewedProductsData: (state) => {
      state.recentlyViewedProducts = [];
    }
  },
});

export const { addRecentlyViewedProductsData, clearAllRecentlyViewedProductsData } = recentlyViewedProducts.actions;
export default recentlyViewedProducts.reducer;
