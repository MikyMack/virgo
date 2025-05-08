import api from "../../../utils/axios";


const adminConfig = {
  headers: { _isAdmin: true }
};

// ===================== PRIMARY =====================
export const getPrimaryCategories = async () => {
  try {
    const response = await api.get('/primary-categories/');
    return response.data;
  } catch (error) {
    console.error('Error while fetching primary categories', error);
    throw error;
  }
};

export const createPrimaryCategory = async (data) => {
  try {
    const response = await api.post('/primary-categories/', data, adminConfig);
    return response.data;
  } catch (error) {
    console.error('Error while creating primary category:', error);
    throw error;
  }
};

export const updatePrimaryCategory = async (id, data) => {
  try {
    const response = await api.put(`/primary-categories/${id}/`, data, adminConfig);
    return response.data;
  } catch (error) {
    console.error('Error while updating primary category:', error);
    throw error;
  }
};

export const deletePrimaryCategory = async (id) => {
  try {
    const response = await api.delete(`/primary-categories/${id}/`, adminConfig);
    return response.data;
  } catch (error) {
    console.error('Error while deleting primary category:', error);
    throw error;
  }
};

// ===================== SECONDARY =====================
export const getSecondaryCategories = async () => {
  try {
    const response = await api.get('/secondary-categories/');
    return response.data;
  } catch (error) {
    console.error('Error while fetching secondary categories', error);
    throw error;
  }
};

export const createSecondaryCategory = async (data) => {
  try {
    const response = await api.post('/secondary-categories/', data, adminConfig);
    return response.data;
  } catch (error) {
    console.error('Error while creating secondary category:', error);
    throw error;
  }
};

export const updateSecondaryCategory = async (id, data) => {
  try {
    const response = await api.put(`/secondary-categories/${id}/`, data, adminConfig);
    return response.data;
  } catch (error) {
    console.error('Error while updating secondary category:', error);
    throw error;
  }
};

export const deleteSecondaryCategory = async (id) => {
  try {
    const response = await api.delete(`/secondary-categories/${id}/`, adminConfig);
    return response.data;
  } catch (error) {
    console.error('Error while deleting secondary category:', error);
    throw error;
  }
};

// ===================== TERTIARY =====================
export const getTertiaryCategories = async () => {
  try {
    const response = await api.get('/tertiary-categories/');
    return response.data;
  } catch (error) {
    console.error('Error while fetching tertiary categories', error);
    throw error;
  }
};

export const createTertiaryCategory = async (data) => {
  try {
    const response = await api.post('/tertiary-categories/', data, adminConfig);
    return response.data;
  } catch (error) {
    console.error('Error while creating tertiary category:', error);
    throw error;
  }
};

export const updateTertiaryCategory = async (id, data) => {
  try {
    const response = await api.put(`/tertiary-categories/${id}/`, data, adminConfig);
    return response.data;
  } catch (error) {
    console.error('Error while updating tertiary category:', error);
    throw error;
  }
};

export const deleteTertiaryCategory = async (id) => {
  try {
    const response = await api.delete(`/tertiary-categories/${id}/`, adminConfig);
    return response.data;
  } catch (error) {
    console.error('Error while deleting tertiary category:', error);
    throw error;
  }
};
