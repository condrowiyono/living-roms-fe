import * as types from './movieTypes'

export default {
  [types.FETCH_MOVIES] (state) {
    state.isFetchingMovie = true
    state.fetchingMovieError = null
  },

  [types.FETCH_MOVIES_SUCCESS] (state, data) {
    state.isFetchingMovie = false
    state.movies = data.data
    state.meta = data.meta
  },

  [types.FETCH_MOVIES_ERROR] (state, error) {
    state.isFetchingMovie = false
    state.fetchingMovieError = error
  },

  [types.FETCH_MOVIE] (state) {
    state.isFetchingMovie = true
    state.fetchingMovieError = null
  },

  [types.FETCH_MOVIE_SUCCESS] (state, data) {
    state.isFetchingMovie = false
    state.movie = data.data
  },

  [types.FETCH_MOVIE_ERROR] (state, error) {
    state.isFetchingMovie = false
    state.fetchingMovieError = error
  },

  [types.CREATE_MOVIE] (state) {
    state.isCreatingMovie = true
    state.creatingMovieError = null
  },

  [types.CREATE_MOVIE_SUCCESS] (state) {
    state.isCreatingMovie = false
  },

  [types.CREATE_MOVIE_ERROR] (state, error) {
    state.isCreatingMovie = false
    state.creatingMovieError = error
  }
}
