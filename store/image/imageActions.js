import * as types from './imageTypes'

export default ({ imageService }) => ({
  async [types.IMAGE_SEARCH_DUCKDUCKGO] ({ commit }, query = {}) {
    commit(types.IMAGE_SEARCH_DUCKDUCKGO)

    try {
      const data = await imageService.duckduckgo(query)

      commit(types.IMAGE_SEARCH_DUCKDUCKGO_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.IMAGE_SEARCH_DUCKDUCKGO_ERROR, error)
    }
  },

  [types.RESET_IMAGE_RESULT_DUCKDUCKGO] ({ commit }) {
    commit(types.RESET_IMAGE_RESULT_DUCKDUCKGO)
  },

  async [types.IMAGE_SEARCH_GOOGLE] ({ commit }, query = {}) {
    commit(types.IMAGE_SEARCH_GOOGLE)

    try {
      const data = await imageService.google(query)

      commit(types.IMAGE_SEARCH_GOOGLE_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.IMAGE_SEARCH_GOOGLE_ERROR, error)
    }
  },

  [types.RESET_IMAGE_RESULT_GOOGLE] ({ commit }) {
    commit(types.RESET_IMAGE_RESULT_GOOGLE)
  },

  async [types.IMAGE_UPLOAD] ({ commit }, file = {}) {
    commit(types.IMAGE_UPLOAD)

    try {
      const data = await imageService.upload(file)

      commit(types.IMAGE_UPLOAD_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.IMAGE_UPLOAD_ERROR, error)
    }
  }
})
