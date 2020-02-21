import state from './sampleLinkState'
import getters from './sampleLinkGetters'
import actions from './sampleLinkActions'
import mutations from './sampleLinkMutations'
import { sampleLinkService } from '@/services'

export default {
  state,
  getters,
  mutations,
  actions: actions({ sampleLinkService })
}
