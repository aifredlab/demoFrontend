// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
// const initialState = {
//   id: '',
//   question: '',
//   reply: '',
//   content: '',
//   dateTime: ''
// };

const initialState = {
  id: '',
  title: '',
  createdAt: ''
};

// ==============================|| SLICE - MENU ||============================== //

const chatHistory = createSlice({
  name: 'chatHistory',
  initialState,
  reducers: {
    setChatHistory(state, action) {
      return action.payload;
    },
    resetChatHistory(state, action) {
      return initialState;
    }
  }
});

export default chatHistory.reducer;

export const { setChatHistory, resetChatHistory } = chatHistory.actions;
