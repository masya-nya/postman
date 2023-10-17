import { createApp } from 'vue'
import { quillEditor } from 'vue3-quill'
import { store } from './store/store.js'
import SendWindow from './SendWindow.vue'
import naive from 'naive-ui'
import global from './components/UI/global.js'
import './styles/style-main.vue'
import * as Quill from 'quill';

const APP = createApp(SendWindow)

let AlignStyle = Quill.import('attributors/style/align');
let FontStyle = Quill.import('attributors/style/font');
Quill.register(AlignStyle, true);
Quill.register(FontStyle, true);

global.forEach(component => {
    APP.component(component.name, component)
})

APP
    .use(store)
    .use(naive)
    .component('QuillEditor', quillEditor)
    .mount('.reon-mailer-sender')
