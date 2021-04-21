const workspaceReducer = (state ={ workspaces: [], selected_workspace: null, target: null, workspace_chatrooms: [], selected_workspace_user: null, recently_added_workspace: null }, action) => {
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
                selected_workspace: action.workspace
            }
        case 'SET_WORKSPACE_USER':
            return{
                ...state,
                selected_workspace_user: action.user
            }
        case 'SELECT_TARGET':
            return{
                ...state,
                target: action.target
            }
        case 'SET_CHATROOMS':
            return{
                ...state,
                workspace_chatrooms: action.workspace_chatrooms
            }
        case 'ADD_CHATROOM':
            return{
                ...state,
                workspace_chatrooms: [...state.workspace_chatrooms, action.chatroom]
            }
        case 'SET_RECENT':
            return{
                ...state,
                recently_added_workspace: action.workspace
            }
        default:
            return state
    }
}

export default workspaceReducer