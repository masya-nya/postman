<template>
    <div class="reon-mailer-copy-svg">
        <svg @click="clickHandler" fill="none" height="18" viewBox="0 0 22 27" width="22" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.5 21.1664V22.9815C17.5 24.1916 16.5 25.2 15.3 25.2H3.9C2.7 25.2 1.7 24.1916 1.7 22.9815V7.14959C1.7 5.93951 2.7 4.93109 3.9 4.93109"
                :stroke="color" stroke-miterlimit="10" stroke-width="2" />
            <path
                d="M18.2 21.4689H6.8C5.6 21.4689 4.6 20.4605 4.6 19.2504V3.41848C4.6 2.2084 5.6 1.20001 6.8 1.20001H18.2C19.4 1.20001 20.4 2.2084 20.4 3.41848V19.1496C20.4 20.4605 19.4 21.4689 18.2 21.4689Z"
                :stroke="color" stroke-miterlimit="10" stroke-width="2" />
        </svg>
        <span v-if="messageStatus" class="reon-mailer-copy-svg__inner">Copied</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            messageStatus: false,
            color: '#ccc'
        }
    },
    methods: {
        clickHandler() {
            this.messageStatus = true
            setTimeout(() => {
                this.messageStatus = false
            }, 300)
        }
    }
}
</script>

<style scoped>
path {
    transition: all 0.1s ease;
}
.reon-mailer-copy-svg {
    position: relative;
}
.reon-mailer-copy-svg__inner {
    border: 1px solid #ddd;
    padding: 2px 3px;
    border-radius: 5px;
    position: absolute;
    color: rgb(151, 151, 151);
    top: -20px;
    left: 15px;
    font-size: 11px;
    background: #fff;
    transition: all .2s ease;
}
</style>