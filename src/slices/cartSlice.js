import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, action) => {
      let findproduct = state.products.find(
        (item) => item.id === action.payload.id,
      );
      if (findproduct) {
        findproduct.quantity++;
        localStorage.setItem("carts", JSON.stringify(state.products));
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
        localStorage.setItem("carts", JSON.stringify(state.products));
      }
    },

    incrementQuantity: (state, action) => {
      let findproduct = state.products.find(
        (item) => item.id === action.payload.id,
      );
      if (findproduct) {
        findproduct.quantity++;
        localStorage.setItem("carts", JSON.stringify(state.products));
      }
    },

    decrementQuantity: (state, action) => {
      let findproduct = state.products.find(
        (item) => item.id === action.payload.id,
      );
      if (findproduct) {
        if (findproduct.quantity < 2) {
          state.products = state.products.filter(
            (item) => item.id !== action.payload.id,
          );
           localStorage.setItem("carts", JSON.stringify(state.products));
    
        } else {
          findproduct.quantity--;
          localStorage.setItem("carts", JSON.stringify(state.products));
        }
      }
    },
    removeproduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id,
      );

      localStorage.setItem("carts", JSON.stringify(state.products));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addtocart,
  incrementQuantity,
  decrementQuantity,
  removeproduct,
} = cartSlice.actions;

export default cartSlice.reducer;
