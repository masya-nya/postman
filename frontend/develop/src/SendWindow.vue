<template>
    <div 
        @click.self="closeModal"
        class="reon-mailer-send-window">

        <n-config-provider :locale="ruRU" :date-locale="dateRuRU">
            <send-body/>
        </n-config-provider>
    </div>
</template>

<script>
import SendBody from './components/send-window/SendBody.vue'
import { ruRU, dateRuRU } from 'naive-ui';

export default {
    data() {
        return {
            ruRU,
            dateRuRU
        }
    },
    methods: {
        closeModal() {
            this.$Reon.sendModalRun = false;
            this.$utils.closeSendModal();
        }
    },
    async mounted() {
    },
    components: {
        SendBody
    },
}
</script>

<style scoped></style>
