import * as types from './sampleLinkTypes'

export default ({ sampleLinkService }) => ({
  async [types.FETCH_SAMPLE_LINKS] ({ commit }, query = {}) {
    commit(types.FETCH_SAMPLE_LINKS)

    try {
      const data = await sampleLinkService.getSampleLinks(query)

      commit(types.FETCH_SAMPLE_LINKS_SUCCESS, data)

      return [ ...data ]
    } catch (error) {
      commit(types.FETCH_SAMPLE_LINKS_ERROR, error)
    }
  }
})
