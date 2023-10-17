import { createApp } from 'vue';
import { store } from './store/store.js';
import { quillEditor } from 'vue3-quill';
import SettingsWindow from './SettingsWindow.vue';
import OptionsWindow from './OptionsWindow.vue';
import SendWindow from './SendWindow.vue';
import DpSettings from './DpSettings.vue';
import global from './components/UI/global';
import naive from 'naive-ui';
import * as Quill from 'quill';
import settingREON from './utils/amoSettings';
import sendWindow from './utils/sendWindow';

let AlignStyle = Quill.import('attributors/style/align');
let FontStyle = Quill.import('attributors/style/font');
Quill.register(AlignStyle, true);
Quill.register(FontStyle, true);

const Widget = {

    async render(self, Reon, utilsFunc) {
        Reon.VUE.APP = {};
        Reon.VUE.SEND = {};
        const { openMailerWindow, openSendModal } = utilsFunc;
        const leftMenuBody = document.querySelector('.left-menu[id="left_menu"]')

        async function openOptionsModalFunc(e) {
            const payStatus = await utilsFunc.checkPayStatus();
            if (payStatus.isActive) {
                e.preventDefault()
                if (Reon.optionsWindowRun === false) {
                    if ('unmount' in Reon.VUE.APP) {
                        Reon.VUE.APP.unmount()
                    }
                    openMailerWindow()
                    Reon.VUE.APP = createApp(OptionsWindow)
                    global.forEach(component => {
                        Reon.VUE.APP.component(component.name, component)
                    })
                    Reon.VUE.APP.config.globalProperties.$self = self;
                    Reon.VUE.APP.config.globalProperties.$Reon = Reon;
                    Reon.VUE.APP.config.globalProperties.$utils = utilsFunc;
                    Reon.VUE.APP
                        .use(quillEditor)
                        .use(store)
                        .use(naive)
                        .mount(`#reon-mailer`)
                    Reon.optionsWindowRun = true;
                }
            } else {
                utilsFunc.createRejectModal();
            }
        }

        sendWindow.createCardLocation(self);


        const openSettingsModalBtn = document.querySelector('.reon-mailer-card-location__btn-settings');
        openSettingsModalBtn.addEventListener('click', openOptionsModalFunc);
        const openSendModalBtn = document.querySelector('.reon-mailer-card-location__btn-open');
        openSendModalBtn.addEventListener('click', async () => {
            const payStatus = await utilsFunc.checkPayStatus();
            if (payStatus.isActive) {
                if (Reon.sendModalRun === false) {
                    if ('unmount' in Reon.VUE.SEND) {
                        Reon.VUE.SEND.unmount()
                    }
                    openSendModal()
                    Reon.VUE.SEND = createApp(SendWindow)
                    global.forEach(component => {
                        Reon.VUE.SEND.component(component.name, component)
                    })
                    Reon.VUE.SEND.config.globalProperties.$self = self;
                    Reon.VUE.SEND.config.globalProperties.$Reon = Reon;
                    Reon.VUE.SEND.config.globalProperties.$utils = utilsFunc;
                    Reon.VUE.SEND
                        .use(quillEditor)
                        .use(store)
                        .use(naive)
                        .mount(`#reon-mailer-sender`)
                    Reon.sendModalRun = true;
                }
            } else {
                utilsFunc.createRejectModal();
            }
        })

        Reon.GLOBAL_OBSERVERS.waitOpenSideBar = new MutationObserver(() => {
            if (document.querySelector('.aside-hover-emails')) {
                const asideMailList = document.querySelector('.aside-hover-emails .aside__list')
                const checkOpenButtonInstance = asideMailList.querySelector('#reon-mailer__open')
                if (!checkOpenButtonInstance) {
                    asideMailList.insertAdjacentHTML('afterbegin', `
                        <li class="aside__list-item reon-mailer__open" id="reon-mailer__open" title="Письма 2.0">
                            <a href="#" class="aside__list-item-link reon-mailer__open__link">
                                Письма 2.0
                            </a>
                        </li`);
                    const mailerOpen = document.querySelector('#reon-mailer__open');
                    mailerOpen.addEventListener('click', openOptionsModalFunc);
                }
            }
        })
        Reon.GLOBAL_OBSERVERS.waitOpenSideBar.observe(leftMenuBody, {
            childList: true
        })
        return true;
    },

    init() {
        return true;
    },

    bind_actions() {
        return true;
    },

    settings(self, Reon, utilsFunc) {
        settingREON.createRootContainer();
        settingREON.hideSystemFields();
        settingREON.createFooter();

        Reon.VUE.SETTINGS = createApp(SettingsWindow);
        Reon.VUE.SETTINGS.config.globalProperties.$self = self;
        Reon.VUE.SETTINGS.config.globalProperties.$Reon = Reon;
        Reon.VUE.SETTINGS.config.globalProperties.$utils = utilsFunc;
        Reon.VUE.SETTINGS
            .use(store)
            .use(naive)
            .mount(`#reon-mailer-settings-body`);
    },
    advancedSettings() {
        return true;
    },
    dpSettings(self, Reon, utilsFunc) {
        const dpFormSettings = document.querySelector('.task-edit__body__form');
        dpFormSettings.style.display = 'none';

        const dpFormGroup = document.querySelector('.form-group');
        const dpWidgetContainer = document.createElement("div");
        dpWidgetContainer.id = 'reon-mailer-dp-settings-body';

        dpFormGroup.after(dpWidgetContainer);
        Reon.VUE.DP = createApp(DpSettings);
        Reon.VUE.DP.config.globalProperties.$self = self;
        Reon.VUE.DP.config.globalProperties.$Reon = Reon;
        Reon.VUE.DP.config.globalProperties.$utils = utilsFunc;
        Reon.VUE.DP
            .use(store)
            .mount(`#reon-mailer-dp-settings-body`)
        return true;
    },
    onSave(self) {
        const settings = self.get_settings();
        const userNameInputSetting = document.querySelector('input[name="client_name"]');
        const phoneNumberInput = document.querySelector('input[name="phone_number"]');
        const termsOfUseField = document.querySelector(`input[name="terms_of_use"]`);
        const accountId = AMOCRM.constant("account").id;
        const enumId = 1071443;
        fetch("https://vds2151841.my-ihor.ru/informer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: userNameInputSetting.value,
                userPhone: phoneNumberInput.value,
                account: String(accountId),
                widgetName: 'Виджет "Письма 2.0" от REON',
                termsOfUse: termsOfUseField.value,
                enumId: enumId,
                accountSubdomain: self.system().subdomain,
                widgetStatus: settings.active,
                client_uuid: settings.oauth_client_uuid,
            })
        })

        return true;
    },

    destroy() {
        return true;
    }
};

export default Widget;
