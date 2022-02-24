import jwtDecode from 'jwt-decode'
import { setCurrentUser } from '../store/actions/authAction'

const autoLogin = async (dispatch, token, Navigate) => {
  const currentTime = Date.now() / 1000
  if (token) {
    //Decode token and get user info and exp
    const decoded = await jwtDecode(token)

    if (decoded.exp < currentTime) {
      await localStorage.removeItem('jwtToken')
      return dispatch(setCurrentUser({}))
    } else {
      //set user and isAUthenticated
      return dispatch(setCurrentUser(decoded))
    }
  }
}

export default autoLogin
