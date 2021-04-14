const channelReducer = ( state = { selected: null }, action) => {
    switch(action.type){
        case 'SELECT_CHANNEL':
            return{
                ...state,
                selected: action.channel
            }
        default:
            return state
    }
}

export default channelReducer