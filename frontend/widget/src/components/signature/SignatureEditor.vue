<template>
    <div class="reon-mailer-signature-page__edit reon-mailer-signature-editor">
        <div class="reon-mailer-signature-editor__title">
            <span>
                Редактирование подписи
            </span>
            <interpolation-amo-fields />
        </div>
        <div class="reon-mailer-signature-editor__body">
            <div class="reon-mailer-signature-editor__editor">
                <quill-editor
                    ref="signatureEditor"
                    v-model:value="signature.body"
                    :options="editorOptions"
                />
            </div>
            <div class="reon-mailer-signature-editor__btns">
                <n-button
                    @click="saveSignature"
                    type="primary"
                >Сохранить</n-button>
                <n-button
                    @click="clearSignatureBody"
                >Очистить</n-button>
            </div>
        </div>
    </div>
</template>

<script>
import InterpolationAmoFields from '../interpolation/InterpolationAmoFields.vue';

export default {
    data() {
        return {
            signature: {
                ownerId: null,
                subdomain: '',
                body: '<p></p>',
                ownerName: ''
            },
            editorOptions: {
                placeholder: 'Введите текст подписи...',
                modules: {
                    toolbar: [
                        [{ font: [] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ list: 'ordered' }],
                        [{ script: 'sub' }, { script: 'super' }],
                        [{ color: [] }, { background: [] }],
                        [{ align: [] }],
                        ['link', 'image', 'video']
                    ]
                }
            }
        }
    },
    methods: {
        saveSignature() {
            this.$store.dispatch('signature/saveSignature', this.signature)
        },
        clearSignatureBody() {
            this.signature.body = '<p></p>'
        },
        async loadCurrentSignature() {
            this.signature = {...this.$store.getters['signature/getCurrentSignatureBody']}
        }
    },
    mounted() {
        this.loadCurrentSignature()
    },
    watch: {
        '$store.state.signature.currentSignature': function() {
            this.loadCurrentSignature()
        }
    },
    components: { InterpolationAmoFields }
}
</script>

<style scoped>
.reon-loader {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>