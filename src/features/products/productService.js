import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProducts = async () => {
    const response = await axios.get(`${base_url}product/`, config);
    if (response.data) {
        return response.data;
    }
};

const getSingleProduct = async (id) => {
    const response = await axios.get(`${base_url}product/${id}`, config);

    if (response.data) {
        return response.data;
    }
};

const addToWishlist = async (prodId) => {
    
    const response =await axios.put(
        `${base_url}product/wishlist`,
        { prodId:prodId },
        config
        );
    console.log("test", response.data);
    if (response.data){
        return response.data;

    }
};

const rateProduct = async (data) => {
    const response = await axios.put(
        `${base_url}product/rating`,
        {star:data.star,prodId:data.prodId,comment:data.comment},
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
   getSingleProduct
};