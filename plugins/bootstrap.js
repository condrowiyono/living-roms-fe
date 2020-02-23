import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueToast from 'vue-toast-notification'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueToast, {
  position: 'top'
})
