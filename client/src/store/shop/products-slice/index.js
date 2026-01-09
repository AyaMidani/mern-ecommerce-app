import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null
};
const getAuthHeaders = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const fetchProductDetails= createAsyncThunk('product/fetchProductDetails',
  async(id)=>{ 
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`,{ headers: getAuthHeaders() },);
    return response?.data;
  }
)

export const fetchAllFilteredProducts= createAsyncThunk('product/fetchAllProducts',
  async({filterParams,sortParams})=>{
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams
    })
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`,{ headers: getAuthHeaders() },);
    return response.data
  }
)

const shoppingProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {
      setProductDetails:(state)=>{
        state.productDetails = null;
      }
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchAllFilteredProducts.pending,(state)=>{
            state.isLoading=true;
            }).addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.productList=action.payload.data;
            }).addCase(fetchAllFilteredProducts.rejected,(state)=>{
                state.isLoading=false;
                state.productList=[];
            }).addCase(fetchProductDetails.pending,(state)=>{
            state.isLoading=true;
            }).addCase(fetchProductDetails.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.productDetails=action.payload.data;
            }).addCase(fetchProductDetails.rejected,(state)=>{
                state.isLoading=false;
                state.productDetails=null;
            })
    }
})

export const {setProductDetails}= shoppingProductsSlice.actions
export default shoppingProductsSlice.reducer;