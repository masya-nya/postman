<template>
    <div 
        class="reon-mailer-settings__menu-item"
        :class="getCurrentTab === value ? 'reon-mailer-settings__menu-item--active' : ''"
        :tab-id="value"
        @click="changeTab"
    >
        {{ name }}
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String
        },
        value: {
            type: String
        }
    },
    computed: {
        getCurrentTab() {
            return this.$store.getters['settings/getCurrentTab']
        }
    },
    methods: {
        changeTab() {
            this.$store.commit('settings/changeCurrentTab', this.value)
        }
    }
}
</script>

<style>

</style>