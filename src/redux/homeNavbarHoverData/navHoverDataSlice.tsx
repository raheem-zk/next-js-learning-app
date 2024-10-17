import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hoverData: [],
  dataStoredDate: null,
};

const mainCategoryHoverData = createSlice({
  name: "mainCategoryHoverData",
  initialState,
  reducers: {
    addMainCategoryHoverData: (state, action) => {
      state.dataStoredDate = new Date();
      const { mainCategoryId, data } = action.payload;
      const existing = state.hoverData.some(
        (item) => item.mainCategoryId === mainCategoryId
      );

      if (!existing) {
        state.hoverData.push({ mainCategoryId, data });
      }
    },
  },
});

export const { addMainCategoryHoverData } = mainCategoryHoverData.actions;
export default mainCategoryHoverData.reducer;
