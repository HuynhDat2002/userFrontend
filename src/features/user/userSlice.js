import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authService } from "./userService";
export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await authService.register(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);
export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const logout = createAsyncThunk("auth/logout",
    async (thunkAPI) => {
        try {
            return await authService.logout();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)


//forgot password
export const forgotPassword = createAsyncThunk("auth/forgot-password",
    async (email, thunkAPI) => {
        try {
            return await authService.forgotPassword(email);
        } catch (error) {
            console.log("error: ", error.response?.data)
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const resetPassword = createAsyncThunk("auth/reset-password",
async (data,thunkAPI)=>{
  try {
    return await authService.resetPassword(data);
  } catch (error) {
    console.log("error reset: ",error)
    return thunkAPI.rejectWithValue(error);
  }
}
);

export const getUserProductWislist = createAsyncThunk(
    "auth/wishlist",
    async (thunkAPI) => {
        try {
            return await authService.getUserWislist();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addProdToCart = createAsyncThunk(
    "user/cart/add",
    async (cartData, thunkAPI) => {
        try {
            return await authService.addToCart(cartData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getUserCart = createAsyncThunk(
    "user/cart/get",
    async (thunkAPI) => {
        try {
            return await authService.getCart();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getOrders = createAsyncThunk(
    "user/order/get",
    async (thunkAPI) => {
        try {
            return await authService.getUserOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteCartProduct = createAsyncThunk(
    "user/cart/product/delete",
    async (cartItemId, thunkAPI) => {
        try {
            return await authService.removeProductFromCart(cartItemId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updateCartProduct = createAsyncThunk(
    "user/cart/product/update",
    async (cartDetail, thunkAPI) => {
        try {
            return await authService.updateProductFromCart(cartDetail);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateProfile = createAsyncThunk(
    "user/profile/update",
    async (data, thunkAPI) => {
        try {
            return await authService.updateUser(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const forgotPasswordToken = createAsyncThunk(
    "user/password/token",
    async (data, thunkAPI) => {
        try {
            return await authService.forgotPassToken(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "user/password/token",
    async (data, thunkAPI) => {
        try {
            return await authService.resetPass(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);



const getCustomerfromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

const initialState = {
    user: getCustomerfromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;

        })

        .addCase(getOrders.pending, (state) => {
            state.isLoading = true;
        }).addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.getorderedProduct = action.payload;
            
        }).addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            
        })

        .addCase(updateProfile.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.updatedUser = action.payload;
            if (state.isSuccess) {
                toast.success("Profile Updated Successfully")
            }
        
        }).addCase(updateProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
            if (state.isSuccess===false) {
                toast.error("Something went Wrong!")
            }
        })
        .addCase(forgotPasswordToken.pending, (state) => {
            state.isLoading = true;
        }).addCase(forgotPasswordToken.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.token = action.payload;
            if (state.isSuccess) {
                toast.success("Forgot Password Email sent Successfully")
            }
        
        }).addCase(forgotPasswordToken.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isSuccess===false) {
                toast.error("Something went Wrong!")
            }
        })
        .addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
        }).addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.pass = action.payload;
            if (state.isSuccess) {
                toast.success("Password Updated Successfully")
            }
        
        }).addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isSuccess===false) {
                toast.error("Something went Wrong!")
            }
        })
    },
    });
 
export default authSlice.reducer;

