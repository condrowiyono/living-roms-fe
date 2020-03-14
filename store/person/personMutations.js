import * as types from './personTypes'

export default {
  [types.FETCH_PEOPLE] (state) {
    state.isFetchingPerson = true
    state.fetchingPersonError = null
  },

  [types.FETCH_PEOPLE_SUCCESS] (state, data) {
    state.isFetchingPerson = false
    state.people = data.data
    state.meta = data.meta
  },

  [types.FETCH_PEOPLE_ERROR] (state, error) {
    state.isFetchingPerson = false
    state.fetchingPersonError = error
  }
}
