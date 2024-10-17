import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeId: null,
  productData: [{}],
  pickupDate: null,
  dropOffDate: null,
  pickupTime: null,
  dropOffTime: null,
  totalPaymentOptions:null,
  userId:null,
  withoutDiscoutTotalPrice:null
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutData: (state, action) => {
      const {
        productData,
        pickupTime,
        dropOffTime,
        pickupDate,
        dropOffDate,
        storeId,
        totalPaymentOptions,
        userId,
        withoutDiscoutTotalPrice
      } = action.payload;
      state.productData = productData;
      state.pickupTime = pickupTime;
      state.dropOffTime = dropOffTime;
      state.pickupDate = pickupDate;
      state.dropOffDate = dropOffDate;
      state.storeId = storeId;
      state.totalPaymentOptions = totalPaymentOptions;
      state.userId = userId;
      state.withoutDiscoutTotalPrice = withoutDiscoutTotalPrice;
    },
    clearCheckout: (state) => {
      state.productData= null,
      state.pickupTime= null,
      state.dropOffTime= null,
      state.pickupDate= null,
      state.dropOffDate= null,
      state.storeId= null,
      state.totalPaymentOptions= null,
      state.userId= null,
      state.withoutDiscoutTotalPrice= null
    },
  },
});

export const { setCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
