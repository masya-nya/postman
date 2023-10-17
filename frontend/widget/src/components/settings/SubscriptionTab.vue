<template>
    <div class="reon-mailer-settings__subscription-tab">
        <div class="reon-mailer-settings__forward">
            <span>
                Для получения счёта на оплату <a :href="forwardUrl" target="_blank">свяжитесь</a> с нами любым удобным для вас способом.
            </span>
        </div>
        <div class="reon-mailer-settings__price">
            <div class="reon-mailer-settings__price-body">
                <div
                    v-for="priceItem in price" :key="priceItem.period"
                    class="reon-mailer-settings__price-item"
                    :class="currentPrice === priceItem.id ? 'reon-mailer-settings__price-item--active' : ''"
                    @click="changeCurrentPrice(priceItem.id)"
                    >

                    <div class="reon-mailer-settings__price-item-title">
                        {{ priceItem.title }}
                    </div>
                    <div class="reon-mailer-settings__price-item-body">
                        <div class="reon-mailer-settings__price-period">
                            {{ priceItem.period }}
                        </div>
                        <div class="reon-mailer-settings__price-value">
                            {{ priceItem.value }}
                        </div>
                    </div>
                </div>
            </div>
            <n-button
                type="info"
                @click="forwardToPay(forwardToPayUrl)"
            >Оплатить</n-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            forwardUrl: 'https://reon.pro/email2',
            forwardToPayUrl: 'https://reon.pro/marketplace#oplata_vidgeta',
            currentPrice: 'six',
            price: [
                {
                    title: '1 месяц работы виджета в подарок при оплате',
                    period: '6 месяцев',
                    value: '5 994 ₽',
                    id: 'six'
                },
                {
                    title: '3 месяца работы виджета в подарок при оплате',
                    period: '10 месяцев',
                    value: '9 990 ₽',
                    id: 'ten'
                }
            ]
        }
    },
    methods: {
        changeCurrentPrice(priceItemId) {
            this.currentPrice = priceItemId
        },
        forwardToPay(url) {
            window.open(url);
        }
    }
}
</script>

<style>

</style>