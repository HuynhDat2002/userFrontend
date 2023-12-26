import axios from "axios";
import { base_url} from "../../utils/axiosConfig";
const register = async (userData) => {
    const response = await axios.post(`${base_url}user/register`, userData);
    if (response.data) {
        if (response.data) {
            localStorage.clear()
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
    console.log("res user:",response.data)
    // console.log("login",config)
    if (response.data) {
        console.log(response.data)
        localStorage.clear()
        localStorage.setItem("customer", JSON.stringify(response.data));
        // console.log("loginconf:",config)
        return response.data;
    }
};
const logout = async () => {
  
    
    const response = await axios.get(`${base_url}user/logout`);
    console.log("logout")
    if(response) {
      await localStorage.clear();
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
    const response = await axios.get(`${base_url}user/wishlist`);
    
    if (response.data) {
            return response.data;
        }
};
const addToCart = async (cartData) => {
    const response = await axios.post(`${base_url}user/cart`, cartData);
    if (response.data) {
            return response.data;
        }
};

const getCart = async (config2) => {
    console.log("conf22",config2)
    const response = await axios.get(`${base_url}user/cart`, config2);
    if (response.data) {
        return response.data;
    }
};

const removeProductFromCart = async (cartItemId) => {
    const response = await axios.delete(`${base_url}user/cart/delete-product-cart/${cartItemId}`);
    if (response.data) {
        return response.data;
    }
}
const deleteCart = async () => {
    const response = await axios.delete(`${base_url}user/cart/delete-cart`);
    console.log("delete",response.data);
    if (response.data) {
        return response.data;
    }
}

const updateProductFromCart = async (cartDetail) => {
    // console.log("config",config)
    const response = await axios.delete(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`);
    console.log("resup:",response.data)
    if (response.data) {

        return response.data;
    }
}


const createOrder = async (orderDetail) => {
    const response = await axios.post(`${base_url}user/cart/create-order`, orderDetail);
    console.log("createorder",response.data);
    if (response.data) {
        return response.data;
    }
}

const getUserOrder = async () => {
    const response = await axios.get(`${base_url}user/getmyorders`);
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
    deleteCart,
    updateProfile,
    createOrder,
    getUserOrder,
    forgotPassToken,
    resetPass,
        
};