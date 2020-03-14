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
  },

  [types.IMAGE_SEARCH_GOOGLE] (state) {
    state.isSearching = true
    state.searchingError = null
  },

  [types.IMAGE_SEARCH_GOOGLE_SUCCESS] (state, data) {
    state.isSearching = false
    state.google = data.data
  },

  [types.IMAGE_SEARCH_GOOGLE_ERROR] (state, error) {
    state.isSearching = false
    state.searchingError = error
  },

  [types.RESET_IMAGE_RESULT_GOOGLE] (state) {
    state.goole = []
  },

  [types.IMAGE_UPLOAD] (state) {
    state.isUploadingImage = true
    state.uploadingImageError = null
  },

  [types.IMAGE_UPLOAD_SUCCESS] (state, data) {
    state.isUploadingImage = false
    state.duckduckgo = data.data
  },

  [types.IMAGE_UPLOAD_ERROR] (state, error) {
    state.isUploadingImage = false
    state.uploadingImageError = error
  }
}
