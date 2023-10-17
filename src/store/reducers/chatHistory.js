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

const initialState = [];

// ==============================|| SLICE - MENU ||============================== //

const chatHistory = createSlice({
  name: 'chatHistory',
  initialState,
  reducers: {
    addChat(state, action) {
      //state.chatHistoryList = action.payload;
      //state.chatHistoryList = [...state.chatHistoryList, action.payload];
      //state.chatHistoryList = [...state.chatHistoryList, action];
      state.push(action.payload);
      //console.log('****' + state.chatHistoryList.length);
    },
    removeChat(state, action) {
      state.chatHistoryList = action.payload;
    }
  }
});

export default chatHistory.reducer;

export const { addChat, removeChat } = chatHistory.actions;
