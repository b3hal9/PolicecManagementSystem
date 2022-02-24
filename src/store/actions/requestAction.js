import apiClient from '../../utils/client'
import { GET_ERRORS, GET_REQUEST, SET_REQUEST } from './types'

export const getEmergencyRequest = () => async (dispatch) => {
  const response = await apiClient.get('/allrequests')
  if (response.ok) {
    return dispatch({
      type: GET_REQUEST,
      payload: response.data,
    })
  }
  return dispatch({
    type: GET_ERRORS,
    payload: response.data,
  })
}

export const setEmergencyRequest = (data) => async (dispatch) => {
  return dispatch({
    type: SET_REQUEST,
    payload: data,
  })
}
