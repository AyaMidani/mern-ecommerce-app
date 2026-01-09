import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  isLoading: false,
  addressList: [],
};

const getAuthHeaders = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const addNewAddress = createAsyncThunk(
  'address/addNewAddress',
  async (formData) => { 
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
      formData,
      { headers: getAuthHeaders() }
    );
    return response?.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  'address/fetchAllAddresses',
  async (userId) => { 
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`,
      { headers: getAuthHeaders() }
    );
    return response?.data;
  }
);

export const editAddress = createAsyncThunk(
  'address/editAddress',
  async ({ userId, addressId, formData }) => { 
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`,
      formData,
      { headers: getAuthHeaders() }
    );
    return response?.data;
  }
);

export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`,
      { headers: getAuthHeaders() }
    );
    return response?.data;
  }
);

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(addNewAddress.pending,(state)=>{
            state.isLoading=true;
            }).addCase(addNewAddress.fulfilled,(state,action)=>{
                state.isLoading=false;
            }).addCase(addNewAddress.rejected,(state)=>{
                state.isLoading=false;
            }).addCase(fetchAllAddresses.pending,(state)=>{
                state.isLoading=true;
            }).addCase(fetchAllAddresses.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.addressList=action.payload.data;
            }).addCase(fetchAllAddresses.rejected,(state)=>{
                state.isLoading=false;
                state.addressList=null;
            }).addCase(editAddress.pending,(state)=>{
            state.isLoading=true;
            }).addCase(editAddress.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.addressList=action.payload.data;
            }).addCase(editAddress.rejected,(state)=>{
                state.isLoading=false;
                state.addressList=null;
            }).addCase(deleteAddress.pending,(state)=>{
            state.isLoading=true;
            }).addCase(deleteAddress.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.addressList=action.payload.data;
            }).addCase(deleteAddress.rejected,(state)=>{
                state.isLoading=false;
                state.addressList=null;
            })
    }
})

export default addressSlice.reducer;