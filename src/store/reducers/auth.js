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
      state = action.payload;
      return state;
    }
  }
});

export default auth.reducer;

export const { setAuth } = auth.actions;
