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
  }
})
