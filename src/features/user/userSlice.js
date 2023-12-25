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

export const updateProfile = createAsyncThunk("auth/updateProfile", async (userData, thunkAPI) => {
    try {

        return await authService.updateProfile(userData);
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
    async (data, thunkAPI) => {
        try {
            return await authService.resetPassword(data);
        } catch (error) {
            console.log("error reset: ", error)
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getUserProductWishlist = createAsyncThunk(
    "user/wishlist",
    async (thunkAPI) => {
        try {
            return await authService.getUserWishlist();
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
    async (config, thunkAPI) => {
        try {
            return await authService.getCart(config);
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
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "Đăng ký thành công";


                state.createdUser = action.payload;

            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action?.payload?.response?.data?.message);
                }
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
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "UpdateProfile Success";

                state.updatedProfile = action.payload;
                if (state.isSuccess === true) {
                    let current = JSON.parse(localStorage.getItem("customer"));
                    let newUserData = {
                        _id: current?._id,
                        token: current.token,
                        firstname: action?.payload?.firstname,
                        lastname: action?.payload?.lastname,
                        email: action?.payload?.email,
                        mobile: action?.payload?.mobile,
                        image: action?.payload?.image,
                    }
                    localStorage.setItem("customer", JSON.stringify(newUserData))
                    console.log("new:", JSON.parse(localStorage.getItem("customer")))

                    if (!state.toastShown) {
                        toast.success("Update Profile Successfully");
                        state.toastShown = true; // Thêm trạng thái để chỉ hiển thị một lần
                    }

                }
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.success("Something Went Wrong!");
                }
            })

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'loggedin'
                state.user = action.payload;
                if (state.isSuccess === true) {
                    toast.success("User Logged In Successfully");

                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error("Email hoặc mật khẩu không đúng");
                }
            })

            //logout
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "logout success";
                state.user = action.payload
                if (state.isSuccess) {
                    toast.success("User Logged Out Successfully");
                }
            })
            .addCase(logout.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
                if (state.isError === true) {
                    toast.error(action.error);
                }
            })

            //forgot password
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "forgotPassword request success";
                if (state.isSuccess === true) {
                    toast.success("Forgot Password Request Successfully");
                }
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
                if (state.isError === true) {
                    toast.error(action.error);
                }
            })

            //resetPassword
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "reset password success";
                if (state.isSuccess === true) {
                    toast.success("Reset Password Successfully");
                }
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
                if (state.isError === true) {
                    toast.error(action.error);
                }
            })
            .addCase(getUserProductWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProductWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            })
            .addCase(getUserProductWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(addProdToCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(addProdToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProduct = action.payload;
                state.cartProducts = [...state.cartProducts,action.payload]
                
                if (state.isSuccess) {
                    toast.success("Product Added to Cart")
                }
            }).addCase(addProdToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            
            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProducts = action.payload;
            }).addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCartProduct.pending, (state) => {
                state.isLoading = true;
            }).addCase(deleteCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deleteCartProduct = action.payload;
                state.cartProducts = state.cartProducts.filter(item=>item!==action.payload)

                if (state.isSuccess) {
                    toast.success("Prouct Deleted From Cart Successfully!")
                }
            }).addCase(deleteCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Something Went Wrong!")
                }
            })
            .addCase(updateCartProduct.pending, (state) => {
                state.isLoading = true;
            }).addCase(updateCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updateCartProduct = action.payload;
                state.cartProducts = state.cartProducts.filter(item=>item._id!==action.payload._id)
                state.cartProducts=[...state.cartProducts,action.payload]
           
                
            }).addCase(updateCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Something Went Wrong!")
                }
            })

    },
});

export default authSlice.reducer;