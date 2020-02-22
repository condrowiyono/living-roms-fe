import state from './authState'
import getters from './authGetters'
import actions from './authActions'
import mutations from './authMutations'
import { authService } from '@/services'

export default {
  state,
  getters,
  mutations,
  actions: actions({ authService })
}
