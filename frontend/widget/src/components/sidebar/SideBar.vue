<template>
    <div class="reon-mailer-sidebar">
        <h2 class="reon-mailer-sidebar__title">Письма 2.0</h2>
        <ul class="reon-mailer-sidebar__nav">
            <side-bar-tab 
                v-for="page in getPagesNames" :key="page.name" 
                :page="page" 
            />
            <li class="reon-mailer-sidebar__item">
                <a 
                    @click.prevent="closeApp"
                    class="reon-mailer-sidebar__link reon-mailer-sidebar__link--close" 
                >Закрыть</a>
            </li>
        </ul>
    </div>
</template>

<script>
import SideBarTab from './SideBarTab.vue';
export default {
    props: {
    },
    computed: {
        getPagesNames() {
            return this.$store.getters.getPagesNames
        }
    },
    methods: {
        closeApp() {
            this.$Reon.optionsWindowRun = false;
            this.$utils.closeMailerWindow();
        }
    },
    components: { SideBarTab }
}
</script>
<style lang="scss">

</style>
