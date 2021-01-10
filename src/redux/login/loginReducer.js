import { USER_LOGIN_REQUEST, USER_LOGOUT_REQUEST } from "./loginType";

const loginState = {
  login: false,
}

const logdinUser = (state = loginState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: return {
      login: true
    }
    case USER_LOGOUT_REQUEST: return {
      login: false
    }
    default: return state
  }
}

export default logdinUser;