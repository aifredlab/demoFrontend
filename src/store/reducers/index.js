// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import chatHistory from './chatHistory';
import auth from './auth';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, chatHistory, auth });

export default reducers;
