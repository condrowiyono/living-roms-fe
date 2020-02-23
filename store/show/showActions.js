import * as types from './showTypes'

export default ({ showService }) => ({
  async [types.FETCH_SHOWS] ({ commit }, query = {}) {
    commit(types.FETCH_SHOWS)

    try {
      const data = await showService.getShows(query)

      commit(types.FETCH_SHOWS_SUCCESS, data)

      return [ ...data ]
    } catch (error) {
      commit(types.FETCH_SHOWS_ERROR, error)
    }
  },

  async [types.FETCH_SHOW] ({ commit }, id) {
    commit(types.FETCH_SHOW)

    try {
      const data = await showService.getShow(id)

      commit(types.FETCH_SHOW_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.FETCH_SHOW_ERROR, error)
    }
  },

  async [types.CREATE_SHOW] ({ commit }, payload) {
    commit(types.CREATE_SHOW)

    try {
      const data = await showService.create(payload)

      commit(types.CREATE_SHOW_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.CREATE_SHOW_ERROR, error)
    }
  }
})
