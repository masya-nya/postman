<template>
    <div v-if="isLoad" class="reon-loader">
        <reon-loader
            v-if="!errorCheck"
        />
        <mailer-text-error 
            v-else 
            text="Не удалось подключиться к серверу, обновите страницу или поробуйте позже"
            type="danger"
        />
    </div>
    <div v-else class="reon-mailer-pattern-page">
        <div class="reon-mailer-pattern-page__sidebar reon-mailer-pattern-sidebar">
            <div class="reon-mailer-pattern-sidebar__title">
                <p>Шаблоны писем</p>
                <span 
                    @click="createNewPattern"
                    class="reon-mailer-pattern-sidebar__title--add"
                >+</span>
            </div>
            <pattern-list />
        </div>
        <pattern-editor />
    </div>
</template>

<script>
import PatternList from '../components/pattern/PatternList.vue';
import PatternEditor from '../components/pattern/PatternEditor.vue';

export default {
    data() {
        return {
            isLoad: true,
            errorCheck: false
        }
    },
    async mounted() {
        try{
            await this.$store.dispatch('pattern/getPatterns')
            this.isLoad = false
        } catch(e) {
            console.log(e)
            this.errorCheck = true;
        }
    },
    methods: {
        createNewPattern() {
            this.$store.commit('pattern/createNewPattern')
        }
    },
    computed: {
        getName() {
            return this.$store.getters['pattern/getName']
        }
    },
    components: {
        PatternList,
        PatternEditor
    }
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