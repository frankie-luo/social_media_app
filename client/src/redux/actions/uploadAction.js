import * as uploadAPI from '../APIs/uploadRequest'

export const uploadImage = data => async dispatch => {
    try {
        await uploadAPI.uploadImage(data)
    } catch (error) {
        console.log(error)
    }
}

export const uploadPost = data => async (dispatch) => {
    dispatch({ type: "UPLOAD_START" });
    try {
      const newPost = await uploadAPI.uploadPost(data);
      dispatch({ type: "UPLOAD_SUCCESS", payload: newPost.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "UPLOAD_FAIL" });
    }
}