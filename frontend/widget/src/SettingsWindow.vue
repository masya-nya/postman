<template>
    <div class="reon-mailer-settings">
        <nav>
            <ul class="reon_widget_settings-nav">
                <li 
                    :class="{ active: currentPage === tabs.settings, ['reon_widget_settings-nav-item']: true}"
                    @click="currentPage = tabs.settings">
                    <h2>Настройки</h2>
                </li>
                <li 
                    :class="{ active: currentPage === tabs.users, ['reon_widget_settings-nav-item']: true}"
                    @click="currentPage = tabs.users">
                    <h2>Права администратора</h2>
                </li>
                <li 
                    :class="{ active: currentPage === tabs.subscription, ['reon_widget_settings-nav-item']: true}"
                    @click="currentPage = tabs.subscription">
                    <h2>Подписка</h2>
                </li>
            </ul>
        </nav>
        <div v-show="currentPage === tabs.settings">
            <settings-tab></settings-tab>
        </div>
        <div v-show="currentPage === tabs.users">
            <users-tab></users-tab>
        </div>
        <div v-show="currentPage === tabs.subscription">
            <subscription-tab></subscription-tab>
        </div>
    </div>
</template>

<script>
import SettingsMenu from './components/settings/SettingsMenu.vue';
import SettingsTab from './components/settings/SettingsTab.vue';
import UsersTab from './components/settings/UsersTab.vue';
import SubscriptionTab from './components/settings/SubscriptionTab.vue';
import consts from './consts/consts.js';
const { settingAmoFieldsName } = consts;

export default {
    data() {
        return {
           tabs: {
                settings: 'settings',
                users: 'users',
                subscription: 'subscription'
            },
           currentPage: 'settings'
        }
    },
    methods: {


    },
    beforeMount() {
        const optionsSaveBtn = document.querySelector('.js-widget-save');
        optionsSaveBtn.addEventListener('mousedown', () => {
            const accessUsersList = this.$store.getters['usersRights/getCheckedUsersList']
            const settingInput = document.querySelector(`[name="${settingAmoFieldsName.users_rights}"]`)
            settingInput.value = JSON.stringify(accessUsersList)
        })
    },
    components: { SettingsMenu, SettingsTab, UsersTab, SubscriptionTab }
}
</script>

<style scoped>
.reon_widget_settings-nav {
    display: flex;
    margin-bottom: 15px;
}

.reon_widget_settings-nav-item {
    width: 100%;
    text-transform: uppercase;
    text-align: center;
    padding: 12px 0;
    cursor: pointer;
    position: relative;
    background: #fff;
    color: #92989B;
    transition: all 0.1s ease-in-out;
    border-bottom: 3px solid rgba(0, 0, 0, 0);
}

.active {
    border-bottom: 3px solid #4c8bf7;
    color: #2e3640;
}
</style>