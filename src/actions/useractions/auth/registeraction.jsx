import axios from "../../../axios";
import { API_URLS } from "../../../constants/config";

export const sendOtp=async(email)=>{
    try {
        console.log(email);  
        const response=await axios.post(API_URLS.REGISTRATION,email);
        return response.data;
    } catch (error) {
        console.error("while creating products",error);
        throw error;
    }
}
export const verifyotp=async(data)=>{
    try {
        console.log(data); 
        const response=await axios.post(API_URLS.VERIFY_OTP,data);
        const { access, refresh } = response.data;
        localStorage.setItem('userAccessToken', access);
        localStorage.setItem('userRefreshToken', refresh);
        return response.data;
    } catch (error) {
        console.error("while creating products",error);
        throw error;
    }
}