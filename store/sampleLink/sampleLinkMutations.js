import * as types from './sampleLinkTypes'

export default {
  [types.FETCH_SAMPLE_LINKS] (state) {
    state.isFetchingSampleLink = true
    state.fetchingSampleLinkError = null
  },

  [types.FETCH_SAMPLE_LINKS_SUCCESS] (state, data) {
    state.isFetchingSampleLink = false
    state.sampleLinks = [...data]
  },

  [types.FETCH_SAMPLE_LINKS_ERROR] (state, error) {
    state.isFetchingSampleLink = false
    state.fetchingSampleLinkError = error
  }
}
