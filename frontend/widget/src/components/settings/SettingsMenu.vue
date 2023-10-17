<template>
    <div class="reon-mailer-settings__menu">
        <div class="reon-mailer-settings__menu-list">
            <settings-menu-item 
                v-for="tab in getSettingsTabs" :key="tab.value"
                :name="tab.name"
                :value="tab.value"
            />
        </div>
    </div>
</template>

<script>
import SettingsMenuItem from './SettingsMenuItem.vue';

export default {
    computed: {
        getSettingsTabs() {
            return this.$store.getters['settings/getTabs']
        }
    },
    components: { SettingsMenuItem }
}
</script>

<style>

</style>