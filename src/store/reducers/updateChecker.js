// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  hasChatHistoryUpdate: false
};

//const initialState = false;

// ==============================|| SLICE - MENU ||============================== //

const updateChecker = createSlice({
  name: 'updateChecker',
  initialState,
  reducers: {
    hasChatHistoryUpdate(state, action) {
      state.hasChatHistoryUpdate = action.payload.hasChatHistoryUpdate;
    },
    resetUpdate(state, action) {
      return initialState;
    }
  }
});

export default updateChecker.reducer;

export const { hasChatHistoryUpdate, resetUpdate } = updateChecker.actions;
