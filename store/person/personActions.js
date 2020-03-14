import * as types from './personTypes'

export default ({ personService }) => ({
  async [types.FETCH_PEOPLE] ({ commit }, query = {}) {
    commit(types.FETCH_PEOPLE)

    try {
      const data = await personService.get(query)

      commit(types.FETCH_PEOPLE_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.FETCH_PEOPLE_ERROR, error)
    }
  }
})
