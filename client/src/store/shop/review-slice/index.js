  import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
  import axios from 'axios';


  const initialState = {
    isLoading: false,
    reviews: [],
  };

  const getAuthHeaders = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

  export const addReview= createAsyncThunk('product/addReview',
    async(data)=>{
      const response= await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/review/add`,{data},{ headers: getAuthHeaders() });
      return response?.data;
    }
  )

  export const getReviews= createAsyncThunk('product/getReviews',
    async(id)=>{ 
      const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/review/${id}`,{ headers: getAuthHeaders() });
      return response?.data;
    }
  )

  const reviewSlice = createSlice({
      name: 'reviewSlice',
      initialState,
      reducers: {},
      extraReducers: (builder) =>{
          builder.addCase(addReview.pending,(state)=>{
              state.isLoading=true;
              }).addCase(addReview.fulfilled,(state,action)=>{
                  state.isLoading=false;
                  state.reviews=action.payload.data;
              }).addCase(addReview.rejected,(state)=>{
                  state.isLoading=false;
                  state.reviews=[];
              }).addCase(getReviews.pending,(state)=>{
              state.isLoading=true;
              }).addCase(getReviews.fulfilled,(state,action)=>{
                  state.isLoading=false;
                  state.reviews=action.payload.data;
              }).addCase(getReviews.rejected,(state)=>{
                  state.isLoading=false;
                  state.reviews=[];
              })
      }
  })

  export default reviewSlice.reducer;