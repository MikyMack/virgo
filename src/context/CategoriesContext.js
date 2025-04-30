// src/context/CategoriesContext.js
import { createContext, useState, useCallback } from 'react';
import { CategoriesList } from '../actions/adminactions/categories/categoriesactions';

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await CategoriesList();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, fetchCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};