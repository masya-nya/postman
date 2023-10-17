<template>
    <div class="reon-mailer__wrapper">
        <div class="reon-mailer__content">
            <side-bar></side-bar>
            <component :is="`${getCurrentPage}-page`"></component>
        </div>
    </div>
</template>

<script>
import { user } from './mock/accountAmoUsers.js';
import SideBar from './components/sidebar/SideBar.vue';
import PatternPage from './pages/PatternPage.vue';
import UsersPage from './pages/UsersPage.vue';
import SignaturePage from './pages/SignaturePage.vue';

export default {
    computed: {
        getCurrentPage() {
            return this.$store.getters['getCurrentPage'] 
        }
    },
    beforeMount() {
        const selfSettings = this.$self.get_settings()
        const admins = Object.values(JSON.parse(selfSettings.users_rights))
        const isAdmin = admins.includes(user.id)
        
        this.$store.commit('updateUserInfo', {...user, isAdmin})
    },
    components: { SideBar, PatternPage, UsersPage, SignaturePage }
}
</script>

<style scoped>
</style>
