<template>
    <div class="reon-mailer-pattern-page__pattern-editor reon-mailer-pattern-editor">
        <div class="reon-mailer-pattern-editor__title">
            <span>
                {{ getAddingPatternStatus ? 'Создание шаблона' : 'Редактирование шаблона' }}
            </span>
            <interpolation-amo-fields />
        </div>
        <div v-if="isLoad" class="reon-loader">
            <reon-loader
                v-if="!errorCheck"
            />
            <mailer-text-error 
                v-else 
                text="Не удалось получить данные о шаблоне"
                type="warning"
            />
        </div>
        <form  
            v-else class="reon-mailer-pattern-editor__body" 
            :pattern-id="pattern.id">
            
            <div class="reon-mailer-pattern-editor__heading">
                <div class="reon-mailer-pattern-editor__row">
                    <div class="reon-mailer-pattern-editor__row--left reon-mailer-flex-column">
                        <div class="reon-mailer-pattern-editor__row--top">
                            <label class="reon-mailer-pattern-editor__label" for="mailer-input-pattern-name">Название шаблона</label>
                        </div>
                        <div class="reon-mailer-pattern-editor__row--bottom">
                            <reon-input
                                placeholder="Рекламная рассылка"
                                v-model.trim="pattern.name"
                                id="mailer-input-pattern-name"
                                :voidCheck="true"
                            />
                            <n-select 
                                v-if="isAdmin" 
                                v-model:value="pattern.isPublic" 
                                :options="publicListOptions" 
                            />
                        </div>
                    </div>
                    <div class="reon-mailer-pattern-editor__row--right reon-mailer-flex-column">
                        <div class="reon-mailer-pattern-editor__row--top">
                            <label class="reon-mailer-pattern-editor__label" for="mailer-input-pattern-email">Куда отправлять письмо</label>
                        </div>
                        <div class="reon-mailer-pattern-editor__row--bottom">
                            <n-select 
                                v-model:value="pattern.receiverType" 
                                :options="emailListOptions" 
                            />
                            <n-select
                                :style="{ 'flex': '0 0 70%'  }"
                                v-if="pattern.receiverType" 
                                v-model:value="pattern.receiver"
                                :input-props="{
                                    autocomplete: 'disabled'
                                }"
                                placeholder="Введите email и нажмите enter"  
                                multiple
                                filterable
                                tag
                                :show-arrow="false"
                                :show="false"
                                :max-tag-count="1"
                            />
                        </div>
                    </div>
                </div>
                <div class="reon-mailer-pattern-editor__row reon-mailer-flex-column">
                    <div class="reon-mailer-pattern-editor__row--top">
                        <label class="reon-mailer-pattern-editor__label" for="mailer-input-pattern-title">Заголовок письма</label>
                    </div>
                    <div class="reon-mailer-pattern-editor__row--bottom">
                        <reon-input
                            placeholder="Привлекательное предложение"
                            v-model.trim="pattern.title"
                            id="mailer-input-pattern-title"
                        />
                    </div>
                </div>
            </div>
            <div class="reon-mailer-pattern-editor__editor">
                <quill-editor 
                    ref="editor"
                    v-model:value="pattern.body" 
                    :options="editorOptions"
                />
            </div>
            <div class="reon-mailer-pattern-editor__attachment">
                <reon-file-input 
                    @files="getFiles"
                    :filesLinks="pattern.filesLinks"
                    :multiple="true"
                    :filesLimit="5"
                />
            </div>
            <div class="reon-mailer-pattern-editor__btns">
                <div class="reon-mailer-pattern-editor__btns--left">
                    <n-button
                        type="primary"
                        @click.prevent="savePattern(pattern.id)"
                        :disabled="!saveButtonValidate"
                    >Сохранить</n-button>
                    <n-checkbox v-model:checked="pattern.isSignatureUse">
                        Прикрепить подпись
                    </n-checkbox>
                </div>
                <div class="reon-mailer-pattern-editor__btns--right">
                    <n-button
                        type="error"
                        :disabled="getAddingPatternStatus"
                        @click.prevent="deletePattern(pattern.id)"
                    >Удалить шаблон</n-button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import InterpolationAmoFields from '../interpolation/InterpolationAmoFields.vue'

export default {
    data() {
        return {
            isLoad: true,
            errorCheck: false,
            emailListOptions: [
                {
                    label: "На email клиента",
                    value: 0
                },
                {
                    label: 'На другой email',
                    value: 1
                }
            ],
            publicListOptions: [
                {
                    label: "Публичный шаблон",
                    value: true
                },
                {
                    label: 'Личный шаблон',
                    value: false
                }
            ],
            pattern: {
                id: '',
                name: '',
                title: '',
                body: '',
                isPublic: false,
                isSignatureUse: false,
                author: '',
                authorId: 12345678,
                receiverType: 0,
                receiver: [],
                filesLinks: [],
                files: []
            },
            validateForm: {
                name: true,
                title: true
            },
            editorOptions: {
                placeholder: 'Введите текст письма...',
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
    computed: {
        saveButtonValidate() {
            const { isAdmin } = this.$store.getters['getCurrentAmoUser']
            const { isPublic, name } = this.pattern
            return (name && (isAdmin || !isPublic))
        },
        getAddingPatternStatus() {
            const { isAdmin } = this.$store.getters['getCurrentAmoUser'];
            const { isPublic } = this.pattern;
            return (this.$store.getters['pattern/getAddingPatternStatus'] || !(isAdmin || !isPublic))
        },
        isAdmin() {
            const { isAdmin } = this.$store.getters['getCurrentAmoUser']
            return isAdmin
        }
    },
    methods: {
        getFiles(files) {
            this.pattern.files = files

        },
        savePattern(){
            this.$store.dispatch('pattern/postPatternChanges', this.pattern)
        },
        validateInputName(status) {
            this.validateForm.name = status
        },
        validateInputTitle(status) {
            this.validateForm.title = status
        },
        deletePattern() {
            this.$store.dispatch('pattern/deletePattern')
        },
        async loadPattern(){
            try {
                this.errorCheck = false;
                this.isLoad = true;
                await this.$store.dispatch('pattern/getPattern');
                this.pattern = this.$store.getters['pattern/getCurrentPatternBody']
                this.isLoad = false;
            } catch(e) {
                console.log(e);
                this.errorCheck = true;
            }
        }
    },
    async mounted() {
        this.loadPattern()
    },
    watch: {
        '$store.state.pattern.currentPattern': async function () {
            this.loadPattern()
        }
    },
    components: { InterpolationAmoFields }
}
</script>

<style scoped>
.reon-loader {
    width: 100%;
    padding: 250px 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>