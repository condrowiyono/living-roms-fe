import * as types from './movieTypes'

export default ({ movieService }) => ({
  async [types.FETCH_MOVIES] ({ commit }, query = {}) {
    commit(types.FETCH_MOVIES)

    try {
      const data = await movieService.getMovies(query)

      commit(types.FETCH_MOVIES_SUCCESS, data)

      return [ ...data ]
    } catch (error) {
      commit(types.FETCH_MOVIES_ERROR, error)
    }
  },

  async [types.FETCH_MOVIE] ({ commit }, id) {
    commit(types.FETCH_MOVIE)

    try {
      const data = await movieService.getMovie(id)

      commit(types.FETCH_MOVIE_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.FETCH_MOVIE_ERROR, error)
    }
  },

  async [types.CREATE_MOVIE] ({ commit }, payload) {
    commit(types.CREATE_MOVIE)

    try {
      const data = await movieService.create(payload)

      commit(types.CREATE_MOVIE_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.CREATE_MOVIE_ERROR, error)
    }
  },

  async [types.DELETE_MOVIE] ({ commit }, id) {
    commit(types.DELETE_MOVIE)

    try {
      await movieService.delete(id)
      commit(types.DELETE_MOVIE_SUCCESS)
    } catch (error) {
      commit(types.DELETE_MOVIE_ERROR, error)
    }
  }
})
