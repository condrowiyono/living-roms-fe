import state from './showState'
import getters from './showGetters'
import actions from './showActions'
import mutations from './showMutations'
import { showService } from '@/services'

export default {
  state,
  getters,
  mutations,
  actions: actions({ showService })
}
