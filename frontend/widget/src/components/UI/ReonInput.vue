<template>
    <div class="reon-input" ref="inputContainer" :class="{'reon-input--danger': !voidValidate, 'reon-input--focus': isFocus}">
        <div class="reon-input__wrapper">
            <div class="reon-input__input">
                <input 
                    :value="modelValue" 
                    @input="handlerChangeInput"
                    @focus="handlerFocusInput"
                    @blur="handlerBlurInput"
                    :id="id" 
                    class="reon-input__input-el" 
                    type="text">
                <div v-if="!isInputFullnessCheck" class="reon-input__placeholder">
                    <span>{{ placeholder }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'reon-input',
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            type: String
        },
        placeholder: {
            type: String,
            required: false
        },
        label: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        voidCheck: {
            type: Boolean,
            required: false,
            default: false
        },
        id: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            voidValidate: true,
            isFocus: false
        }
    },
    computed: {
        isInputFullnessCheck() {
            return this.modelValue
        }
    },
    methods: {
        handlerChangeInput(e) {
            this.$emit('update:modelValue', e.target.value)
            if(!this.isFocus) {
                this.isFocus = true
            }
        },
        handlerFocusInput() {
            this.isFocus = true
        },
        handlerBlurInput() {
            this.isFocus = false
        }
    },
    watch: {
        modelValue(newValue) {
            if(!newValue && this.voidCheck) {
                this.voidValidate = false;
            } 
            else {
                this.voidValidate = true
            }
        }
    }
}
</script>

<style scoped>

.reon-input {
    border: 1px solid rgb(224, 224, 230);
    border-radius: 3px;
    width: 100%;
    cursor: text;
    line-height: 1.5;
    z-index: auto;
    outline: none;
    box-sizing: border-box;
    position: relative;
    display: inline-flex;
    transition: all .3s ease;
    background-color: #fff;
}
.reon-input:hover:not(.reon-input--danger) {
    border-color: #36ad6a;
}
.reon-input--focus {
    border-color: #36ad6a;
    box-shadow: 0px 0px 0px 2px rgb(54, 173, 106, 0.3);
}

.reon-input__wrapper {
    overflow: hidden;
    display: inline-flex;
    flex-grow: 1;
    position: relative;
    padding: 0 12px;
}
.reon-input__input {
    position: relative;
    overflow: hidden;
    flex-grow: 1;
    height: 32px;
    line-height: 32px;
}
.reon-input__input-el {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
}
.reon-input__input-el:focus + .reon-input__placeholder {
    display: none;
}
.reon-input__input-el:active + .reon-input__placeholder {
    display: none;
}
.reon-input__placeholder {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    white-space: nowrap;
    pointer-events: none;
}
.reon-input__placeholder span {
    color: rgba(194, 194, 194, 1);
    line-height: 1.5;
}
.reon-input--danger {
    border-color: #FF0000;
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.1);
}
</style>