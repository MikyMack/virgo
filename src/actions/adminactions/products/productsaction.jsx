import api from "../../../utils/axios";

export const createProduct = async (formData) => {
  try {
    const config = {
      headers: { 
        _isAdmin: true,
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
      maxBodyLength: Infinity, 
      maxContentLength: Infinity, 
    };

    const response = await api.post('/products/create', formData, config);
    return response.data;

  } catch (error) {
    handleAdminError(error, 'Failed to create products');
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const config = {
      headers: {
        _isAdmin: true,
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    };

    const response = await api.put(`/products/update/${id}`, formData, config);
    return response.data;
  } catch (error) {
    handleAdminError(error, 'Failed to update product');
  }
};

export const deleteProduct = async (id) => {
  try {
    const config = { 
      headers: { 
        _isAdmin: true,
        'Content-Type': 'application/json'
      } 
    };
 const response = await api.delete(`/products/delete/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('API Delete Error:', error.response?.data || error.message);
    throw error;
  }
};


export const toggleProductStatus = async (id) => {
  try {
    const config = { headers: { _isAdmin: true } };
    const response = await api.patch(`/products/toggle/${id}`, {}, config);
    return response.data;
  } catch (error) {
    handleAdminError(error, 'Failed to toggle product status');
  }
};

export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    handleAdminError(error, 'Failed to fetch products');
  }
};


export const getAllProductsFilterd = async (params = {}) => {
  try {
    const response = await api.get('/products/AllProducts', {
      params: {
        type: params.type || 'all'
      }
    });
    console.log('API response:', response.data); // <-- This logs the array!
return Array.isArray(response.data.products) ? response.data.products : [];
  } catch (error) {
    handleAdminError(error, 'Failed to fetch products');
    throw error;
  }
};

export const getshopProducts = async (params = {}) => {
  try {
    const response = await api.get('/products/shopProducts', {
      params: {
        type: params.type || 'all',
        primaryCategory: params.primaryCategory,
        secondaryCategory: params.secondaryCategory,
        tertiaryCategory: params.tertiaryCategory, // <--- ADD THIS LINE
        brand: params.brand,
        keyword: params.keyword,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        sortBy: params.sortBy || 'latest',
        page: params.page || 1,
        limit: params.limit || 12
      }
    });
    
    console.log('API response:', response.data);
    
    // Ensure products is an array while preserving other data
    return {
      ...response,
      data: {
        ...response.data,
        products: Array.isArray(response.data.products) ? response.data.products : []
      }
    };
    
  } catch (error) {
    console.error('Error fetching shop products:', error);
    throw error;
  }
};
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    handleAdminError(error, 'Failed to fetch product details');
  }
};


const handleAdminError = (error, defaultMsg = 'Something went wrong') => {
  console.error('API Error:', {
    status: error.response?.status,
    data: error.response?.data,
    config: error.config,
    error: error.message,
  });

  let message = defaultMsg;

  if (error.response) {
    switch (error.response.status) {
      case 400:
        message = handleValidationErrors(error.response.data);
        break;
      case 401:
        message = 'Unauthorized: Admin access required.';
        break;
      case 413:
        message = 'File too large. Max 10MB allowed.';
        break;
      case 500:
        message = 'Server error. Try again later.';
        break;
      default:
        message = error.response.data?.message || defaultMsg;
    }
  } else if (error.code === 'ECONNABORTED') {
    message = 'Request timed out.';
  } else if (error.message === 'Network Error') {
    message = 'Network error. Check connection.';
  }

  throw new Error(message);
};


// Helper function for 400 validation errors
const handleValidationErrors = (errorData) => {
  if (errorData?.errors) {
    const fieldErrors = Object.entries(errorData.errors)
      .map(([field, message]) => `${field}: ${message}`)
      .join('\n');
    return `Validation errors:\n${fieldErrors}`;
  }
  return errorData?.message || 'Invalid data submitted.';
};