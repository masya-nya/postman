export default {
    namespaced: true,
    state() {
        return {
            currentTab: 'settings',
            tabs: [
                {
                    name: 'настройки',
                    value: 'settings'
                },
                {
                    name: 'пользователи',
                    value: 'users'
                },
                {
                    name: 'подписка',
                    value: 'subscription'
                }
            ]
        }
    },
    getters: {
        getCurrentTab({ currentTab }) {
            return currentTab
        },
        getTabs({ tabs }) {
            return tabs
        }
    },
    mutations: {
        changeCurrentTab(state, newCurrentTab) {
            state.currentTab = newCurrentTab
        }
    },
    actions: {

    }
}