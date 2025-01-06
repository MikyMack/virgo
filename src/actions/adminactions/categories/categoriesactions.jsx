import axios from "../../../axios";
import { API_URLS } from "../../../constants/config";

export const CategoriesList=async()=>{
    try {
        const response=await axios.get(API_URLS.CATEGORIES_LIST);
        return response.data;
    } catch (error) {
        console.error("while fetching categories",error);
        throw error;
    }
 
}

export const CreateCategory=async(data)=>{
    try {
        const response=await axios.post(API_URLS.CATEGORIES_CREATE,data);
        return response.data;
    } catch (error) {
        console.error("while creating categories",error);
        throw error;
    }
}