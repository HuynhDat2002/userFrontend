import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getProducts = async () => {
    const response = await axios.get(`${base_url}product/`);
    if (response.data) {
        return response.data;
    }
};

const getSingleProduct = async (id,config) => {
    const response = await axios.get(`${base_url}product/${id}`, config);

    if (response.data) {
        return response.data;
    }
};

const addToWishlist = async (prod) => {
    
    const response =await axios.put(
        `${base_url}product/wishlist`,
        { prodId:prod.id },
        prod.config
        );
    console.log("test", response.data);
    if (response.data){
        return response.data;

    }
};

const rateProduct = async (data, config) => {
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