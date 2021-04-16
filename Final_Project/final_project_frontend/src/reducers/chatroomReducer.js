const chatroomReducer = ( state = {  chatroom: null , chatroom_messages: [] }, action) => {
    switch(action.type){
        case 'SELECT_CHATROOM':
            return{
                ...state,
                chatroom: action.chatroom
            }
        case 'GET_MESSAGES':
            return{
                ...state,
                chatroom_messages: action.chatroom.chatroom_messages
            }
        case 'ADD_MESSAGE':
            return{
                ...state,
                chatroom_messages: [...state.chatroom.chatroom_messages, action.message]
            }
        default:
            return state
    }
}

export default chatroomReducer