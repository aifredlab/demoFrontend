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
    },
    resetAuth(state, action) {
      return initialState;
    }
  }
});

export default auth.reducer;

export const { setAuth, resetAuth } = auth.actions;
