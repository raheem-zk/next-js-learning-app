import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularProducts: [],
  popularProductAddDate :null
};

const homePopularProduct = createSlice({
  name: "homePopularProduct",
  initialState,
  reducers: {
    addHomePopularProducts: (state, action) => {
      state.popularProductAddDate = new Date()
      state.popularProducts = action.payload;
    },
  },
});

export const { addHomePopularProducts } = homePopularProduct.actions;
export default homePopularProduct.reducer;
