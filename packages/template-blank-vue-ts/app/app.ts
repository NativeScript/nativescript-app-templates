import Vue from 'nativescript-vue'
import Home from './components/Home.vue'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === 'production'

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()
