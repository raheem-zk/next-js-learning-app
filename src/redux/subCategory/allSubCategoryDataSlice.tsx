import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allSubCategoryData: [], // [data : {}, date: new Date()]
};

const allSubCategory = createSlice({
    name: "subCategory",
    initialState,
    reducers: {
        addOrUpdateSubCategoryData: (state, action) => {
            const newData = action.payload;

            // Find the index of the existing subcategory data based on the unique id
            const existingIndex = state.allSubCategoryData.findIndex(
                item => item.data._id === newData.data._id
            );
            if (existingIndex !== -1) {
                // If the data already exists, replace it with the new data
                state.allSubCategoryData[existingIndex] = newData;
            } else {
                // If it doesn't exist, add the new data
                state.allSubCategoryData.push(newData);
            }
        },
    },
});

export const { addOrUpdateSubCategoryData } = allSubCategory.actions;
export default allSubCategory.reducer;
