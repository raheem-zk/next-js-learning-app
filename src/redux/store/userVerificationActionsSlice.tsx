import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   userVerificationActionsData: [
//     {
//       userId : null,
//       verificationType : "aadhar" || "drivingLicense",
//       verificationDate :  Date.now(),
//     },
//   ],
// };

const initialState = {
  userVerificationActionsData: [],
};
const userVerificationActionsDataSlice = createSlice({
  name: "storeData",
  initialState,
  reducers: {
    setUserVerificationActionData(state, action) {
      state.userVerificationActionsData.push(action.payload);
    },
    removeUserVerificationActionData(state, action) {
      state.userVerificationActionsData = state.userVerificationActionsData.filter(
        (item) =>
          item.userId !== action.payload.userId ||
          item.verificationType !== action.payload.verificationType
      );
    },
  },
});

export const { setUserVerificationActionData, removeUserVerificationActionData } =
  userVerificationActionsDataSlice.actions;
export default userVerificationActionsDataSlice.reducer;
