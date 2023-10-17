<template>
    <div class="reon-mailer-send-window__wrapper">
        <div v-if="isLoad" class="reon-loader">
            <reon-loader
                v-if="!errorCheck"
            />
            <mailer-text-error 
                v-else 
                text="Не удалось получить нужные данные"
                type="warning"
            />
        </div>
        <div v-else class="reon-mailer-send-window__content">
            <div class="reon-mailer-send-window__header">
                <h2 class="reon-mailer-send-window__title">Написать письмо</h2>
                <interpolation-amo-fields />
            </div>
            <div class="reon-mailer-send-window__leads reon-mailer-send-window__input-left-label">
                <label class="reon-mailer-send-window__label">Сделка</label>
                <n-select 
                    :options="linkedLeads"
                    v-model:value="message.dealId"
                    @update:value='getContactMail'
                    placeholder='Выберите сделку'
                    filterable
                    clearable
                    class="reon-mailer-send-window__deal-select"
                />
            </div>
            <div class="reon-mailer-send-window__from-to">
                <div class="reon-mailer-send-window__from reon-mailer-send-window__input-left-label">
                    <label class="reon-mailer-send-window__label">От кого</label>
                    <n-select 
                        :options="fromMailsList" 
                        placeholder="Выберите отправителя"
                        v-model:value="message.sender"
                        :status="!message.sender ? 'warning' : ''"
                    />
                </div>
                <div class="reon-mailer-send-window__to reon-mailer-send-window__input-left-label">
                    <label class="reon-mailer-send-window__label">Кому</label>
                    <n-select
                        v-model:value="message.receiver" 
                        multiple
                        filterable
                        tag
                        :show-arrow="false"
                        :show="false"
                        placeholder="Введите и нажмите enter"
                        :max-tag-count="1"
                        :status="!message.receiver.length ? 'warning' : ''"
                    />
                </div>
            </div>
            <div class="reon-mailer-send-window__editor-head">
                <div class="reon-mailer-send-window__theme">
                    <label for="reon-send-theme" class="reon-mailer-send-window__theme-label">
                        Тема сообщения
                    </label>
                    <n-input
                        id="reon-send-theme"
                        v-model:value="message.title" 
                        placeholder='Тема сообщения'
                    />
                </div>
                <div class="reon-mailer-send-window__pattern">
                    <label for="reon-send-theme" class="reon-mailer-send-window__pattern-label">
                        Созданные шаблоны
                    </label>
                    <n-select 
                        :options="patternsList" 
                        @update:value='loadPattern'
                        filterable 
                        placeholder='Выберите шаблон'
                        clearable
                    />
                </div>
            </div>
            <div class="reon-mailer-send-window__editor">
                <quill-editor 
                    class="reon-mailer-send-window__editor-placeholder"
                    v-model:value="message.body" 
                    :options="editorOptions"
                />
            </div>
      
            <div class="reon-mailer-send-window__files-send">

                <reon-file-input  
                    @files="getFiles"
                    :filesLinks="serverFiles"
                    :multiple="true"
                    :filesLimit="5"
                 />
                <delay-send 
                    class="reon-mailer-send-window__send"
                    @sendAction="sendMessage"
                    @delayTime="delayTimeApprove"
                    :message="message"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { user } from '../../mock/accountAmoUsers.js';
import InterpolationAmoFields from '../interpolation/InterpolationAmoFields.vue';
import DelaySend from './DelaySend.vue';

    export default {
        data() {
            return {
                isLoad: true,
                errorCheck: false,
                message: {
                    title: '',
                    body: '<p></p>',
                    pureBody: '<p></p>',
                    attachedFiles: [],
                    receiver: [],
                    sentTime: null,
                    sender: null,
                    isSignatureUse: true,
                    dealId: null
                },
                linkedLeads: [],
                serverFiles: [],
                fromMailsList: [],
                patternsList: [],
                editorOptions: {
                    placeholder: 'Введите текст письма...',
                    modules: {
                        toolbar: [
                            [{ font: [] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            [{ list: 'ordered' }],
                            [{ script: 'sub' }, { script: 'super' }],
                            [{ color: [] }, { background: [] }],
                            [{ align: [] }],
                            ['link', 'image', 'video']
                        ]
                    }
                }
            }
        },
        computed: {
        },
        methods: {
            getFiles(files) {
                this.message.attachedFiles = files;
            },
            sendMessage() {
                this.$store.dispatch('send/sendMessage', this.message)
                this.$Reon.sendModalRun = false;
                this.$utils.closeSendModal();
            },
            delayTimeApprove(sendTime) {
                this.message.sentTime = sendTime
            },
            parseUserEmails(userMails) {
                userMails.forEach(mail => this.fromMailsList.push({label: mail.login, value: mail.login}));
            },
            parseUserPatterns(patterns) {
                patterns.forEach(template => this.patternsList.push({label: template.name, value: template.id}));
            },
            parseLinkedLeads(leads) {
                leads.forEach(lead => this.linkedLeads.push({label: lead.name, value: lead.id}));
            },
            async loadPattern(patternId) {
                if(patternId) {
                    let { body, filesLinks, title, receiver, isSignatureUse } = await this.$store.dispatch('send/loadPattern', {patternId, dealId: this.message.dealId})
                    this.message.isSignatureUse = isSignatureUse;
                    this.message.pureBody = body;
                    if(isSignatureUse) {
                        const signature = await this.$store.dispatch('send/loadSignature')
                        if (signature) body = body + '<br />' + signature.body
                    }
                    this.message.body = body;
                    this.message.title = title;
                    this.message.receiver = receiver;
                    this.message.attachedFiles = filesLinks;
                    this.serverFiles = filesLinks;
                } else {
                    this.message.body = '<p></p>';
                    this.message.pureBody = '<p></p>';
                    this.message.title = '';
                    this.message.receiver = [];
                    this.message.attachedFiles = [];
                    this.message.isSignatureUse = true;
                    this.serverFiles = [];
                }
            },
            async getContactMail(dealId) {
                if (dealId) {
                    const { contactMail } = await this.$store.dispatch('send/loadContactMail', {dealId});
                    this.message.receiver = [contactMail];                  
                }
            }
        },
        
        async beforeMount() {
            try{
                this.errorCheck = false;
                this.isLoad = true;
                this.$store.commit('send/loadAmoUserInfo', user)
                const linkedLeads = await this.$store.dispatch('send/loadLinkedLeads')
                const userMails = await this.$store.dispatch('send/loadUserEmails')
                const userPatterns = await this.$store.dispatch('send/getUsersPatterns')
                const signature = await this.$store.dispatch('send/loadSignature')
                if (signature) this.message.body = '--' + signature.body;
                this.parseUserEmails(userMails);
                this.parseUserPatterns(userPatterns);
                this.parseLinkedLeads(linkedLeads);
                this.isLoad = false;
            } catch(e) {
                this.errorCheck = true;
                throw new Error(e);
            }
        },
        components: {
            InterpolationAmoFields,
            DelaySend
        },
    }
</script>

<style scoped>
.reon-loader {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
