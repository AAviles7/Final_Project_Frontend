const channelReducer = ( state = { channels: [], selected: null }, action) => {
    switch(action.type){
        case 'GET_CHANNELS':
            return{
                ...state,
                channels: action.channels
            }
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