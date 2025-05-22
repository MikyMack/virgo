import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../../actions/adminactions/authactions/Login';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Mock adminAuthenticate action (replace with actual backend action)
const adminAuthenticate = async ({ email, password }) => {
  // Simulate backend authentication
  const response = await fetch('/api/admin/authenticate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error('Authentication failed');
  const data = await response.json();
  return data; // Assume it returns { token }
};

export default function AdminSignin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    newPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [loginSuccessMsg, setLoginSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmNewPassword: false
  });
  const [showLoginPassword, setShowLoginPassword] = useState({
    newPassword: false
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);

  // Check for existing user on mount
  useEffect(() => {
    const token = localStorage.getItem('AdminToken');
    setIsExistingUser(!!token); // Set to true if token exists
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleLoginChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    });
    setLoginErrorMsg('');
    setLoginSuccessMsg('');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      // Validate inputs
      if (!formData.email || !formData.email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        setLoading(false);
        return;
      }
      if (!formData.newPassword) {
        setErrorMsg('Please enter a new password.');
        setLoading(false);
        return;
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        setErrorMsg('Passwords do not match.');
        setLoading(false);
        return;
      }
      if (formData.newPassword.length < 8) {
        setErrorMsg('Password must be at least 8 characters long.');
        setLoading(false);
        return;
      }

      // Send password reset token to email (using adminLogin for sign-up)
      await adminLogin({ 
        email: formData.email,
        newPassword: formData.newPassword 
      });

      setSuccessMsg('Password reset link sent to your email.');
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    } catch (error) {
      setErrorMsg(error.message || "Failed to send password reset link");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginErrorMsg('');
    setLoginSuccessMsg('');
    try {
      // Validate inputs
      if (!loginFormData.email || !loginFormData.email.includes('@')) {
        setLoginErrorMsg('Please enter a valid email address.');
        setLoading(false);
        return;
      }
      if (!loginFormData.newPassword) {
        setLoginErrorMsg('Please enter a password.');
        setLoading(false);
        return;
      }

      // Authenticate user
      const response = await adminAuthenticate({
        email: loginFormData.email,
        password: loginFormData.newPassword
      });

      // Store token
      if (response.token) {
        localStorage.setItem('AdminToken', response.token);
      }

      setLoginSuccessMsg('Logged in successfully!');
      setTimeout(() => {
        setShowLoginModal(false);
        setLoginFormData({ email: '', newPassword: '' });
        navigate("/admin/dashboard");
      }, 2000);
    } catch (error) {
      setLoginErrorMsg(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field, isLogin = false) => {
    if (isLogin) {
      setShowLoginPassword((prev) => ({
        ...prev,
        [field]: !prev[field]
      }));
    } else {
      setShowPassword((prev) => ({
        ...prev,
        [field]: !prev[field]
      }));
    }
  };

  const renderForm = (isLoginPage = false) => (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 transform transition-all hover:shadow-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-tight">
        {isLoginPage ? 'Admin Login' : 'Admin Sign Up'}
      </h2>
      <form onSubmit={isLoginPage ? handleLogin : handleResetPassword} className="space-y-6">
        <div>
          <label 
            className="block text-sm font-medium text-gray-700 mb-2" 
            htmlFor={isLoginPage ? "loginEmail" : "email"}
          >
            Email 
          </label>
          <input
            type="email"
            id={isLoginPage ? "loginEmail" : "email"}
            name="email"
            value={isLoginPage ? loginFormData.email : formData.email}
            onChange={isLoginPage ? handleLoginChange : handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
            placeholder="Enter your admin email"
            required
            autoComplete="username"
          />
        </div>
        <div className="relative">
          <label 
            className="block text-sm font-medium text-gray-700 mb-2" 
            htmlFor={isLoginPage ? "loginNewPassword" : "newPassword"}
          >
            Password
          </label>
          <input
            type={isLoginPage ? (showLoginPassword.newPassword ? 'text' : 'password') : (showPassword.newPassword ? 'text' : 'password')}
            id={isLoginPage ? "loginNewPassword" : "newPassword"}
            name="newPassword"
            value={isLoginPage ? loginFormData.newPassword : formData.newPassword}
            onChange={isLoginPage ? handleLoginChange : handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 pr-10"
            placeholder={isLoginPage ? "Enter your password" : "Enter new password"}
            required
            autoComplete={isLoginPage ? "current-password" : "new-password"}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 mt-8"
            onClick={() => togglePasswordVisibility('newPassword', isLoginPage)}
          >
            {isLoginPage ? 
              (showLoginPassword.newPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />) :
              (showPassword.newPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />)
            }
          </button>
        </div>
        {!isLoginPage && (
          <div className="relative">
            <label 
              className="block text-sm font-medium text-gray-700 mb-2" 
              htmlFor="confirmNewPassword"
            >
              Confirm Password
            </label>
            <input
              type={showPassword.confirmNewPassword ? 'text' : 'password'}
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 pr-10"
              placeholder="Confirm new password"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 mt-8"
              onClick={() => togglePasswordVisibility('confirmNewPassword')}
            >
              {showPassword.confirmNewPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </button>
          </div>
        )}
        {(isLoginPage ? loginErrorMsg : errorMsg) && (
          <div className="text-red-600 text-sm text-center">{isLoginPage ? loginErrorMsg : errorMsg}</div>
        )}
        {(isLoginPage ? loginSuccessMsg : successMsg) && (
          <div className="text-green-600 text-sm text-center">{isLoginPage ? loginSuccessMsg : successMsg}</div>
        )}
        <div className="flex justify-between space-x-3">
          <button
            type="button"
            className="w-1/2 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
            onClick={() => setIsExistingUser(!isLoginPage)}
          >
            {isLoginPage ? 'Sign Up' : 'Login'}
          </button>
          <button
            type="submit"
            className="w-1/2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
            disabled={loading}
            onClick={isLoginPage ? null : () => setShowLoginModal(true)}
          >
            {loading ? 'Processing...' : (isLoginPage ? 'Login' : 'Sign Up')}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-gray-100 p-4">
      {isExistingUser ? renderForm(true) : renderForm(false)}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 transform transition-all">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-tight">
              Admin Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label 
                  className="block text-sm font-medium text-gray-700 mb-2" 
                  htmlFor="loginEmail"
                >
                  Email 
                </label>
                <input
                  type="email"
                  id="loginEmail"
                  name="email"
                  value={loginFormData.email}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
                  placeholder="Enter your admin email"
                  required
                  autoComplete="username"
                />
              </div>
              <div className="relative">
                <label 
                  className="block text-sm font-medium text-gray-700 mb-2" 
                  htmlFor="loginNewPassword"
                >
                  Password
                </label>
                <input
                  type={showLoginPassword.newPassword ? 'text' : 'password'}
                  id="loginNewPassword"
                  name="newPassword"
                  value={loginFormData.newPassword}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 pr-10"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 mt-8"
                  onClick={() => togglePasswordVisibility('newPassword', true)}
                >
                  {showLoginPassword.newPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              </div>
              {loginErrorMsg && (
                <div className="text-red-600 text-sm text-center">{loginErrorMsg}</div>
              )}
              {loginSuccessMsg && (
                <div className="text-green-600 text-sm text-center">{loginSuccessMsg}</div>
              )}
              <div className="flex justify-between space-x-3">
                <button
                  type="button"
                  className="w-1/2 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
                  onClick={() => {
                    setShowLoginModal(false);
                    setLoginFormData({ email: '', newPassword: '' });
                    setLoginErrorMsg('');
                    setLoginSuccessMsg('');
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}