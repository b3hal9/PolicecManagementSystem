import { GET_REPORT, SET_REQUEST } from '../actions/types'

const initialState = {
  request: [],
  req_info: '',
  loading: false,
}

export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REPORT:
      return {
        ...state,
        request: action.payload,
        loading: false,
      }
    case SET_REQUEST:
      return {
        ...state,
        req_info: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
