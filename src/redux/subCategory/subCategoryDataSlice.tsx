import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reduxSubCategoryData: [], // {subCategoryAddedDate, data, categoryId}
};

const subCategory = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    addSubCategoryData: (state, action) => {
        const { categoryId, data, subCategoryAddedDate } = action.payload;
  
        const existingIndex = state.reduxSubCategoryData.findIndex(
          (item) => item.categoryId === categoryId
        );
  
        if (existingIndex !== -1) {
          state.reduxSubCategoryData[existingIndex] = {
            categoryId,
            data,
            subCategoryAddedDate,
          };
        } else {
          state.reduxSubCategoryData.push({
            categoryId,
            data,
            subCategoryAddedDate,
          });
        }
      },
  },
});

export const { addSubCategoryData } = subCategory.actions;
export default subCategory.reducer;
