import Vue from 'nativescript-vue'
import RadListView from 'nativescript-ui-listview/vue'

Vue.use(RadListView)

import App from './components/App'

Vue.config.silent = !__DEV__

new Vue({
  render: h => h(App)
}).$start()
