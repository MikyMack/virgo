import api from "../../../utils/axios";

export const createProduct = async (formData) => {
  try {
    const config = {
      headers: { 
        _isAdmin: true,
        // Explicitly let browser set Content-Type with boundary
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
      // Handle large file uploads
      maxBodyLength: Infinity, // For axios
      maxContentLength: Infinity, // For axios
    };

    const response = await api.post('/products/create', formData, config);
    return response.data;

  } catch (error) {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
      error: error.message,
    });

    let errorMessage = 'Failed to create product';
    
    // Handle different error cases
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 400:
          errorMessage = handleValidationErrors(error.response.data);
          break;
        case 401:
          errorMessage = 'Unauthorized: Please log in as admin.';
          break;
        case 413:
          errorMessage = 'File size too large. Maximum 5MB per image.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          console.error('Server error details:', error.response.data);
          break;
        default:
          errorMessage = error.response.data?.message || errorMessage;
      }
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timed out. Please try again.';
    } else if (error.message === 'Network Error') {
      errorMessage = 'Network error. Check your connection.';
    }

    throw new Error(errorMessage);
  }
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