import * as postAPI from "../APIs/postRequest"

export const getTimelinePosts = id => async dispatch => {
    dispatch({type: 'RETRIEVING_START'})
    try {
        const {data} = await postAPI.getTimelinePosts(id)
        dispatch({type: 'RETREIVING_SUCCESS', payload: data})
    } catch (error) {
        dispatch({type: 'RETRIEVING_FAIL'})
        console.log(error)
    }
}