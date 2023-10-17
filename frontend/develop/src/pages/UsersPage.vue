<template>
    <div class="reon-mailer-users-page">
        <div class="reon-mailer-users-page__title">
            <input 
                class="reon-mailer-users-page__search" 
                @keydown.enter="searchUsers" 
                :value="getSearchValue" 
                type="text" 
                placeholder="Поиск: введите имя пользователя или группы и нажмите Enter"
            >
        </div>
        <div v-if="isLoad" class="reon-loader">
            <reon-loader
                v-if="!errorStatus"
            />
            <mailer-text-error 
                v-else 
                text="Не удалось подключиться к серверу, обновите страницу или поробуйте позже"
                type="danger"
            />
        </div>

        <users-list 
            v-else
        />
    </div>
</template>

<script>
import UsersList from '../components/users/UsersList.vue'

export default {
    data() {
        return {
            isLoad: true,
            errorStatus: false
        }
    },
    computed: {
        getSearchValue() {
            return this.$store.getters['users/getSearchValue']
        }
    },
    methods: {
        searchUsers(event) {
            this.$store.commit('users/updateSearchValue', event.target.value)
        }
    },
    async beforeCreate() {
        try {
            this.$store.commit('users/loadAmoUsers')
            await this.$store.dispatch('users/getMails')
            this.isLoad = false
        } catch (e) {
            console.log(e)
            this.errorStatus = true;
        }
    },
    components: { UsersList }
}
</script>

<style scoped>
.reon-loader {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>