<template>
    <div
        v-if="signatureVisibility"
        class="reon-mailer-signature-list__item"
        :class="currentSignature === signature.ownerId ? 'reon-mailer-signature-list__item--active' : ''"
    >
        {{ signature.ownerName }}
    </div>
</template>

<script>

export default {
    props: {
        signature: {
            type: Object
        }
    },
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        currentSignature() {
            return this.$store.getters['signature/getCurrentSignature']
        },
        signatureVisibility() {
            const { isAdmin, id } = this.$store.getters['getCurrentAmoUser']
            const { ownerId }  = this.signature
            return ((ownerId == id) || isAdmin)
        }
    }
}
</script>

<style>

</style>