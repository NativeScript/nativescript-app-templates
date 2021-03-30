import { firebase } from '@nativescript/firebase'

import Vue from 'nativescript-vue'

import RadListView from 'nativescript-ui-listview/vue'
import cars from './shared/cars/car-service'

import CarList from './components/CarList'
import CarDetails from './components/CarDetails'
import CarDetailsEdit from './components/CarDetailsEdit'

Vue.use(RadListView)

Vue.config.silent = !__DEV__

new Vue({
  template: `
        <Frame>
            <CarList :cars="cars" />
        </Frame>`,

  components: {
    CarList,
    CarDetails,
    CarDetailsEdit,
  },

  data: {
    cars: [],
  },

}).$start()
