<template>
    <div v-if="isUserShow" class="reon-mailer-users-page__item reon-mailer-users-user" :amo-user-id="user.id">
        <div class="reon-mailer-users-user--left">
            <span class="reon-mailer-users-user__name" :title="user.group_name">
                {{ user.title }} 
                <span v-if="user.group !== corporateMailsId" class="reon-mailer-users-user__group-name">({{ user.group_name }})</span> 
            </span>
            <span
                @click="addNewEmail"
                class="reon-mailer-users-user__add"
            >{{ newEmailOpenStatus ? 'Отмена' : 'Добавить ящик' }}</span>
            <user-email-adding
                v-if="newEmailOpenStatus"
                :email="newEmail"
                :userId="user.id"
                :userTitle="user.title"
                @saveButton="saveNewEmail"
                :deleteBtn="true"
            />
        </div>
        <div class="reon-mailer-users-user--right">
            <span class="reon-mailer-users-user__void-list"
                v-if="!user.emails.length"
            >Список пуст</span>
            <user-email
                v-else
                v-for="email in user.emails" :key="email.mailUuid"
                :email="email"
                :user="user"
            />
        </div>
    </div>
</template>

<script>
import UserEmail from './UserEmail.vue';
import UserEmailAdding from './UserEmailAdding.vue';
import { v4 as uuid } from 'uuid'
import consts from '../../consts/consts';

export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            newEmailOpenStatus: false,
            newEmail: {
                isVerify: false,
                login: '',
                from: '',
                password: '',
                smtpPort: '',
                smtpServ: '',
                isCorporative: this.user.id === consts.corporateMailsId ? true : false,
                mailUuid: uuid(),
                corporateMailsId: consts.corporateMailsId
            }
        }
    },
    computed: {
        isUserShow() {
            const { id, isAdmin } = this.$store.getters['getCurrentAmoUser']
            return (id == this.user.id || isAdmin)
        }
    },
    methods: {
        addNewEmail() {
            this.newEmailOpenStatus = !this.newEmailOpenStatus
        },
        async saveNewEmail(email) {
            this.$store.dispatch('users/newEmail', { email: {...email, isVerify: true}, userId: this.user.id, title: this.user.title })
            this.newEmailOpenStatus = false;
        }
    },
    components: { UserEmail, UserEmailAdding }
}
</script>

<style scoped>
.reon-mailer-users-user__void-list {
    border: 1px solid #ccc;
    border-radius: 15px;
    color: rgb(151, 151, 151);
    text-align: center;
    display: inline-block;
    padding: 2px 10px 5px 10px;
}
</style>