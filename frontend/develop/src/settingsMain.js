import { createApp } from 'vue'
import { store } from './store/store'
import SettingsWindow from './SettingsWindow.vue'
import global from './components/UI/global.js'
import naive from 'naive-ui'
import './styles/style-main.vue'

const APP = createApp(SettingsWindow)

global.forEach(component => {
    APP.component(component.name, component)
})
APP
    .use(store)
    .use(naive)
    .mount('.reon-mailer-setting')
