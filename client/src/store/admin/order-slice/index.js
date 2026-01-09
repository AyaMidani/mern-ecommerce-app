import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

const getToken = () => JSON.parse(sessionStorage.getItem('token'));

export const getAllOrdersForAdmin = createAsyncThunk(
  'order/getAllOrdersForAdmin',
  async () => {
    const token = getToken();

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/get/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response?.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  'order/getOrderDetailsForAdmin',
  async (id) => {
    const token = getToken();

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/details/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response?.data;
  }
);

export const UpdateOrderStatus = createAsyncThunk(
  'order/UpdateOrderStatus',
  async ({ id, orderStatus }) => {
    const token = getToken();

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`,
      { orderStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response?.data;
  }
);

const adminOrderSlice = createSlice({
  name: 'adminOrderSlice',
  initialState,
  reducers: {
    resetOrderState(state) {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderState } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
