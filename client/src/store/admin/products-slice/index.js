import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct= createAsyncThunk('product/addnewproduct',
  async(formData)=>{
    const response= await axios.post('http://localhost:5001/api/admin/products/add',formData,{
      headers:{
        'Content-Type' : 'application/json'
      }
    });
    return response.data
  }
)

export const fetchAllProducts= createAsyncThunk('product/fetchAllProducts',
  async()=>{
    const response= await axios.get('http://localhost:5001/api/admin/products/get');
    return response.data
  }
)
export const editProduct= createAsyncThunk('product/editProduct',
  async({id,formData})=>{
    const response= await axios.put(`http://localhost:5001/api/admin/products/edit/${id}`,formData,{
      headers:{
        'Content-Type' : 'application/json'
      }
    });
    return response.data
  }
)
export const deleteProduct= createAsyncThunk('product/deleteProduct',
  async(id,formData)=>{
    const response= await axios.delete(`http://localhost:5001/api/admin/products/delete/${id}`,formData,{
      headers:{
        'Content-Type' : 'application/json'
      }
    });
    return response.data
  }
)

const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchAllProducts.pending,(state)=>{
            state.isLoading=true;
            }).addCase(fetchAllProducts.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.productList=action.payload.data;
            }).addCase(fetchAllProducts.rejected,(state)=>{
                state.isLoading=false;
                state.productList=[];
            })
    }
})

export default AdminProductsSlice.reducer;