import api from '../../../utils/axios';

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

export const adminVerifyOtp = async ({ email, otp }) => {
  try {
    const response = await api.post('/auth/admin/verify-otp', { email, otp });
    const { message, token, user } = response.data;

    localStorage.setItem('AdminToken', token);
    localStorage.setItem('AdminUser', JSON.stringify(user));

    return { message, token, user };
  } catch (error) {
    const message =
      error.response?.data?.message || 'Verification failed';
    throw new Error(message);
  }
};

// Admin logout function
export const adminLogout = () => {
  localStorage.removeItem('AdminToken');
  return { message: 'Logged out successfully' };
};


