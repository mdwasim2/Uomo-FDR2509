import { configureStore } from '@reduxjs/toolkit'
import  addtocart  from '../slices/cartSlice'

export const store = configureStore({
  reducer: {
    cart:addtocart
  },
})