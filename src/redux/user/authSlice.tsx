import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  userId: null,
  success: false,
  actionRole: "user", // store  manageStore
  permssionType : null, // Admin Manager
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.data = action.payload;
      state.userId = action.payload._id;
      state.success = true;
      state.actionRole = "user";
      state.permssionType = null;
    },
    updatedUserData: (state, action) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = {};
      state.success = false;
      state.actionRole = null;
      state.userId = null;
      state.permssionType = null;
    },
    updateActionRole : (state, action) => {
      state.actionRole = action.payload;
    },
    updatePermissionTypeAndRole : (state,action)=>{
      state.permssionType = action.payload.permssionType;
      state.actionRole = action.payload.actionRole;
    }
  },
});

export const { userLoggedIn, logout, updatedUserData, updateActionRole , updatePermissionTypeAndRole} = authSlice.actions;
export default authSlice.reducer;
