import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  isLoading: false,
  searchResults: [],
};

const getAuthHeaders = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const getSearchResults= createAsyncThunk('product/getSearchResults',
  async(keyword)=>{ 
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/search/${keyword}`,{ headers: getAuthHeaders() });
    return response?.data;
  }
)

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
      resetSeacrhResults:(state)=>{
        state.searchResults =[]
      }
    },
    extraReducers: (builder) =>{
        builder.addCase(getSearchResults.pending,(state)=>{
            state.isLoading=true;
            }).addCase(getSearchResults.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.searchResults=action.payload.data;
            }).addCase(getSearchResults.rejected,(state)=>{
                state.isLoading=false;
                state.searchResults=[];
            })
    }
})
export const {resetSeacrhResults}= searchSlice.actions
export default searchSlice.reducer;