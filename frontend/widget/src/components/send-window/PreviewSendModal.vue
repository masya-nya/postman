<template>
    <div 
        class="reon-mailer-send-preview__modal"
        @click.self="closeModal"
        >

        <div class="reon-mailer-send-preview__wrapper">
            <div v-if="isLoad" class="reon-loader">
                <reon-loader
                    v-if="!errorCheck"
                />
                <mailer-text-error 
                    v-else 
                    text="Не удалось получить данные о шаблоне"
                    type="warning"
                />
            </div>
            <div v-else class="reon-mailer-send-preview__container">
                <div class="reon-mailer-send-preview__title">
                    {{ previewMessage.title ? previewMessage.title : '<Без темы>' }}
                </div>
                <div class="reon-mailer-send-preview__from">
                    <span class="reon-mailer-send-preview__email">{{ previewMessage.from }}</span>
                </div>
                <div class="reon-mailer-send-preview__message">
                    <div v-html="previewMessage.body" class="reon-mailer-send-preview__body">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    emits: ['closeModal'],
    props: {
        message: {
            type: Object
        }
    },
    data() {
        return {
            isLoad: true,
            errorCheck: false,
            previewMessage: {
                title: this.message.title,
                from: this.message.sender,
                body: '',
            }
        }
    },
    computed: {
    },
    methods: {
        closeModal() {
            this.$emit('closeModal')
        },
        async loadPattern(){
            try{
                this.errorCheck = false;
                this.isLoad = true;
                const { body } = await this.$store.dispatch('send/getPreview', this.message);
                this.previewMessage.body = body;
                this.isLoad = false;
            } catch(e) {
                this.errorCheck = true;
            }
        }
    },
    async mounted() {
        this.loadPattern()
    },
}
</script>

<style> 
.reon-mailer-send-preview__modal {
    z-index: 150;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
}
.reon-mailer-send-preview__wrapper {
    z-index: 151;
    background: #f6f6f6;
    width: 60vw;
    display: flex;
    overflow: auto;
    min-height: 200px;
    border-radius: 5px;
    max-height: 600px;
    scrollbar-width: thin;
    scrollbar-color: #203d49 rgba(100, 100, 100, 0.1);
}
.reon-mailer-send-preview__wrapper::-webkit-scrollbar {
    width: 7px;
    height: 0;
}
.reon-mailer-send-preview__wrapper::-webkit-scrollbar-track {
    background: #eaeaea;
}
.reon-mailer-send-preview__wrapper::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #cdcdcd;
}
.reon-mailer-send-preview__container {
    height: 100%;
    width: 100%;
    padding: 30px;    
}
.reon-mailer-send-preview__title {
    line-height: 40px;
    font-size: 24px;
}
.reon-mailer-send-preview__from {
    color: #999;
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
}
.reon-mailer-send-preview__from > .reon-mailer-send-preview__email {
    margin: 0 0 0 10px;
}
.reon-mailer-send-preview__message {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 3px;
    line-height: 1.3;
    background: #fff;
}
.reon-mailer-send-preview__message ol {
    margin: revert;
    padding: revert;
    list-style: revert;
}
.reon-mailer-send-preview__message h1 {
    margin: revert;
    font-size: revert;
    font-weight: revert;
}
.reon-mailer-send-preview__message sup {
    font: revert;
    vertical-align: super;
}
.reon-mailer-send-preview__message sub {
    font: revert;
    vertical-align: sub;
}
.reon-mailer-send-preview__message strong {
    font: revert;
}
.reon-mailer-send-preview__message em {
    font: revert;
}
.reon-mailer-send-preview__body {
    overflow-wrap: break-word;
}
.reon-mailer-send-preview__signature {
    overflow-wrap: break-word;
}
.reon-loader {
    margin: auto;
}
</style>