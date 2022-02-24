import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import postReducer from './postReducer'
import recordReducer from './recordReducer'
import requestReducer from './requestReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  post_data: postReducer,
  record_data: recordReducer,
  request_data: requestReducer,
})

export default rootReducer
