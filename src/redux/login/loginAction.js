
import { USER_LOGIN_REQUEST, USER_LOGOUT_REQUEST } from "./loginType";

const logdinUserRequest = () => {
  return {
    type: USER_LOGIN_REQUEST
  }
}

export const logdin = () => {
  return (dispatch) => {
    dispatch(logdinUserRequest);
  }
}