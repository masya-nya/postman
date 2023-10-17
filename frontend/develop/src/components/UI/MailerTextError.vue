<template>
    <div :class="`reon-mailer-text-error reon-mailer-text-error--${type}`" >
        <div class="reon-mailer-text-error__body">
            {{ text }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'mailer-text-error',
    props: {
        text: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'default'
        }
    }
}
</script>

<style scoped>
.reon-mailer-text-error {
    border: 1px solid #ccc;
    font-size: 16px;
    font-weight: normal;
    padding: 15px;
    border-radius: 10px;
}
.reon-mailer-text-error--danger {
    color: red;
    border-color: red;
}
.reon-mailer-text-error--warning {
    color: orange;
    border-color: orange;
}
.reon-mailer-text-error__body {
    color: inherit;
}
</style>