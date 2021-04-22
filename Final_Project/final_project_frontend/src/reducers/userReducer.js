const userReducer = (state = { user: null, target_conversation: null, direct_messages: [], conversations: [] }, action) => {
    switch(action.type){
        case 'GET_USER':
            return{
                ...state,
                user: action.user
            }
        case 'UPDATE_USER':
            return{
                ...state,
                user: action.user
            }
        case 'LOGOUT_USER':
            return{
                ...state,
                user: null
            }
        case 'SET_TARGET_CONVERSATION':
            return{
                ...state,
                target_conversation: action.conversation
            }
        case 'GET_DMS':
            return{
                ...state,
                direct_messages: action.conversation.direct_messages
            }
        case 'SET_CONVERSATIONS':
            return{
                ...state,
                conversations: action.conversations
            }
        case 'ADD_DM_MESSAGE':
            return{
                ...state,
                direct_messages: [...state.target_conversation.direct_messages, action.message]
            }
        default:
            return state
    }
}

export default userReducer