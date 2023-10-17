<template>
    <div class="reon-mailer-interpolation__group reon-mailer-interpolation-group">
        <div class="reon-mailer-interpolation-group__title">
            {{ entityTranslate[group[0]].upper }}
        </div>
        <div class="reon-mailer-interpolation-group__list">
            <interpolation-item 
                v-for="variable in group[1]" :key="variable.id"
                :variable="variable"
                :entityTranslation="entityTranslate"
            />
        </div>
    </div>
</template>

<script>
import InterpolationItem from './InterpolationItem.vue'
export default {
    props: {
        group : {
            type: Array
        }
    },
    data() {
        return {
            entityTranslate: {
                'lead': {
                    upper: 'Сделка',
                    lower: 'cделка'
                },
                'contact': {
                    upper: 'Контакт',
                    lower: 'контакт'
                },
                'company': {
                    upper: 'Компания',
                    lower: 'компания'
                }
            }
        }
    },
    components: { InterpolationItem }
}
</script>

<style></style>