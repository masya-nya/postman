<template>
    <li class="reon-mailer-sidebar__item">
        <a 
            @click.prevent="changePost"
            :class="currentPage === page.name ? 'reon-mailer-sidebar__link--active' : ''"
            class="reon-mailer-sidebar__link">
            {{ page.title }}
        </a>
    </li>
</template>

<script>
export default {
    name: 'side-bar-tab',
    props: {
        page: {
            type: Object
        }
    },
    computed: {
        currentPage() {
            return this.$store.getters.getCurrentPage
        }
    },
    methods: {
        changePost() {
            this.$store.commit('changeCurrentPost', this.page.name)
        }
    }
}
</script>

<style>

</style>