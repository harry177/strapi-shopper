import { createSlice } from "@reduxjs/toolkit";
import { IReturnedCartItem } from "../types";

interface ICartState {
    cart: IReturnedCartItem[];
}

const initialState: ICartState = {
    cart: [],
  };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart(state, action) {
      state.cart = action.payload;
    },
  },
});

export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;
