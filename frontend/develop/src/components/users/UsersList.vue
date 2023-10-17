<template>
    <div class="reon-mailer-users-page__list">
        <users-item 
            v-for="[key, user] in users" :key="key"
            :user="user"
        />
    </div>
</template>

<script>
import UsersItem from './UsersItem.vue';

export default {
    computed: {
        users() {
            return this.$store.getters['users/getUsers']
        }
    },
    components: { UsersItem }
}
</script>

<style></style>