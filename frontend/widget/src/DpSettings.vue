<template>
    <div class="reon-mailer__dp-settings-wrapper">
        <select-menu 
            v-bind:options="recipientType" 
            v-bind:title="recipientTitle"
            v-bind:hideInputName="'recipient'"
            v-bind:choosenValue="recipientChoosenType"

        ></select-menu>
        <select-menu 
            v-bind:options="userMails" 
            v-bind:title="userMailsTitle"
            v-bind:hideInputName="'sender'"
            v-bind:choosenValue="choosenSender"

        ></select-menu>
        <select-menu 
            v-bind:options="userPatterns" 
            v-bind:title="userPatternsTitle"
            v-bind:hideInputName="'templates'"
            v-bind:choosenValue="choosenTemplate"
        ></select-menu>
        <select-menu 
            v-bind:options="delayDurationType" 
            v-bind:title="delayDurationTitle"
            v-bind:hideInputName="'delayType'"
            v-bind:extraHideInputName="'delayDuration'"
            v-bind:choosenValue="choosenDelayType"
        ></select-menu>
        <select-menu 
            v-bind:options="signatureType" 
            v-bind:title="signatureTitle"
            v-bind:hideInputName="'signature'"
            v-bind:choosenValue="choosenSignatureType"
        ></select-menu>
        
    </div>
</template>


<script>

import SelectMenu from './components/dpsettings/SelectMenu.vue';
import { user } from './mock/accountAmoUsers.js';


export default {
    data() {
        return {
            signatureType: [
                { id: '', option: 'Не выбрана', value: '' },
                { id: 'none', option: 'Нет', value: 'none' },
                { id: 'responsible', option: 'Ответственный за сделку', value: 'responsible' }
            ],
            recipientType: [
                { id: '', option: 'Не выбран', value: '' },
                { id: 'default', option: 'Автоматически', value: 'default' },
                { id: 'main', option: 'Основной контакт', value: 'main' },
                { id: 'all', option: 'Все связанные контакты', value: 'all' },
                { id: 'company', option: 'Связанная компания', value: 'company' }
            ],
            delayDurationType: [
                { id: '', option: 'Не выбран', value: '' },
                { id: 'none', option: 'Нет', value: 'none' },
                { id: 'seconds', option: 'В секундах', value: 'seconds' },
                { id: 'minutes', option: 'В минутах', value: 'minutes' },
                { id: 'hours', option: 'В часах', value: 'hours' },
                { id: 'days', option: 'В днях', value: 'days' },
                { id: 'weeks', option: 'В неделях', value: 'weeks' },
                { id: 'months', option: 'В месяцах', value: 'months' }
            ],
            userPatterns: [
            ],
            userMails: [
            ],
            recipientTitle: 'Получатель письма',
            delayDurationTitle: 'Отложенная отправка',
            userPatternsTitle: 'Шаблон сообщения',
            userMailsTitle: 'Почта',
            signatureTitle: 'Выберите подпись',
            recipientChoosenType: '',
            choosenSender: '',
            choosenTemplate: '',
            choosenDelayType: '',
            choosenSignatureType: ''
        }
    },
    methods: {
        getMailOptons(mails) {
            return mails.map(mail => ({
                id: mail.mailUuid,
                value: mail.mailUuid,
                option: mail.login
            }))
        },
        getPatternOptons(patterns) {
            return patterns.map(pattern => ({
                id: pattern.id,
                value: pattern.id,
                option: pattern.name
            }))
        },
        getChoosenName(id, options) {
            const name  = options.find(option => option.id === id);
            return name.option;
        }
    
    },
    async mounted() {
        try {
            this.$store.commit('send/loadAmoUserInfo', user);

            const patterns = await this.$store.dispatch('send/getUsersPatterns');
            const patternOptions = this.getPatternOptons(patterns);
            this.userPatterns = [{ id: '', option: 'Не выбран', value: '' }, ...patternOptions];

            const mails = await this.$store.dispatch('send/loadUserEmails');
            const mailOptions = this.getMailOptons(mails);
            this.userMails = [{ id: '', option: 'Не выбран', value: '' }, ...mailOptions];

            this.recipientChoosenType =  this.getChoosenName(document.querySelector(`[name=recipient]`).value, this.recipientType);
            this.choosenSender = this.getChoosenName(document.querySelector(`[name=sender]`).value, this.userMails);
            this.choosenTemplate = this.getChoosenName(document.querySelector(`[name=templates]`).value, this.userPatterns);
            this.choosenDelayType = this.getChoosenName(document.querySelector(`[name=delayType]`).value, this.delayDurationType);
            this.choosenSignatureType = this.getChoosenName(document.querySelector(`[name=signature]`).value, this.signatureType);


        } catch (e) {
            return;
        }
    },
    components: {
        SelectMenu
    },
}
</script>

<style scoped>
</style>