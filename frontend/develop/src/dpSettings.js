import { createApp } from 'vue';
import DpSettings from './DpSettings.vue';
import { store } from './store/store.js';

const APP = createApp(DpSettings);

APP
    .use(store)
    .mount('.reon-mailer-dp-settings-body')
