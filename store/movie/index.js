import { movieService } from '@/services'
import state from './movieState'
import getters from './movieGetters'
import actions from './movieActions'
import mutations from './movieMutations'

export default {
  state,
  getters,
  mutations,
  actions: actions({ movieService })
}
