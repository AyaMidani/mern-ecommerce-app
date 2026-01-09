import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  error: null,
  orderId: null,
  html: '',
  token: null,
  paymentPageUrl: null,
  order: null,
  orderList:[],
  orderDetails: null
};
const getAuthHeaders = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};


export const createNewOrder = createAsyncThunk(
  'order/createNewOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
        orderData,
        { headers: getAuthHeaders() },
        { withCredentials: true }
      );
      if (!data?.success) return rejectWithValue(data?.message || 'Payment init failed');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/${orderId}`,{ headers: getAuthHeaders() }, { withCredentials: true });
      if (!data?.success || !data?.order) {
        return rejectWithValue('Order not found');
      }
      return data.order; // <- return the order doc
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getAllOrdersByUserId= createAsyncThunk('order/getAllOrdersByUserId',
  async(userId)=>{
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`,{ headers: getAuthHeaders() });
    return response?.data;
  }
)

export const getOrderDetails= createAsyncThunk('order/getOrderDetails',
  async(id)=>{
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`,{ headers: getAuthHeaders() });
    return response?.data;
  }
)

const shoppingOrderSlice = createSlice({
  name: 'shoppingOrderSlice',
  initialState,
  reducers: {
    resetOrderState(state) {
      state.isLoading = false;
      state.error = null;
      state.orderId = null;
      state.html = '';
      state.token = null;
      state.paymentPageUrl = null;
      state.order = null;
      state.orderDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        state.html = action.payload.html || '';
        state.token = action.payload.token || null;
        state.paymentPageUrl = action.payload.paymentPageUrl || null;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to create order';
        state.orderId = null;
        state.html = '';
        state.token = null;
        state.paymentPageUrl = null;
      }).addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
        state.orderId = action.payload?._id || state.orderId;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to load order';
      }).addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      }).addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  }
});

export const { resetOrderState } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
