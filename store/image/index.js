import { imageService } from '@/services'
import state from './imageState'
import getters from './imageGetters'
import actions from './imageActions'
import mutations from './imageMutations'

export default {
  state,
  getters,
  mutations,
  actions: actions({ imageService })
}
