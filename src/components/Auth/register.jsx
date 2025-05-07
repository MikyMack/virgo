import { useState, useRef } from 'react';
import { sendOtp, verifyotp, loginWithGoogle } from '../../actions/useractions/auth/registeraction';
import { useNavigate } from 'react-router-dom';
import imag1 from "../../assets/breadcrumps/loginbread.jpg";
import { GoogleLogin } from '@react-oauth/google';



export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', otp: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const otpInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const response = await sendOtp({ email: formData.email });
      setSuccessMessage(response.message || 'OTP sent to email.');
      setOtpSent(true);
      setTimeout(() => otpInputRef.current?.focus(), 300);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(formData.otp)) {
      setError('Enter a valid 6-digit OTP');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const response = await verifyotp(formData);
      setSuccessMessage('Logged in successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='font-abc'>
      <div className="relative h-1/2 font-abc">
        <img className="w-full h-[300px] object-cover" src={imag1} alt="breadcrump" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-[30px] lg:text-[60px]">My Account</h1>
          <p className="text-xl">HOME / MY ACCOUNT</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center mt-8">
        <div className="w-full lg:w-1/2 p-10">
          <h1 className="text-3xl mb-5 text-center">LOGIN</h1>
          <p className="text-gray-700 mb-6">
            Enter your email to receive an OTP, or use your social account (if available).
          </p>

          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
            <input
              className="w-full border-b p-2 focus:outline-none"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {otpSent && (
              <input
                ref={otpInputRef}
                className="w-full border-b p-2 focus:outline-none"
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#acc7bf] text-white py-3 hover:bg-[#8dafa5]"
            >
              {loading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Send OTP'}
            </button>
          </form>

          {error && <p className="text-red-500 mt-3">{error}</p>}
          {successMessage && <p className="text-green-500 mt-3">{successMessage}</p>}
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              await loginWithGoogle(credentialResponse.credential);
              setSuccessMessage("Logged in successfully!");
              setTimeout(() => navigate("/"), 1500);
            } catch (err) {
              console.error(err);
              setError("Google login failed. Try again.");
            }
          }}
          onError={() => {
            setError("Google login failed. Please try again.");
          }}
        />
      </div>

    </section>
  );
}
