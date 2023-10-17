<template>
    <div class="reon-mailer-users-status">
        <div class="reon-mailer-users-status__wrapper" :class="verify ? 'reon-mailer-users-status--verify' : 'reon-mailer-users-status--notverify'">
            <div class="reon-mailer-users-status__inner">
                {{ verify ? '✓' : '✕' }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['verify']
}
</script>

<style scoped>
.reon-mailer-users-status__wrapper {
    border: 1px solid #ccc;
    border-radius: 50%;
    padding: 4px 9px 5px 9px;
    font-weight: 700;
}
.reon-mailer-users-status--verify {
    border-color: #18a058;
    color: #18a058;
}
.reon-mailer-users-status--notverify {
    border-color: #d67d7d;
    color: #d67d7d;
}
.reon-mailer-users-status__inner {
    color: inherit;
}
</style>