import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  isLoading: false,
  cartItems: [],
};

export const addToCart= createAsyncThunk('cart/addToCart',
  async({userId,productId,quantity})=>{ 
    const response= await axios.post('http://localhost:5001/api/shop/cart/add/',{userId,productId,quantity});
    return response?.data;
  }
)

export const fetchCardItems= createAsyncThunk('cart/fetchCardItems',
  async({userId})=>{ 
    const response= await axios.get(`http://localhost:5001/api/shop/cart/get/${userId}`);
    return response?.data;
  }
)

export const deleteCartItem= createAsyncThunk('cart/deleteCartItem',
  async({userId,productId,quantity})=>{ 
    const response= await axios.delete(`http://localhost:5001/api/shop/cart/${userId}/${productId}`);
    return response?.data;
  }
)

export const updateCartQuantity= createAsyncThunk('cart/updateCartQuantity',
  async({userId,productId,quantity})=>{ 
    const response= await axios.put('http://localhost:5001/api/shop/cart/update-cart',{userId,productId,quantity});
    return response?.data;
  }
)

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(addToCart.pending,(state)=>{
            state.isLoading=true;
            }).addCase(addToCart.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.cartItems=action.payload.data;
            }).addCase(addToCart.rejected,(state)=>{
                state.isLoading=false;
                state.cartItems=[];
            }).addCase(fetchCardItems.pending,(state)=>{
            state.isLoading=true;
            }).addCase(fetchCardItems.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.cartItems=action.payload.data;
            }).addCase(fetchCardItems.rejected,(state)=>{
                state.isLoading=false;
                state.cartItems=null;
            }).addCase(deleteCartItem.pending,(state)=>{
            state.isLoading=true;
            }).addCase(deleteCartItem.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.cartItems=action.payload.data;
            }).addCase(deleteCartItem.rejected,(state)=>{
                state.isLoading=false;
                state.cartItems=null;
            }).addCase(updateCartQuantity.pending,(state)=>{
            state.isLoading=true;
            }).addCase(updateCartQuantity.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.cartItems=action.payload.data;
            }).addCase(updateCartQuantity.rejected,(state)=>{
                state.isLoading=false;
                state.cartItems=null;
            })
    }
})

export default shoppingCartSlice.reducer;