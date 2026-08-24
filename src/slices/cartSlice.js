import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")):[],
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
        localStorage.setItem("carts",JSON.stringify(state.products))
        
      } else {
        state.products.push({...action.payload, quantity:1});
        localStorage.setItem("carts",JSON.stringify(state.products))
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addtocart } = cartSlice.actions;

export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   products: localStorage.getItem("carts")
//     ? JSON.parse(localStorage.getItem("carts"))
//     : [],
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addtocart: (state, action) => {
//       const findproduct = state.products.find(
//         (item) => item.id === action.payload.id
//       );

//       if (findproduct) {
//         findproduct.quantity++;

//         localStorage.setItem(
//           "carts",
//           JSON.stringify(state.products)
//         );
//       } else {
//         state.products.push({
//           ...action.payload,
//           quantity: 1,
//         });

//         localStorage.setItem(
//           "carts",
//           JSON.stringify(state.products)
//         );
//       }
//     },
//   },
// });

// export const { addtocart } = cartSlice.actions;

// export default cartSlice.reducer;
