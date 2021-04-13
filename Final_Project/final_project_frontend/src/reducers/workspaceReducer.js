const workspaceReducer = (state ={ workspaces: [], selected: null }, action) => {
    switch(action.type){
        case 'GET_WORKSPACES':
            return{
                ...state,
                workspaces: action.workspaces
            }
        case 'ADD_WORKSPACE':
            return{
                ...state,
                workspaces: [...state.workspaces, action.workspace]
            }
        case 'GET_SELECTED':
            return{
                ...state,
                selected: action.workspace
            }
        default:
            return state
    }
}

export default workspaceReducer