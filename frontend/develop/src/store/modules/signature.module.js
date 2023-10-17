import { axiosMailer } from "../../axios/axios.js"
import consts from "../../consts/consts.js"
const { roles } = consts

export default {
    namespaced: true,
    state() {
        return {
            currentSignature: '',
            signatures: {},
            url: {
                addSignature: '/signature/add',
                getSignatures: '/signature/account'
            },
            searchValue: ''
        }
    },
    getters: {
        getSignatures(state) {
            return Object.values(state.signatures)
                        .filter(user => user.ownerName.toLowerCase().includes(state.searchValue.toLowerCase().trim()))
        },
        getCurrentSignature(state) {
            return state.currentSignature
        },
        getCurrentSignatureBody(state) {
            return state.signatures[state.currentSignature]
        },
        getSearchValue(state) {
            return state.searchValue
        }
    },
    mutations: {
        updateSignatures(state, newSignatures) {
            state.signatures = newSignatures
        },
        changeCurrentSignature(state, newSignature) {
            state.currentSignature = newSignature
        },
        saveSignature(state, savedSignature) {
            state.signatures[state.currentSignature] = {...savedSignature}
        },
        updateSearchValue(state, newValue) {
            state.searchValue = newValue
        }
    },
    actions: {
        async loadSignatures({ state, commit }, managers) {
            console.log(1)
            const { subdomain, isAdmin, id: userId } = this.getters['getCurrentAmoUser']
            const { data: loadedSignatures } = await axiosMailer.post(`${state.url.getSignatures}?role=${isAdmin ? roles.admin : roles.user}&subdomain=${subdomain}&userId=${userId}`)
            console.log('loadedSignatures', loadedSignatures)
            const unificationSignatures = {};
            if(isAdmin) {
                Object
                    .values(managers)
                    .filter((manager) => manager.active)
                    .forEach((manager) => {
                        if(loadedSignatures[manager.id]) {
                            unificationSignatures[manager.id] = {
                                ownerId: manager.id,
                                ownerName: manager.title,
                                subdomain: loadedSignatures[manager.id].subdomain,
                                body: loadedSignatures[manager.id].body
                            }
                        } else {
                            unificationSignatures[manager.id] = {
                                ownerId: manager.id,
                                ownerName: manager.title,
                                subdomain: subdomain,
                                body: '<p></p>'
                            }
                        }
                    })
            } else {
                if(loadedSignatures[userId]) {
                    unificationSignatures[userId] = {
                        ownerId: userId,
                        ownerName: managers[userId].title,
                        subdomain: loadedSignatures[userId].subdomain,
                        body: loadedSignatures[userId].body
                    }
                } else {
                    unificationSignatures[userId] = {
                        ownerId: userId,
                        ownerName: managers[userId].title,
                        subdomain: subdomain,
                        body: '<p></p>'
                    }
                }
            }
            console.log('unificationSignatures', unificationSignatures)
            const [ firstUser ] = Object.values(unificationSignatures)
            const newCurrentOwnerId = firstUser.ownerId
            commit('updateSignatures', unificationSignatures)
            commit('changeCurrentSignature', newCurrentOwnerId)
        },
        async saveSignature({ state, commit }, newSignature) {
            const { data, status } = await axiosMailer.post(state.url.addSignature, {
                ...newSignature
            })
            console.log(data)
            if(status === 200) {
                commit('saveSignature', newSignature)
                // APP.notifications.show_message({
                //     header: "Внимание",
                //     text: "Подпись сохранена!"
                // });
            } else {
                // APP.notifications.show_message_error({
                //     header: "Внимание",
                //     text: "Ошибка сохранения подписи!"
                // });
            }
        }
    }
}
