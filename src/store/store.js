import { configureStore } from "@reduxjs/toolkit";
import veggiesReducer from "../features/veggieSlice";
import cartReducer from "../features/cartSlice";
import categoryReducer from "../features/categorySlice";
import searchReducer from "../features/searchSlice";
import prodductDetails from "../features/proDetailSlice";
import userReducer from "../features/authSlice";
export const store = configureStore({
  reducer: {
    veggies: veggiesReducer,
    cart: cartReducer,
    category: categoryReducer,
    search: searchReducer,
    detailPro: prodductDetails,
    users: userReducer,
  },
});
