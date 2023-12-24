import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";
const register = async (userData) => {
    const response = await axios.post(`${base_url}user/register`, userData);
    if (response.data) {
        if (response.data) {
            localStorage.setItem("customer",JSON.stringify(response.data)); 
        }
        return response.data;
    }
};
const updateProfile = async (userData) => {
    const response = await axios.put(`${base_url}user/edit-user`, userData.data,userData.config);
    console.log("upd",response.data);
    if (response.data) {
       
            return response.data;
        
    }
};
const login = async (userData) => {
    const response = await axios.post(`${base_url}user/login`, userData);
    if (response.data) {
        console.log(response.data)
        localStorage.setItem("customer", JSON.stringify(response.data));
        return response.data;
    }
};
const logout = async () => {
  
    
    const response = await axios.get(`${base_url}user/logout`);
    console.log("logout")
    if(response) {
      await localStorage.removeItem("customer");
    }
  
    return response.data;
  }

  const forgotPassword = async (email) => {
    const response = await axios.post(`${base_url}user/forgot-password-token`,email);
    // if (response.data) {
    //   localStorage.setItem("tokenPassword", response.data);
    //   const tokenPassword= localStorage.getItem("tokenPassword");
    //   console.log("tokenPassword: ",tokenPassword)
    // }
    // console.log('forgot password: ',response);
    return response.data;
  }
  const resetPassword = async (data) => {
    const response = await axios.put(`${base_url}user/reset-password/${data.token}`,{password:data.password});
    
    return response.data;
  }
  
const getUserWishlist = async () => {
    const response = await axios.get(`${base_url}user/wishlist`, config);
    
    if (response.data) {
            return response.data;
        }
};
const addToCart = async (cartData) => {
    const response = await axios.post(`${base_url}user/cart`, cartData, config);
    if (response.data) {
            return response.data;
        }
};

const getCart = async () => {
    const response = await axios.get(`${base_url}user/cart`, config);
    if (response.data) {
        return response.data;
    }
};

const removeProductFromCart = async (cartItemId) => {
    const response = await axios.delete(`${base_url}user/delete-product-cart/${cartItemId}`, config);
    if (response.data) {
        return response.data;
    }
}

const updateProductFromCart = async (cartDetail) => {
    const response = await axios.delete(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`, config);
    if (response.data) {
        return response.data;
    }
}


const createOrder = async (orderDetail) => {
    const response = await axios.post(`${base_url}user/cart/creat-oeder`, orderDetail, config);
    if (response.data) {
        return response.data;
    }
}

const getUserOrder = async () => {
    const response = await axios.get(`${base_url}user/getmyorders`,  config);
    if (response.data) {
        return response.data;
    }
}


const forgotPassToken = async (data) => {
    const response = await axios.post(`${base_url}user/forgot-Password-toke`, data);
    if (response.data) {
        return response.data; 
    }
}

const resetPass = async (data) => {
    const response = await axios.put(`${base_url}user/reset-password/:${data.token}`, {password:data?.password});
    if (response.data) {
        return response.data; 
    }
}




export const authService = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getUserWishlist,
    addToCart,
    getCart,
    removeProductFromCart,
    updateProductFromCart,

    updateProfile,
    createOrder,
    getUserOrder,
    forgotPassToken,
    resetPass,
        
};