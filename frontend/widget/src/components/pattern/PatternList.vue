<template>
    <div class="reon-mailer-pattern-sidebar__list reon-mailer-pattern-list">
        <div class="reon-mailer-pattern-list__search">
            <input v-model="searchingPatternValue" type="search" placeholder="Поиск">
        </div>
        <div class="reon-mailer-pattern-list__body">

            <pattern-list-group
                v-for="groupPatterns in Object.keys(getPatterns).sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0))" :key="groupPatterns"
                :groupPatterns="getPatterns[groupPatterns]"
                :groupId="groupPatterns"
            ></pattern-list-group>
            <div 
                @click="createNewPattern"
                class="reon-mailer-pattern-list__item reon-mailer-pattern-list__item--add">
                Новый шаблон
            </div>
        </div>
    </div>
</template>

<script>
import PatternListGroup from './PatternListGroup.vue'
export default {
    data() {
        return {
            searchingPatternValue: ''
        }
    },
    methods: {
        createNewPattern() {
            this.$store.commit('pattern/createNewPattern')
        }
    },
    computed: {
        getPatterns() {
            return this.$store.getters['pattern/getGroupedPatterns']
        }
    },
    watch: {
        searchingPatternValue(newValue) {
            this.$store.commit('pattern/searchingPattern', newValue)
        }
    },  
    components: {
        PatternListGroup
    }
}
</script>

<style>

</style>