import * as userAPI from '../APIs/userRequest'

export const updateUser = (id, updates) => async dispatch => {
    dispatch({type: 'UPDATE_START'})
    try {
        const {data} = await userAPI.updateUser(id, updates)
        dispatch({type: 'UPADTE_SUCCESS', payload: data})
    }
    catch (error) {
        dispatch({type: 'UPDATE_FAIL'})
    }
}

export const followUser = (id, data) => async dispatch => {
    dispatch({type: 'FOLLOW_USER', payload: id})
    userAPI.followUser(id, data)
}

export const unfollowUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "UNFOLLOW_USER", payload: id})
    userAPI.unfollowUser(id, data)
}