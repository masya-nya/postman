<template>
    <div class="reon-mailer-signature-page__list reon-mailer-signature-list">
        <div class="reon-mailer-signature-list__title">
            <input 
                class="reon-mailer-signature-list__search" 
                @keydown.enter="searchUsers" 
                :value="searchValue" 
                type="text" 
                placeholder="Поиск"
            >
        </div>
        <div class="reon-mailer-signature-list__body">
            <signature-list-item
                v-for="(signature) in signatures" :key="signature.ownerId"
                @click="changeSignature(signature.ownerId)"
                :signature="signature"
            />
        </div>
    </div>
</template>

<script>
import SignatureListItem from './SignatureListItem.vue';

export default {
    computed: {
        signatures() {
            return this.$store.getters['signature/getSignatures']
        },
        searchValue() {
            return this.$store.getters['signature/getSearchValue']
        }
    },
    methods: {
        changeSignature(ownerId) {
            this.$store.commit('signature/changeCurrentSignature', ownerId)
        },
        searchUsers(event) {
            this.$store.commit('signature/updateSearchValue', event.target.value)
        }
    },
    components: { SignatureListItem }
}
</script>

<style>

</style>