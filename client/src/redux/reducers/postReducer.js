const defaultState = { posts: [], loading: false, error: false, uploading: false }

const postReducer = (
    state = defaultState,
    action
  ) => {
    const { type, payload } = action
    switch (type) {

      case "UPLOAD_START":
        return { ...state, error: false, uploading: true };
      case "UPLOAD_SUCCESS":
        return { ...state, posts: [payload, ...state.posts], uploading: false, error: false };
      case "UPLOAD_FAIL":
        return { ...state, uploading: false, error: true };

      case "RETREIVING_START":
        return { ...state, loading: true, error: false };
      case "RETREIVING_SUCCESS":
        return { ...state, posts: payload, loading: false, error: false };
      case "RETREIVING_FAIL":
        return { ...state, loading: false, error: true };
      default:
        return state;
    }
  };
  
  export default postReducer