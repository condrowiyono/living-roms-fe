import state from './tmdbState'
import getters from './tmdbGetters'
import actions from './tmdbActions'
import mutations from './tmdbMutations'
import { tmdbService } from '@/services'

export default {
  state,
  getters,
  mutations,
  actions: actions({ tmdbService })
}
