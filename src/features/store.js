import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import productSlice from "./products/productSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
  },
});
