import { SET_CURRENT_USER, GET_ERRORS } from './types'
import apiClient from '../../utils/client'
import JwtDecode from 'jwt-decode'

export const LoginHandler = (data, navigate, toast) => async (dispatch) => {
  const endpoint = '/police/login'
  const response = await apiClient.post(endpoint, data)

  if (response.ok) {
    const token = response.data
    //storing token in localStorage
    await localStorage.setItem('jwtToken', token)
    const decoded = await JwtDecode(token)
    //set current user
    await dispatch(setCurrentUser(decoded))
    toast.success('Login Successful')
    return window.location.replace('/')
  } else {
    toast.error(response.data)
    dispatch({
      type: GET_ERRORS,
      payload: response.data,
    })
  }
}

export const RegisterHandler = (data, navigate, toast) => async (dispatch) => {
  const endpoint = '/police/signup'
  const response = await apiClient.post(endpoint, data)
  if (response.ok) {
    navigate('/login', { replace: true })
  } else {
    toast.error(response.data)
    dispatch({
      type: GET_ERRORS,
      payload: response.data,
    })
  }
}

export const handlePasswordReset =
  (data, navigate, toast) => async (dispatch) => {
    const endpoint = '/resetpw'
    const response = await apiClient.post(endpoint, data)
    if (response.ok) {
      toast.success('Email Sent')
      navigate('/resetpage')
    } else {
      toast.error(response.data)
      dispatch({
        type: GET_ERRORS,
        payload: response.data,
      })
    }
  }

export const confirmPasswordReset =
  (data, navigate, toast) => async (dispatch) => {
    const endpoint = '/confirmpw'
    const response = await apiClient.post(endpoint, data)
    if (response.ok) {
      toast.success('Password Changed')
      navigate('/login')
    } else {
      toast.error(response.data)
      dispatch({
        type: GET_ERRORS,
        payload: response.data,
      })
    }
  }
export const saveUserLocation = (data) => async (dispatch) => {
  const token = localStorage.getItem('jwtToken')
  const endpoint = '/save_userLocation'
  apiClient.setHeader('x-auth-token', token)
  const response = await apiClient.put(endpoint, data)
  if (!response.ok) {
    dispatch({
      type: GET_ERRORS,
      payload: response.data,
    })
  }
}

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  }
}

//Logout User
export const Logout = () => async (dispatch) => {
  //remove token from localStorage
  await localStorage.removeItem('jwtToken')
  //set current user to {}
  dispatch(setCurrentUser({}))
  return window.location.replace('/login')
}
