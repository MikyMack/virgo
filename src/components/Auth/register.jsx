import { useState } from 'react';
import imag1 from "../../assets/breadcrumps/loginbread.jpg";
import { FaGooglePlusSquare, FaFacebookSquare } from "react-icons/fa";
import { verifyotp,sendOtp } from '../../actions/useractions/auth/registeraction';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, FacebookAuthProvider , signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase-config"; // Adjust the path to your Firebase configuration



export default function Register() {
  const navigate=useNavigate()
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
      await sendOtp({ email: formData.email });
      setOtpSent(true);
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();    
    try {
      const response = await verifyotp(formData);
     if(response.message==="Login successful") {
      navigate("/")
     }
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
  
      // Get user details
      const user = result.user;
      console.log("Google Sign-In successful:", user);
  
      // Redirect or perform further actions
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In failed:", error.message);
    }
  };
  

  const handleFacebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Get user details
      const user = result.user;
      console.log("Facebook Sign-In successful:", user);

      // Redirect or perform further actions
      navigate("/");
    } catch (error) {
      console.error("Facebook Sign-In failed:", error.message);
    }
  };

  return (
    <section className='font-abc'>
      <div className="relative h-1/2 font-abc">
        <img className="w-full h-[300px] md:h-[300px] lg:h-[300px] object-cover" src={imag1} alt="breadcrump" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-[30px] lg:text-[60px] md:text-[50px] pb-2">My Account</h1>
          <p className="text-xl">HOME<span> / MY ACCOUNT</span></p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center xl:container mt-8">
        <div className="flex flex-col items-center justify-start w-full lg:w-1/2 p-10 lg:p-28 md:p-28">
          <h1 className="text-3xl mb-5 text-center">LOGIN</h1>
          <p className="my-6 text-gray-700">Login here by filling your email to get OTP or use your favorite social network account to enter the site. Site login will simplify the purchase process and allows you to manage your personal account.</p>
          <form className="flex flex-col items-center w-full" onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
            <input
              className="mb-5 p-2 w-full border-b focus:outline-none"
              type="email"
              name="email"
              placeholder="Email"
              minLength="1"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {otpSent && (
              <input
                className="mb-5 p-2 w-full border-b focus:outline-none"
                type="text"
                name="otp"
                placeholder="OTP"
                maxLength="6"
                minLength="1"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            )}
            <button className="mb-5 p-4 text-2xl w-full bg-[#acc7bf] hover:bg-[#8dafa5] text-white ">
              {otpSent ? 'VERIFY OTP' : 'SEND OTP'}
            </button>
          </form>
          <p className="mb-5">or Login with</p>
          <div className='flex flex-row justify-between'>
            <button className="mb-5 px-5 py-2 w-1/2 bg-red-500 text-white flex items-center justify-center mr-2"  onClick={handleGoogleSignIn}>
              <FaGooglePlusSquare className="mr-2 text-4xl" /> Google
            </button>
            <button className="mb-5 px-5 py-2 w-1/2 bg-blue-600 text-white flex items-center justify-center ml-2">
              <FaFacebookSquare className="mr-2 text-4xl"  onClick={handleFacebookSignIn} /> Facebook
            </button>
          </div>
        </div>
      </div>
      <div className='lg:container'>
        <hr />
      </div>
    </section>
  );
}
