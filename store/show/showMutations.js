import * as types from './showTypes'

export default {
  [types.FETCH_SHOWS] (state) {
    state.isFetchingShow = true
    state.fetchingShowError = null
  },

  [types.FETCH_SHOWS_SUCCESS] (state, data) {
    state.isFetchingShow = false
    state.shows = data.data
    state.meta = data.meta
  },

  [types.FETCH_SHOWS_ERROR] (state, error) {
    state.isFetchingShow = false
    state.fetchingShowError = error
  },

  [types.FETCH_SHOW] (state) {
    state.isFetchingShow = true
    state.fetchingShowError = null
  },

  [types.FETCH_SHOW_SUCCESS] (state, data) {
    state.isFetchingShow = false
    state.show = data.data
  },

  [types.FETCH_SHOW_ERROR] (state, error) {
    state.isFetchingShow = false
    state.fetchingShowError = error
  }
}
