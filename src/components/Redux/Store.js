import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/CategoriesSlice';
import productReducer from './slices/ProductSlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer, 
    products:productReducer,
  },
  
});