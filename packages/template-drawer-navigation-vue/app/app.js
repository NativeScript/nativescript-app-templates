import { createApp } from 'nativescript-vue'
import DrawerPlugin from '@nativescript-community/ui-drawer/vue3'

import App from './components/App.vue'

const app = createApp(App)
app.use(DrawerPlugin)
app.start()
