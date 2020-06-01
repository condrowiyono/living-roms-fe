import { personService } from '@/services'
import state from './personState'
import getters from './personGetters'
import actions from './personActions'
import mutations from './personMutations'

export default {
  state,
  getters,
  mutations,
  actions: actions({ personService })
}
