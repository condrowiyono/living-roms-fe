import * as types from './tmdbTypes'

export default {
  [types.TMDB_SEARCH_MOVIE] (state) {
    state.isSearching = true
    state.searchingError = null
  },

  [types.TMDB_SEARCH_MOVIE_SUCCESS] (state, data) {
    state.isSearching = false
    state.results = data.data
  },

  [types.TMDB_SEARCH_MOVIE_ERROR] (state, error) {
    state.isSearching = false
    state.searchingError = error
  },

  [types.TMDB_MOVIE_DETAIL] (state) {
    state.isFetchingDetail = true
    state.fetchingDetailError = null
  },

  [types.TMDB_MOVIE_DETAIL_SUCCESS] (state, data) {
    state.isFetchingDetail = false
    state.movieDetail = data.data
  },

  [types.TMDB_MOVIE_DETAIL_ERROR] (state, error) {
    state.isFetchingDetail = false
    state.fetchingDetailError = error
  },

  [types.TMDB_MOVIE_IMAGE] (state) {
    state.isFetchingDetail = true
    state.fetchingDetailError = null
  },

  [types.TMDB_MOVIE_IMAGE_SUCCESS] (state, data) {
    state.isFetchingDetail = false
    state.movieImage = data.data
  },

  [types.TMDB_MOVIE_IMAGE_ERROR] (state, error) {
    state.isFetchingDetail = false
    state.fetchingDetailError = error
  }
}
