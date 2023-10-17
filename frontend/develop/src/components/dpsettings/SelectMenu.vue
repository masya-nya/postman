<template>
    <div class="reon-mailer__select">
        <h1 class="reon-mailer__select__title">{{title}}</h1>
        <div class="control--select reon-mailer__contact-select-input">
            <ul class="custom-scroll control--select--list ">
                <li 
                v-for="option in options" 
                :data-value="option.value" 
                class="control--select--list--item" 
                :key="option.id"
                @click="changeHideInputValue(option.value)"
                >
                    <span class="control--select--list--item-inner" :title="option.option">{{option.option}}</span>
                </li>
            </ul>
            <button class="control--select--button" tabindex="" type="button" data-value="">
                <span class="control--select--button-inner">{{choosenValue}}</span>
            </button><input type="hidden" class="control--select--input " name="" value=""  data-prev-value="">
        </div>
        <div class="reon-mailer__contact-select-extra-input">
            <input type="number" class="text-input" v-if="!isExtraInputHide" @input="changeHideExtraInputValue" v-model="delayDuration">
        </div>
    </div>
</template>

<script>

export default {
    props: ['options', 'title', 'hideInputName', 'extraHideInputName', 'choosenValue'],
    data() {
        return { 
            hideInputName: this.hideInputName,
            extraHideInputName: this.extraHideInputName,
            isExtraInputHide: true,
            delayDuration: '',
            hideInputNameValue: '',
            currentOptionName: ''
        }
    },
    methods: {
        changeHideInputValue(value) {
            const hideInput = document.querySelector(`[name=${this.hideInputName}]`);
            hideInput.value = value;
            console.log(value);
            if ((value === 'none' || value === '') && this.extraHideInputName) {
                this.isExtraInputHide = true;
                this.delayDuration = '';
                const extraHideInput = document.querySelector(`[name=${this.extraHideInputName}]`);
                extraHideInput.value = '';
            } else if (this.extraHideInputName) {
                this.isExtraInputHide = false;
            }
        },
        changeHideExtraInputValue() {
            const extraHideInput = document.querySelector(`[name=${this.extraHideInputName}]`);
            extraHideInput.value = this.delayDuration;
        }
    },
    async mounted() {
        console.log(document.querySelector(`[name=${this.hideInputName}]`).value)
    }
}
</script>

<style scoped>
.reon-mailer__contact-select-input {
    margin-bottom: 20px;
}

.reon-mailer__select__title {
    font-size: 15px;
    margin-bottom: 7px;
}

.reon-mailer__contact-select-extra-input {
    margin-bottom: 15px;
}

</style>

