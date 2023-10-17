import { createApp } from 'vue'
import { store } from './store/store'
import { quillEditor } from 'vue3-quill'
import OptionsWindow from './OptionsWindow.vue'
import global from './components/UI/global.js'
import naive from 'naive-ui'
import './styles/style-main.vue'
import * as Quill from 'quill';

const APP = createApp(OptionsWindow)

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
    .mount('.reon-mailer')
