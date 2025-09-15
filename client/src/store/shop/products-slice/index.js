import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchAllFilteredProducts= createAsyncThunk('product/fetchAllProducts',
  async()=>{
    const response= await axios.get('http://localhost:5001/api/shop/products/get');
    return response.data
  }
)


const shoppingProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchAllFilteredProducts.pending,(state)=>{
            state.isLoading=true;
            }).addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.productList=action.payload.data;
            }).addCase(fetchAllFilteredProducts.rejected,(state)=>{
                state.isLoading=false;
                state.productList=[];
            })
    }
})

export default shoppingProductsSlice.reducer;