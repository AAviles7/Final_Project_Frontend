const userReducer = (state = { user: null, selected: null }, action) => {
    switch(action.type){
        case 'GET_USER':
            return{
                ...state,
                user: action.user
            }
        case 'LOGOUT_USER':
            return{
                ...state,
                user: null
            }
        case 'SELECT_USER':
            return{
                ...state,
                selected: action.user
            }
        default:
            return state
    }
}

export default userReducer