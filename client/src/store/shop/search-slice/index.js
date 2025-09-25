import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  isLoading: false,
  searchResults: [],
};

export const getSearchResults= createAsyncThunk('product/getSearchResults',
  async(keyword)=>{ 
    const response= await axios.get(`http://localhost:5001/api/shop/search/${keyword}`);
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
                console.log(action.payload.data)
                state.searchResults=action.payload.data;
            }).addCase(getSearchResults.rejected,(state)=>{
                state.isLoading=false;
                console.log(state.error)
                state.searchResults=[];
            })
    }
})
export const {resetSeacrhResults}= searchSlice.actions
export default searchSlice.reducer;