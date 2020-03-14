import state from './movieState'
import getters from './movieGetters'
import actions from './movieActions'
import mutations from './movieMutations'
import { movieService } from '@/services'

export default {
  state,
  getters,
  mutations,
  actions: actions({ movieService })
}
