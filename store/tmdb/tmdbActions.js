import * as types from './tmdbTypes'

export default ({ tmdbService }) => ({
  async [types.TMDB_SEARCH_MOVIE] ({ commit }, query = {}) {
    commit(types.TMDB_SEARCH_MOVIE)

    try {
      const data = await tmdbService.searchMovie(query)

      commit(types.TMDB_SEARCH_MOVIE_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.TMDB_SEARCH_MOVIE_ERROR, error)
    }
  },

  async [types.TMDB_MOVIE_DETAIL] ({ commit }, id = null) {
    commit(types.TMDB_MOVIE_DETAIL)

    try {
      const data = await tmdbService.getMovieDetail(id)

      commit(types.TMDB_MOVIE_DETAIL_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.TMDB_MOVIE_DETAIL_ERROR, error)
    }
  },

  async [types.TMDB_MOVIE_IMAGE] ({ commit }, query) {
    commit(types.TMDB_MOVIE_IMAGE)

    try {
      const data = await tmdbService.getMovieImage(query)

      commit(types.TMDB_MOVIE_IMAGE_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.TMDB_MOVIE_IMAGE_ERROR, error)
    }
  }
})
