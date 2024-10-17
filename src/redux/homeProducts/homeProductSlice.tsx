import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeProducts: [],
  dataStoredDate :null
};

const homeProducts = createSlice({
  name: "homeProducts",
  initialState,
  reducers: {
    addHomeCategoryProducts: (state, action) => {
      const { categoryId, data, productaddedDate } = action.payload;
      state.dataStoredDate = new Date()
      const existingIndex = state.homeProducts.findIndex(
        (item) => item.categoryId === categoryId
      );
      if (existingIndex !== -1) {
        state.homeProducts[existingIndex].data = data;
        state.homeProducts[existingIndex].productaddedDate = productaddedDate;
      } else {
        state.homeProducts.push({ categoryId, data, productaddedDate });
      }
    },
  },
});

export const { addHomeCategoryProducts } = homeProducts.actions;
export default homeProducts.reducer;
