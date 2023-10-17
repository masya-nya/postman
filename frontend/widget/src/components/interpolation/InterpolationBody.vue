<template>
    <div class="reon-mailer-interpolation__container">
        <div class="reon-mailer-interpolation__title">
            Переменные
        </div>
        <div class="reon-mailer-interpolation__body">
            <div class="reon-mailer-interpolation__search">
                <n-input 
                    placeholder="Поиск: введите и нажмите Enter"
                    size="small"
                    @keydown.enter="variableSearch"
                />
            </div>
            <div class="reon-mailer-interpolation__list">
                <interpolation-group 
                    v-for="group in Object.entries(getVariables)" :key="group[0]"
                        :group="group"
                />
            </div>
            <div class="reon-mailer-interpolation__modife">
                <n-select
                    v-model:value="valueModife"
                    @update:value="useModife"
                    label-field="whateverLabel"
                    value-field="whateverValue"
                    children-field="whateverChildren"
                    :options="optionsModife"
                    placeholder="Модификаторы"
                    size="small"
                    ref="interpolationModifeSelect"
                />
            </div>
        </div>
        <div class="reon-mailer-interpolation__output">
            <n-input 
                placeholder="Выберите переменную"
                v-model:value="getCurrentVariable"
                ref="input"
                size="small"
            />
            <div class="reon-mailer-interpolation__copy">
                <copy-svg 
                    @click="copyInterpolation"
                />
            </div>
        </div>
    </div>
</template>

<script>
import consts from '../../consts/consts.js'
import InterpolationGroup from './InterpolationGroup.vue'
import CopySvg from '../icons/CopyIcon.vue'

export default {
    data() {
        return {
            valueModife: null,
            variables: {},
            optionsModife: [
                {
                    type: "group",
                    whateverLabel: "Текстовые",
                    key: "text",
                    whateverChildren: [
                        {
                            whateverLabel: "Преобразование строки в верхний регистр",
                            whateverValue: "uppercase",
                        },
                        {
                            whateverLabel: "Преобразование строки в нижний регистр",
                            whateverValue: "lowercase"
                        },
                        {
                            whateverLabel: "Преобразование первого символа в верхний регистр",
                            whateverValue: "first_to_upper"
                        },
                        {
                            whateverLabel: "Удаление лишних пробелов",
                            whateverValue: "del_miss_space",
                        }
                    ]
                },
                {
                    type: "group",
                    whateverLabel: "Числовые",
                    key: "numeric",
                    whateverChildren: [
                        {
                            whateverLabel: "Число с дробью",
                            whateverValue: "num_to_fraction"
                        },
                        {
                            whateverLabel: "Форматирование числа",
                            whateverValue: "countSymbolsAfterDot"
                        },
                        {
                            whateverLabel: "Округление числа в большую сторону",
                            whateverValue: "rounding_up"
                        },
                        {
                            whateverLabel: "Округление числа в меньшую сторону",
                            whateverValue: "rounding_down"
                        },
                        {
                            whateverLabel: "Число прописью",
                            whateverValue: "num_to_writing"
                        },
                    ]
                }
            ]
        }
    },
    computed: {
        getCurrentVariable() {
            const { id, entity_type, modife } = this.$store.getters['interpolation/getCurrentVariable']
            return  (id && entity_type) ? `{{ ${entity_type}.${isNaN(+id) ? id : 'cf(' + id + ')'}${ modife ? '.'+ modife : '' } }}` : '';
        },
        getVariables() {
            return this.$store.getters['interpolation/getVariables']
        }
    },
    methods: {
        resetValueModife() {
            this.valueModife = null
        },
        copyInterpolation() {
            navigator.clipboard.writeText(this.$refs.input.value)
        },
        variableSearch(evnt) {
            return this.$store.commit('interpolation/searchingVariable', evnt.target.value)
        },
        useModife(modifeValue) {
            if(this.$refs.input.value) {
                this.$store.commit('interpolation/changeModife', `${consts.modifiers[modifeValue].value}${consts.modifiers[modifeValue].arg ? '()' : ''}`)
            }
        }
    },
    components: {InterpolationGroup, CopySvg},
    beforeCreate() {
        this.$store.dispatch('interpolation/loadAmoCustomFileds')
    },
    watch: {
        '$store.state.interpolation.currentVariable.id': function() {
            this.resetValueModife()
        }
    }
}
</script>

<style scoped>
</style>