import api from '../../../utils/axios';


export const sendOtp = async ({ email }) => {
    const response = await api.post('/auth/login-or-register', { email });
    return response.data;
  };
  

  export const verifyotp = async ({ email, otp }) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    const { token, user, message } = response.data;
  

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  
    return { message };
  };

  export const loginWithGoogle = async (googleToken) => {
    const { data } = await api.post('/auth/google-login', { token: googleToken });
  
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
   
    
    return data;
  };

  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
      localStorage.removeItem('hasSyncedCart');
  };