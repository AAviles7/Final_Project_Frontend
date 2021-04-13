import { createStore, combineReducers } from 'redux';

import workspaceReducer from './reducers/workspaceReducer'
import channelReducer from './reducers/channelReducer'
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    workspace: workspaceReducer,
    channel: channelReducer,
    user: userReducer
})

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    
);