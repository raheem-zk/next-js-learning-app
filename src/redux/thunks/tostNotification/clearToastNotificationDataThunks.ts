import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeToastNotificationData } from "../../tostNotification/tostNotificationSlice";

export const clearToastNotificationData = createAsyncThunk(
    "toastNotification/clearToastNotificationData",
    async (_, { dispatch }) => {
      // Perform any async operations if needed
      dispatch(removeToastNotificationData());
    }
  );