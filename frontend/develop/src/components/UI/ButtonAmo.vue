<template>
    <button :class="`reon-btn ${className ? className : ''} ${blue ? 'reon-blue' : ''}`">
        <span class="reon-btn__inner">{{ text }}</span>
    </button>
</template>

<script>
export default {
    name: 'button-amo',
    props: {
        text: {
            type: String,
            required: true
        },
        className: {
            type: String,
            required: false,
            default: ''
        },
        id: {
            type: String,
            required: false
        },
        blue: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style scoped>
.reon-btn {
    background: #fff;
    z-index: 1;
    display: inline-block;
    max-height: 38px;
    padding: 10px;
    font-size: 14px;
    font-weight: 700;
    line-height: 14px;
    white-space: nowrap;
    vertical-align: middle;
    text-decoration: none;
    color: #2e3640;
    border: 1px solid #dbdedf;
    border-radius: 3px;
    outline: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    position: relative;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
}
.reon-blue {
    border: 1px solid #4077d6;
    background: #4c8bf7;
    color: #fff;
}
.reon-blue:hover {
    background: #4d85e6;
}
.reon-btn__inner {
    color: inherit;
}
.reon-btn:disabled {
    pointer-events: none;
    opacity: 0.7;
}
</style>