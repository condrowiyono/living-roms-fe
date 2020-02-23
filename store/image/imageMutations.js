import * as types from './imageTypes'

export default {
  [types.IMAGE_SEARCH_DUCKDUCKGO] (state) {
    state.isSearching = true
    state.searchingError = null
  },

  [types.IMAGE_SEARCH_DUCKDUCKGO_SUCCESS] (state, data) {
    state.isSearching = false
    state.duckduckgo = data.data
  },

  [types.IMAGE_SEARCH_DUCKDUCKGO_ERROR] (state, error) {
    state.isSearching = false
    state.searchingError = error
  },

  [types.RESET_IMAGE_RESULT_DUCKDUCKGO] (state) {
    state.duckduckgo = []
  }
}
