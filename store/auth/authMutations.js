import * as types from './authTypes'

export default {
  [types.LOGIN] (state) {
    state.isLogin = true
    state.loginError = null
  },

  [types.LOGIN_SUCCESS] (state, data) {
    state.isLogin = false
    state.user = data.user
    state.isLoggedIn = true

    // Set localStorage
    window.localStorage.setItem('token', data.token)
  },

  [types.LOGIN_ERROR] (state, error) {
    state.isLogin = false
    state.loginError = error
  },

  [types.GET_ME] (state) {
    state.isGettingMe = true
    state.gettingMeError = null
  },

  [types.GET_ME_SUCCESS] (state, data) {
    state.isGettingMe = false
    state.user = data
    state.isLoggedIn = true
  },

  [types.GET_ME_ERROR] (state, error) {
    state.isGettingMe = false
    state.gettingMeError = error
  },

  [types.LOGOUT] (state) {
    window.localStorage.removeItem('token')
    state.user = {}
    state.isLoggedIn = false
  }
}
