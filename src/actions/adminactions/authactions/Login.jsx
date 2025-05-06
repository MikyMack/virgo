import api from '../../../utils/axios';

// Admin login function
export const adminLogin = async ({ email }) => {
  try {
    const response = await api.post('/auth/admin/login', { email });
    return { message: response.data.message };
  } catch (error) {
    const message =
      error.response?.data?.message || 'Server error';
    throw new Error(message);
  }
};

// Admin verify OTP function
export const adminVerifyOtp = async ({ email, otp }) => {
  try {
    const response = await api.post('/auth/admin/verify-otp', { email, otp });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Server error';
    throw new Error(message);
  }
};

// Admin logout function
export const adminLogout = () => {
  localStorage.removeItem('AdminToken');
  return { message: 'Logged out successfully' };
};


