import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/CategoriesSlice';


export const store = configureStore({
  reducer: {
    categories: categoriesReducer, 
  },
  
});