import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";



const getProducts = async (userData) => {
    const response = await axios.get(`${base_url}product/`, config);
    if (response.data) {
        return response.data;
    }
};

const getProduct = async (id) => {
    const response = await axios.get(`${base_url}product/${id}`, config);

    if (response.data) {
        return response.data;
    }
};

const addToWishlist = async (prodID) => {
    const response =await axios.put(
        `${base_url}product/wishlist`,
        { prodID },
        config
        );
    if (response.data){
        return response.data;
    }
};

const rateProduct = async (data) => {
    const response = await axios.put(
        `${base_url}product/rating`,
        data,
        config
    );
    if (response.data) {
        return response.data;
    }
};

export const productService = {
   getProducts,
   addToWishlist,


  
   rateProduct,

   getProduct
};