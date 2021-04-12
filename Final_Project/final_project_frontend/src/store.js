import { createStore } from 'redux';

import workspaceReducer from './reducers/workspaceReducer'

export default createStore(
    workspaceReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    
);