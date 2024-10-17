// src/redux/thunks/addUserVerificationActionDataWithTimeout.js

import { removeUserVerificationActionData, setUserVerificationActionData } from '../../store/userVerificationActionsSlice';

export const addUserVerificationActionDataWithTimeout = (data) => (dispatch) => {
  dispatch(setUserVerificationActionData(data));
  
  setTimeout(() => {
    dispatch(removeUserVerificationActionData({
      userId: data.userId,
      verificationType: data.verificationType
    }));
  }, 5 * 60 * 1000); // 5 minutes in milliseconds
};
