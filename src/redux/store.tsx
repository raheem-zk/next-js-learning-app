import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { thunk } from 'redux-thunk'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./user/authSlice";
import storeReducer from "./store/storeSlice";
import cartReducer from "./cart/cartSlice";
import addProductReducer from "./store/addProductSlice";
import checkoutReducer from "./checkout/checkoutSlice";
import addProductDataReducer from "./store/addProductDataSlice";
import mainCategoryReducer from "./mainCategory/mainCategoryDataSlice";
import mainCategoryHoverDataReducer from "./homeNavbarHoverData/navHoverDataSlice";
import homeBannerReducer from "./homeBanner/homeBannerSlice";
import homeProductReducer from "./homeProducts/homeProductSlice";
import categoryReducer from "./category/categoryDataSlice";
import subCategoryReducer from "./subCategory/subCategoryDataSlice";
import popularLocationsReducer from "./popularLocations/popularLocationsSlice";
import homePopularProductReducer from "./homeProducts/popularProductSlice";
import recentlyViewedProductsReducer from "./recentlyViewed/recentlyViewed";
import selectedLocationReducer from "./user/selectedLocationSlice"
import userVerificationActionsDataReducer from "./store/userVerificationActionsSlice";
import toastNotificationReducer from "./tostNotification/tostNotificationSlice";
import allSubCategoryReducer from "./subCategory/allSubCategoryDataSlice";



const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  userAuth: authReducer,
  store: storeReducer,
  cart: cartReducer,
  addProductSubCategory: addProductReducer,
  checkout: checkoutReducer,
  addProductData: addProductDataReducer,
  mainCategory: mainCategoryReducer,
  mainCategoryHoverData: mainCategoryHoverDataReducer,
  homeBanner: homeBannerReducer,
  homeProducts: homeProductReducer,
  category: categoryReducer,
  subCategory: subCategoryReducer,
  popularLocations: popularLocationsReducer,
  homePopularProduct: homePopularProductReducer,
  recentlyViewedProducts: recentlyViewedProductsReducer,
  selectedLocation :  selectedLocationReducer,
  userVerificationActionsData : userVerificationActionsDataReducer,
  toastNotificationData : toastNotificationReducer,
  allSubCategory: allSubCategoryReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };