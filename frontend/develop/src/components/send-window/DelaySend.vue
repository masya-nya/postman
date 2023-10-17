<template>
    <div class="reon-mailer-delay-send">
        <div class="reon-mailer-delay-send__btns">
            <n-button 
                @click="sendMessage"
                class="reon-mailer-delay-send__btn-send"
                type="primary"
                :disabled="!isAllowedSend"
            >Отправить</n-button>
            <preview-send 
                :message="message"
                :class="{ 'reon-pointer-none': !isAllowedSend }"
            />
        </div>
        <div class="reon-mailer-delay-send__container">
            <span
                @click="showDelayContainer" 
                class="reon-mailer-delay-send__toggle">
                {{ toggleText }}
            </span>
            <div v-if="isDelayContainerShow" class="reon-mailer-delay-send__delayer">
                <n-date-picker 
                    class="reon-mailer-delay-send__date"
                    v-model:value="sentTime"                          
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"	
                    update-value-on-close="true"
                    actions="null"
                    placeholder="Выберите дату "
                    size="small"
                />
                <n-button 
                    @click="approveDelaySending"
                    class="reon-mailer-delay-send__btn-ok"
                    size="small"
                >Ок</n-button>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import PreviewSend from './PreviewSend.vue'

export default {
    props: {
        message: {
            type: Object
        }
    },
    data() {
        return {
            isDelayContainerShow: false,
            sentTimeDateFormat: null,
            sentTime: null,
        }
    },
    computed: {
        toggleText() {
            if(this.isDelayContainerShow) {
                return 'Отменить отложенную отправку'
            } else {
                return this.sentTimeDateFormat ? `Будет отправлено ${this.sentTimeDateFormat}` : 'Отложить отправку сообщения'
            }
        },
        isAllowedSend() {
            const { sender, receiver } = this.message
            return (sender && receiver.length)
        }
    },
    methods: {
        showDelayContainer() {
            if(this.sentTimeDateFormat && this.isDelayContainerShow) {
                this.sentTimeDateFormat = null;
                this.sentTime = null;
                this.$emit('delayTime', this.sentTime)
            }
            this.isDelayContainerShow = !this.isDelayContainerShow
        },
        sendMessage() {
            this.$emit('sendAction')
        },
        approveDelaySending() {
            this.isDelayContainerShow = false;
            if(this.sentTime) {
                this.sentTimeDateFormat = dayjs(this.sentTime).format('YYYY.MM.DD в HH:mm');
                this.$emit('delayTime', this.sentTime)
            }
        }
    },
    components: { PreviewSend }
}
</script>

<style scoped>
.reon-mailer-delay-send {
    display: flex;
    flex-direction: column;
    width: 200px;
}
.reon-mailer-delay-send >:not(:last-child) {
    margin:  0 0 2px 0;
}
.reon-mailer-delay-send__btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.reon-mailer-delay-send__btn-send {
    width: 160px;
}
.reon-mailer-delay-send__container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.reon-mailer-delay-send__toggle {
    margin: 0 0 5px 0;
    display: inline-block;
    font-size: 13px;
    text-decoration: underline;
    color: rgb(151, 151, 151);
    cursor: pointer;
    line-height: 1.15;
}
.reon-mailer-delay-send__delayer {
    display: flex;
    justify-content: space-between;
}
.reon-mailer-delay-send__date {
    flex: 0 0 80%;
}
.reon-mailer-delay-send__btn-ok {
    flex: 0 0 15%;
}
</style>