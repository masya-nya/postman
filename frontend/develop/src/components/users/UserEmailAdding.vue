<template>
    <div class="reon-mailer-users-editor">
        <div class="reon-mailer-users-editor__body">
            <div class="reon-mailer-users-editor__left">
                <label for="" class="reon-mailer-users-editor__label">От кого</label>
                <div class="reon-mailer-users-editor__container">
                    <div class="reon-mailer-users-editor__from">
                        <n-input
                            v-model:value="emailChanges.from"
                            placeholder="Имя" 
                            :maxlength="50"
                        />
                    </div>
                    <div class="reon-mailer-users-editor__svg">
                        <gmail-svg 
                            @click="autoFillSmtp(mails.gmail)"
                        />
                        <yandex-svg 
                            @click="autoFillSmtp(mails.yandex)"
                        />
                        <mail-svg 
                            @click="autoFillSmtp(mails.mail)"
                        />
                    </div>
                </div>
            </div>
            <div class="reon-mailer-users-editor__rigth">
                <label for="" class="reon-mailer-users-editor__label">SMTP и почта</label>
                <div class="reon-mailer-users-editor__container">
                    <div class="reon-mailer-users-editor__top">
                        <n-input 
                            class="reon-mailer-users-editor__smtpserv"
                            v-model:value="emailChanges.smtpServ"
                            placeholder="Адрес SMTP"
                            :maxlength="30"
                        />
                        <n-input 
                            class="reon-mailer-users-editor__smtpport"
                            v-model:value="emailChanges.smtpPort"
                            :allow-input="onlyAllowNumber"
                            placeholder="Порт"
                            :maxlength="10"
                        />
                    </div>
                    <div class="reon-mailer-users-editor__bottom">
                        <n-input 
                            class="reon-mailer-users-editor__login"
                            @change="emailDuplicateCheck"
                            v-model:value.trim="emailChanges.login"
                            :allow-input="deleteSideSpace"
                            :status=" loginEmailValidate ? '' : 'error'"
                            placeholder="Почта"
                            :maxlength="60"
                            :disabled="disableLoginChange"
                        />
                        <n-input 
                            v-model:value="emailChanges.password"
                            type="password"
                            show-password-on="click"
                            placeholder="Пароль"
                            :maxlength="100"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="reon-mailer-users-editor__btns">
            <div
                v-if="(emailValidate === 'noAccess' || emailValidate === 'wrongData')" 
                class="reon-mailer-users-editor__message">
                    <span v-if="emailValidate === 'noAccess'">Почта с таким email'ом уже прикреплена к этому аккаунту</span>
                    <span v-if="emailValidate === 'wrongData'">Введены неверные данные, инструкцию можно посмотреть <a target="_blank" href="https://drive.google.com/file/d/1f4USZYwKFBIluzYSvvPUtjnbTNHGWa0g/view?usp=sharing">здесь</a></span>
            </div>
            <n-button
                type="primary"
                @click.prevent="saveEmail"
                :disabled="!validationCheck"
            >Сохранить</n-button>
            <n-button
                v-if="!deleteBtn"
                type="error"
                @click.prevent="deleteEmail"
            >Удалить</n-button>
        </div>
    </div>
</template>

<script>
import consts from '../../consts/consts.js'

import GmailSvg from '../../components/icons/GmailIcon.vue';
import YandexSvg from '../../components/icons/YandexIcon.vue';
import MailSvg from '../../components/icons/MailIcon.vue';

export default {
    props: {
        email: {
            type: Object,
            required: true,

        },
        disableLoginChange: {
            type: Boolean,
            default: false
        },
        deleteBtn: {
            type: Boolean,
            default: false
        },
        userId: {
            type: String
        },
        userTitle: {
            type: String
        }
    },
    emits: ['saveButton', 'deleteButton'],
    mounted() {
        console.log(this.email);
    },
    data() {
        return {
            emailValidate: 'access',
            emailChanges: {
                smtpPort: this.email.smtpPort,
                password: this.email.password,
                smtpServ: this.email.smtpServ,
                from: this.email.from,
                login: this.email.login,
                isVerify: this.email.isVerify,
                mailUuid: this.email.mailUuid,
                isCorporative: this.email.isCorporative
            },
            domens: {
                ru: 'ru',
                com: 'com'
            },
            mails: {
                gmail: 'gmail',
                mail: 'mail',
                yandex: 'yandex'
            },
            statuses: {
                access: 'access',
                noAccess: 'noAccess',
                beEdited: 'beEdited',
                wrongData: 'wrongData'
            }
        }
    },
    methods: {
        onlyAllowNumber(value) {
            return !value || /^\d+$/.test(value)
        },
        deleteSideSpace(value) {
            return !/ /g.test(value)
        },
        async saveEmail() {
            const { wrongData } = this.statuses
            const emailVerifyStatus = await this.$store.dispatch('users/verifyEmail', { email: this.emailChanges })
            console.log('emailVerifyStatus', emailVerifyStatus);
            if(emailVerifyStatus) {
                this.$emit('saveButton', this.emailChanges)
            } else {
                this.emailValidate = wrongData
            }
        },
        deleteEmail() {
            this.$emit('deleteButton', this.emailChanges)
        },
        autoFillSmtp(mail) {
            this.emailChanges.smtpServ = `smtp.${mail}.${ mail === this.mails.gmail ? this.domens.com : this.domens.ru}`;
            this.emailChanges.smtpPort = consts.smtpBase.port
        },
        async emailDuplicateCheck() {
            const { noAccess, access } = this.statuses
            if(this.email.login !== this.emailChanges.login) {
                const response = await this.$store.dispatch('users/emailDuplicateCheck', { login: this.emailChanges.login })
                this.emailValidate = response ? noAccess : access
            }
        }
    },
    computed: {
        loginEmailValidate() {
            const { login } = this.emailChanges
            const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
            return (EMAIL_REGEXP.test(login) || !login)
        },
        validationCheck() {
            return (this.emailChanges.smtpPort && 
                this.emailChanges.password && 
                this.emailChanges.smtpServ && 
                this.emailChanges.from && 
                this.emailChanges.login &&
                (this.emailValidate === this.statuses.wrongData ||
                this.emailValidate === this.statuses.access) &&
                this.loginEmailValidate)
        }
    },
    watch: {
        'emailChanges.login': function() {
            this.emailValidate = this.statuses.beEdited
        }
    },
    components: { GmailSvg, YandexSvg, MailSvg }
}
</script>

<style></style>