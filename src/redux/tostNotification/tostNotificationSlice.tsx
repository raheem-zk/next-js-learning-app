import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastNotificationData: null,
};

const toastNotificationSlice = createSlice({
  name: "toastNotification",
  initialState,
  reducers: {
    addToastNotificationData: (state, action) => {
      state.toastNotificationData = action.payload;
    },
    removeToastNotificationData: (state) => {
      state.toastNotificationData = null;
    },
  },
});

export const { addToastNotificationData, removeToastNotificationData } = toastNotificationSlice.actions;
export default toastNotificationSlice.reducer;
