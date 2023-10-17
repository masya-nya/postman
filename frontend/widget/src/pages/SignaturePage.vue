<template>
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
    <div v-else class="reon-mailer-signature-page">
        <signature-list />
        <signature-editor />
    </div>
</template>

<script>
import SignatureEditor from '../components/signature/SignatureEditor.vue';
import SignatureList from '../components/signature/SignatureList.vue';
import { managers } from '../mock/accountAmoUsers.js';
export default {
    data() {
        return {
            isLoad: true,
            errorStatus: false
        }
    },
    async beforeCreate() {
        try {
            await this.$store.dispatch('signature/loadSignatures', managers)
            this.isLoad = false
        } catch (e) {
            this.errorStatus = true;
            throw new Error(e);
        }
    },
    components: { SignatureList, SignatureEditor }
}
</script>

<style scoped>
.reon-loader {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>