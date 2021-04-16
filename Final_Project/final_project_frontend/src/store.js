import { createStore, combineReducers } from 'redux';

import workspaceReducer from './reducers/workspaceReducer'
import chatroomReducer from './reducers/chatroomReducer'
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    workspace: workspaceReducer,
    chatroom: chatroomReducer,
    user: userReducer
})

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    
);