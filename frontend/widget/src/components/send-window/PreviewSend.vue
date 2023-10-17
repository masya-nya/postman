<template>
    <div class="reon-mailer-send-preview">
        <div
            class="reon-mailer-send-preview__btn-open"
            @click="toggleModalShow"
            title="Предпросмотр"
        >
        <!-- Иконка глаза -->
            &#128065;
        </div>
        <preview-send-modal 
            v-if="isModalShow"
            @closeModal="closeModal"
            :message="message"
        />
    </div>
</template>

<script>
import PreviewSendModal from './PreviewSendModal.vue'
export default {
    props: {
        message: {
            type: Object
        }
    },
    data() {
        return {
            isModalShow: false
        }
    },
    methods: {
        toggleModalShow() {
            this.isModalShow = !this.isModalShow
        },
        closeModal() {
            this.isModalShow = false
        }
    },
    components: {
        PreviewSendModal
    }
}
</script>

<style>
.reon-mailer-send-preview__btn-open {
    font-size: 24px;
    border: 1px solid #ccc;
    line-height: 34px;
    padding: 0 5px;
    color: #444;
    border-radius: 5px;
    cursor: pointer;
    transition: all .2s ease;
}
.reon-mailer-send-preview__btn-open:hover {
    color: #18a058;
    border-color: #18a058;
}
</style>