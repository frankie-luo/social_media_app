const defaultState = { userAuthData: null, loading: false, error: false, updating: false }

const authReducer = (state = defaultState, action) => {
    const { type, payload } = action

    switch(type) {
        case 'AUTH_START': return {...state, loading: true, error: false}

        case 'AUTH_SUCCESS': 
            localStorage.setItem('userAuthData', JSON.stringify({...payload}))
            return {...state, userAuthData: payload, loading: false, error: false}
        
        case 'AUTH_FAIL': return {...state, loading: false, error: true}

        case 'UPDATE_START': return {...state, updating: true, error: false}

        case 'UPADTE_SUCCESS': 
            localStorage.setItem('userAuthData', JSON.stringify({...payload}))
            return {...state, userAuthData: payload, updating: false, error: false}

        case 'UPDATE_FAIL': return {...state, updating: false, error: true}

        case "FOLLOW_USER":
            return {...state, userAuthData: {...state.userAuthData, following: [...state.userAuthData.following, payload]}}
    
        case "UNFOLLOW_USER":
            return {...state, userAuthData: {...state.userAuthData, following: [...state.userAuthData.following.filter(i => i !== payload)]}}

        case 'LOG_OUT':
            localStorage.clear()
            return {...state, userAuthData: null, loading: false, error: false}
        default: return state
    }
}

export default authReducer