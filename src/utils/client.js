import { create } from 'apisauce'

const apiClient = create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})

export default apiClient

export const setAuthHeader = (token) => {
  if (token) {
    apiClient.setHeader('x-auth-token', token)
    postClient.setHeader('x-auth-token', token)
  } else {
    apiClient.deleteHeader('x-auth-token')
    postClient.deleteHeader('x-auth-token')
  }
}

export const postClient = create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
