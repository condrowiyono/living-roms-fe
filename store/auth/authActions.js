import * as types from './authTypes'

export default ({ authService }) => ({
  async [types.LOGIN] ({ commit }, payload = {}) {
    commit(types.LOGIN)

    try {
      const data = await authService.login(payload)

      commit(types.LOGIN_SUCCESS, data)
    } catch (error) {
      commit(types.LOGIN_ERROR, error)
    }
  },

  async [types.GET_ME] ({ commit }) {
    commit(types.GET_ME)

    try {
      const data = await authService.me()

      commit(types.GET_ME_SUCCESS, data)
    } catch (error) {
      commit(types.GET_ME_ERROR, error)
    }
  },

  [types.LOGOUT] ({ commit }) {
    commit(types.LOGOUT)
  }
})
