<template>
    <div class="reon-mailer-users-email">
        <div @click="isEditorOpenToggle" class="reon-mailer-users-email__body">
            <div class="reon-mailer-users-email__status">
                <email-status 
                    :verify="email.isVerify"
                />
            </div>
            <div class="reon-mailer-users-email__info">
                <div class="reon-mailer-users-email__email">
                    <span>{{ email.from }}</span>
                </div>
                <div class="reon-mailer-users-email__servers">
                    <span>{{ email.login }}, {{ email.smtpServ }}, {{ email.smtpPort }}</span>
                </div>
            </div>
        </div>
        <div 
            v-if="isEditorOpen"
            class="reon-mailer-users-email__editor">
            <user-email-adding 
                :email="email"
                :userId="user.id"
                @saveButton="saveEmailChanges"
                @deleteButton="deleteEmail"
                :disableLoginChange="email.isVerify"
            />
        </div>
    </div>
</template>

<script>
import EmailStatus from './EmailStatus.vue';
import UserEmailAdding from './UserEmailAdding.vue';

export default {
    props: {
        email: {
            type: Object
        },
        user: {
            type: Object
        }
    },
    data() {
        return {
            isEditorOpen: false
        }
    },
    methods: {
        isEditorOpenToggle() {
            this.isEditorOpen = !this.isEditorOpen
        },
        saveEmailChanges(email) {
            this.$store.dispatch('users/saveEmailChanges', { email: {...email, isVerify: true}, userId: this.user.id, title: this.user.title })
            this.isEditorOpen = false
        },
        deleteEmail(email) {
            this.$store.dispatch('users/deleteEmail', { email, userId: this.user.id })
        }
    },
    components: { UserEmailAdding, EmailStatus }
}
</script>

<style></style>