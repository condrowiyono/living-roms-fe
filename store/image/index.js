import state from './imageState'
import getters from './imageGetters'
import actions from './imageActions'
import mutations from './imageMutations'
import { imageService } from '@/services'

export default {
  state,
  getters,
  mutations,
  actions: actions({ imageService })
}
