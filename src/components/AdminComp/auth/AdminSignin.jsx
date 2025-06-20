import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, adminVerifyOtp } from '../../../actions/adminactions/authactions/Login';

export default function AdminSignin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLogin({ email: formData.email });
      setOtpSent(true);
      alert(response.message || 'OTP sent successfully!');
    } catch (error) {
      alert(error.message || 'Failed to send OTP');
      console.error('Failed to send OTP:', error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await adminVerifyOtp({ email: formData.email, otp: formData.otp });
      if (response.message && response.message.toLowerCase().includes("success")) {
        navigate("/admin/dashboard");
      } else {
        alert(response.message || "OTP verification failed");
      }
    } catch (error) {
      alert(error.message || 'OTP verification failed');
      console.error('OTP verification failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 transform transition-all hover:shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-tight">
          Admin Sign In
        </h2>
        <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-6">
          <div>
            <label 
              className="block text-sm font-medium text-gray-700 mb-2" 
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
              placeholder="Enter your email"
              required
            />
          </div>
          {otpSent && (
            <div>
              <label 
                className="block text-sm font-medium text-gray-700 mb-2" 
                htmlFor="otp"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                minLength="1"
                required
              />
            </div>
          )}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
            >
              {otpSent ? 'Verify OTP' : 'Send OTP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}