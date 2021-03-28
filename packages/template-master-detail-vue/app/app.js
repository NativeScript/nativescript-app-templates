import { firebase } from '@nativescript/firebase'
import config from './shared/firebase-config'

import Vue from 'nativescript-vue'

import RadListView from 'nativescript-ui-listview/vue'
import cars from './shared/cars/car-service'

import CarList from './components/CarList'
import CarDetails from './components/CarDetails'
import CarDetailsEdit from './components/CarDetailsEdit'

Vue.use(RadListView)

Vue.config.silent = TNS_ENV === 'production'

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

    created() {
        firebase.init(config).then(
            (instance) => {
                console.log('firebase.init done')

                cars.load().then((data) => {
                    this.cars = Object.values(data)
                })
            },
            (error) => {
                console.log(`firebase.init error: ${error}`)
            }
        )
    },
}).$start()
