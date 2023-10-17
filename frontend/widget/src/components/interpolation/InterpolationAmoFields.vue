<template>
    <div class="reon-mailer-interpolation">
        <div
            @click="toggleBody" 
            class="reon-mailer-interpolation__btn">
            {...}
        </div>
        
        <interpolation-body 
            v-if="isBodyOpen"
        />
    </div>
</template>

<script>

import InterpolationBody from './InterpolationBody.vue'

export default {
    data() {
        return {
            isBodyOpen: false
        }
    },
    methods: {
        toggleBody() {
            this.isBodyOpen = !this.isBodyOpen
        }
    },
    components: { InterpolationBody }
}
</script>

<style scoped>
</style>