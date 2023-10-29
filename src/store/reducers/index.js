// third-party
import { combineReducers } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';

// project import
import menu from './menu';
import chatHistory from './chatHistory';
import auth from './auth';

// ==============================|| COMBINE REDUCERS ||============================== //
const reducers = combineReducers({ menu, chatHistory, auth });
// const persistConfig = {
//   key: 'root',
//   storage
//   //whitelist: ['auth'] //whitelist: 유지하고 싶은 값을 배열로 전달한다.
//   //blacklist: 유지하고 싶지 않은 값을 배열로 전달한다
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== 'production'
// });

// export default store;
export default reducers;