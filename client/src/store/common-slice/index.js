import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  'common/getFeatureImages',
  async () => {
    const token = JSON.parse(sessionStorage.getItem('token'));

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/common/feature/get`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response?.data;
  }
);


export const addFeatureImage = createAsyncThunk(
  'common/addFeatureImage',
  async (image) => {
    const token = JSON.parse(sessionStorage.getItem('token'));

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/common/feature/add`,
      { image },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response?.data;
  }
);

const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) =>{
        builder.addCase(getFeatureImages.pending,(state)=>{
            state.isLoading=true;
            }).addCase(getFeatureImages.fulfilled,(state,action)=>{
                state.isLoading=false;
                console.log(action.payload.data)
                state.featureImageList=action.payload.data;
            }).addCase(getFeatureImages.rejected,(state)=>{
                state.isLoading=false;
                state.featureImageList=[];
            })
    }
})
export default commonSlice.reducer;