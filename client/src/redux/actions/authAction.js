import * as authAPI from '../APIs/authRequest'

export const logIn = userAuthData => async dispatch => {
    dispatch({type: 'AUTH_START'})

    try {
        const {data} = await authAPI.logIn(userAuthData)
        dispatch({type: 'AUTH_SUCCESS', payload: data})
    }
    catch (error) {
        console.log(error)
        dispatch({type: 'AUTH_FAIL'})
    }
}

export const signUp = userAuthData => async dispatch => {
    dispatch({type: 'AUTH_START'})

    try {
        const {data} = await authAPI.signUp(userAuthData)
        dispatch({type: 'AUTH_SUCCESS', payload: data})
    }
    catch (error) {
        console.log(error)
        dispatch({type: 'AUTH_FAIL'})
    }
}

export const logOut = () => async dispatch => {
    dispatch({type: 'LOG_OUT'})
}