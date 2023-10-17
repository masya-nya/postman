<template>
    <div
        @click="generateInterpolation"
        class="reon-mailer-interpolation-group__item reon-mailer-interpolation-item">
        <div class="reon-mailer-interpolation-item__name">
            {{ variable.name }}
        </div>
        <div ref="div" class="reon-mailer-interpolation-item__entity">
            {{ entityTranslation[variable.entity_type].lower }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        variable: {
            type: Object
        },
        entityTranslation: {
            type: Object
        }
    },
    methods: {
        generateInterpolation() {
            this.$store.commit('interpolation/changeCurrentVariable', this.variable)
        }
    }
}
</script>

<style>

</style>