import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';


export const store = configureStore({
  reducer: {
    categories: categoriesReducer, // Add the slice to the store
    // Add other reducers here (e.g., products, cart)
  },
  
});