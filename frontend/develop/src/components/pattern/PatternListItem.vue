<template>
    <div class="reon-mailer-pattern-list__item" :pattern-id="patternId" :class="currentPattern === patternId ? 'reon-mailer-pattern-list__item--active' : ''">
        <div class="reon-mailer-pattern-list__name">
            {{ name }}
        </div>
        <div class="reon-mailer-pattern-list__author">
            {{ author }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        patternId: {
            type: String,
            required: true
        }
    },
    computed: {
        currentPattern() {
            return this.$store.getters['pattern/getCurrentPattern']
        }
    }
}
</script>

<style>

</style>