import state from './personState'
import getters from './personGetters'
import actions from './personActions'
import mutations from './personMutations'
import { personService } from '@/services'

export default {
  state,
  getters,
  mutations,
  actions: actions({ personService })
}
