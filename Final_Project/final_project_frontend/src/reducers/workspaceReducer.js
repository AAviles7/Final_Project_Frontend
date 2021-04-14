const workspaceReducer = (state ={ workspaces: [], selected_workspace: null, target: null, target_data: [] }, action) => {
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
        case 'SELECT_TARGET':
            return{
                ...state,
                target: action.target
            }
        case 'GET_DATA':
            return{
                ...state,
                target_data: action.data
            }
        default:
            return state
    }
}

export default workspaceReducer