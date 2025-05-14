import api from "../utils/axios";

// GET all primary categories
export const getCategories = async () => {
  const response = await api.get('/primary-categories/');
  return response.data;
};

// CREATE new primary category
export const createCategory = async (data) => {
  const response = await api.post('/primary-categories/', data);
  return response.data;
};

// UPDATE a primary category
export const updateCategory = async (id, data) => {
  const response = await api.put(`/primary-categories/${id}`, data); 
  return response.data;
};

// DELETE a primary category
export const deleteCategory = async (id) => {
  const response = await api.delete(`/primary-categories/${id}`); 
  return response.data;
};