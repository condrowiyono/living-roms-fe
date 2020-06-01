import { authService } from '@/services'
import state from './authState'
import getters from './authGetters'
import actions from './authActions'
import mutations from './authMutations'

export default {
  state,
  getters,
  mutations,
  actions: actions({ authService })
}
