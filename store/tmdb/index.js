import { tmdbService } from '@/services'
import state from './tmdbState'
import getters from './tmdbGetters'
import actions from './tmdbActions'
import mutations from './tmdbMutations'

export default {
  state,
  getters,
  mutations,
  actions: actions({ tmdbService })
}
