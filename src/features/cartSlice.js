import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.items.find(
        (cartItem) => cartItem.idMeal === item.idMeal,
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice =
          existingItem.quantity * Number(existingItem.price);
      } else {
        state.items.push({
          ...item,
          quantity: 1,
          totalPrice: Number(item.price),
        });
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((cartitem) => cartitem.idMeal !== id);
    },

    decreaseCartItem: (state, action) => {
      let item = action.payload;
      const existingItem = state.items.find(
        (cartItem) => cartItem.idMeal === item.idMeal,
      );
      if (existingItem) {
        existingItem.quantity -= 1;
        existingItem.totalPrice =
          existingItem.quantity * Number(existingItem.price || 0);
      } else {
        state.items.push({
          ...item,
          quantity: -1,
          totalPrice: Number(item.price),
        });
      }

      if (existingItem.quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) => cartItem.idMeal !== item.idMeal,
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, decreaseCartItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
