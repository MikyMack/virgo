import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, adminVerifyOtp } from '../../../actions/adminactions/authactions/Login';

export default function AdminSignin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  });
  const [step, setStep] = useState(1); // 1: enter email, 2: enter otp
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const otpInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      if (!formData.email || !formData.email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        setLoading(false);
        return;
      }
      await adminLogin({ email: formData.email });
      setSuccessMsg('OTP sent to your email.');
      setStep(2);
      setTimeout(() => otpInputRef.current?.focus(), 300);
    } catch (error) {
      setErrorMsg(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      if (!/^\d{6}$/.test(formData.otp)) {
        setErrorMsg('Enter a valid 6-digit OTP');
        setLoading(false);
        return;
      }
      const res = await adminVerifyOtp({ email: formData.email, otp: formData.otp });
      // Save token to localStorage for protected routes
      if (res && res.token) {
        localStorage.setItem('AdminToken', res.token);
      }
      setSuccessMsg('Logged in successfully!');
      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } catch (error) {
      setErrorMsg(error.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 transform transition-all hover:shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-tight">
          Admin Sign In
        </h2>
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-6">
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
                placeholder="Enter your admin email"
                required
                autoComplete="username"
              />
            </div>
            {errorMsg && (
              <div className="text-red-600 text-sm text-center">{errorMsg}</div>
            )}
            {successMsg && (
              <div className="text-green-600 text-sm text-center">{successMsg}</div>
            )}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
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
                placeholder="Enter the 6-digit OTP"
                required
                maxLength={6}
                ref={otpInputRef}
                autoComplete="one-time-code"
                inputMode="numeric"
                pattern="\d{6}"
              />
            </div>
            {errorMsg && (
              <div className="text-red-600 text-sm text-center">{errorMsg}</div>
            )}
            {successMsg && (
              <div className="text-green-600 text-sm text-center">{successMsg}</div>
            )}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
            <div className="text-sm text-center mt-2">
              <button
                type="button"
                className="text-indigo-600 hover:underline"
                onClick={() => {
                  setStep(1);
                  setFormData({ email: formData.email, otp: '' });
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                disabled={loading}
              >
                Change Email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}