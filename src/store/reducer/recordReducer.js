import {
  ADD_RECORD,
  POST_LOADING,
  GET_ALLRECORDS,
  GET_REPORT,
} from '../actions/types'

const initialState = {
  records: [],
  reports: [],
  loading: false,
}

export default function recordReducer(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GET_ALLRECORDS:
      return {
        ...state,
        records: action.payload,
        loading: false,
      }
    case ADD_RECORD:
      return {
        ...state,
        records: [action.payload, ...state.records],
      }
    case GET_REPORT:
      return {
        ...state,
        reports: action.payload,
      }
    default:
      return state
  }
}
