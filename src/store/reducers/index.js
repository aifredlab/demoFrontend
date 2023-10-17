// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import chatHistory from './chatHistory';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, chatHistory });

export default reducers;
