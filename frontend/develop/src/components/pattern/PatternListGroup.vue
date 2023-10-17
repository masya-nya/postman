<template>
    <div v-if="showGroup" class="reon-mailer-pattern-list__group">
        <h3 class="reon-mailer-pattern-list__group--name">{{ groupPatterns.isPublic ? 'Общедоступные' :  groupPatterns.patterns[0].author}}</h3>
        <div class="reon-mailer-pattern-list__list">
            <pattern-list-item 
                v-for="pattern in groupPatterns.patterns" :key="pattern.id"
                :name="pattern.name"
                :author="pattern.author"
                :patternId="pattern.id"
                @click="changeCurrentPattern(pattern.id)"
            />
        </div>
    </div>
</template>

<script>
import PatternListItem from './PatternListItem.vue';
export default {
    props: {
        groupPatterns: {
            type: Object
        },
        groupId: {
            type: String
        }
    },
    methods: {
        changeCurrentPattern(patternId) {
            this.$store.commit('pattern/changeCurrentPattern', patternId)
        }
    },
    computed: {
        showGroup() {
            const { id, isAdmin } = this.$store.getters['getCurrentAmoUser']
            const { patterns, isPublic } = this.groupPatterns
            return ((isAdmin || ((id == this.groupId) || isPublic)) && patterns.length)
            // (0 || (0 || 1)) && 1
        }
    },
    components: {
        PatternListItem
    }
}
</script>

<style>

</style>