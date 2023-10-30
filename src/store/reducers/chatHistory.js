// types
import { createSlice } from '@reduxjs/toolkit';

import uuid from 'react-uuid';

// initial state
// const initialState = {
//   id: '',
//   question: '',
//   reply: '',
//   content: '',
//   dateTime: ''
// };


const initialState = [];

// ==============================|| SLICE - MENU ||============================== //

const chatHistory = createSlice({
  name: 'chatHistory',
  initialState,
  reducers: {
    addChatHistory(state, action) {
      state.push(action.payload);
    },
    removeChatHistory(state, action) {
      state.chatHistoryList = action.payload;
    },
    removeAllChatHistory(state, action) {
      state.chatHistoryList = action.payload;
    }
  }
});

export default chatHistory.reducer;

export const { addChat, removeChat } = chatHistory.actions;
