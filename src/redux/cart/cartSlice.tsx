import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: null,
  count: 0,
  selectedStoreId: null,
  newUpdate: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartFirstProduct: (state, action) => {
      state.cartData = action.payload;
      state.count = 1;
      state.selectedStoreId = action.payload?.storeId;
      state.newUpdate = true;
    },
    addProductToCart: (state, action) => {
      const newProduct = action.payload;
      const existingProductIndex = state.cartData.productData.findIndex(
        (product) => product.product._id === newProduct.product._id
      );

      if (existingProductIndex !== -1) {
        // Product already exists in the cart, update quantity and total price
        state.cartData.productData[existingProductIndex] = newProduct;
        state.newUpdate = true;
      } else {
        // Add new product to the cart
        state.cartData.productData.push(newProduct);
        state.count = state.count + 1;
        state.newUpdate = true;
      }
    },
    clearCart: (state) => {
      (state.cartData = null),
        (state.count = 0),
        (state.selectedStoreId = null);
      state.newUpdate = false;
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      state.cartData.productData = state.cartData.productData.filter(
        (item) => item.product._id !== productId
      );

      // Update the item count
      state.count = state.cartData.productData.length;
      // Optional: Clear cartData if it's empty
      if (state.count === 0) {
        state.cartData = null;
        state.count = 0;
        state.selectedStoreId = null;
        state.newUpdate = false;
      }
    },
    markCartAsSeen: (state) => {
      state.newUpdate = false;
    },
  },
});

export const {
  addToCartFirstProduct,
  addProductToCart,
  clearCart,
  removeFromCart,
  markCartAsSeen
} = cartSlice.actions;
export default cartSlice.reducer;
