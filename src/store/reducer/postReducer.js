import { ADD_POST, POST_LOADING, GET_ALLPOST, DEL_POST } from '../actions/types'

const initialState = {
  posts: [],
  post: {},
  loading: false,
}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GET_ALLPOST:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      }
    case DEL_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload.id),
      }
    default:
      return state
  }
}
