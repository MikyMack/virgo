import axios from "../../../axios";
import { API_URLS } from "../../../constants/config";

export const CreateProduct=async (data)=>{
    try {
        const response=await axios.post(API_URLS.CREATE_PRODUCTS,data);
        return response.data;
    } catch (error) {
        console.error("while creating products",error);
        throw error;
    }
}

export const ShowAllProducts=async()=>{
    try {
         const response=await axios.get(API_URLS.SHOW_PRODUCTS);
        return response.data;
    } catch (error) {
        console.error("while fetching all products",error);
        throw error;
    }
}
export const ShowVariantTypes=async()=>{
    try {
         const response=await axios.get(API_URLS.VARIANT_TYPES);
        return response.data;
    } catch (error) {
        console.error("while fetching variant types",error);
        throw error;
    }
}
export const ShowVariantOptions=async()=>{
    try {
         const response=await axios.get(API_URLS.VARIANT_OPTIONS);
        return response.data;
    } catch (error) {
        console.error("while fetching variant options",error);
        throw error;
    }
}

export const ProductsByCategory=async(id)=>{
 try {
     const response=await axios.get(`${API_URLS.PRODUCTS_CATEGORY}?category_id=${id}`);
    return response.data;
 } catch (error) {
    console.error("while fetching products by category",error);
    throw error;
 }
}