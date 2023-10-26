// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    id: '',
    name: '',
    email: '',
    company: '',    
    loginDate: ''
};

// ==============================|| SLICE - MENU ||============================== //

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      //state.chatHistoryList = action.payload;
      //state.chatHistoryList = [...state.chatHistoryList, action.payload];
      //state.chatHistoryList = [...state.chatHistoryList, action];
      console.log("#########" + action)
      state = action.payload;
      //console.log('****' + state.chatHistoryList.length);
    },
  }
});

export default auth.reducer;

export const { setAuth } = auth.actions;
