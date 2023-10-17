import baseCf from '../../mock/base_cf.js'
import consts from '../../consts/consts.js'

export default {
    namespaced: true,
    state() {
        return {
            currentVariable: {
                id: '',
                entity_type: '',
                modife: ''
            },
            variables: {},
            mergedVariables: [],
            fetchVariables: []
        }
    },
    getters: {
        getCurrentVariable({ currentVariable }) {
            return currentVariable
        },
        getVariables({ variables }) {
            return variables
        }
    },
    mutations: {
        changeCurrentVariable({ currentVariable }, variable) {
            currentVariable.id = variable.id
            currentVariable.entity_type = variable.entity_type
            currentVariable.modife = ''
        },
        changeModife({ currentVariable }, newModife) {
            currentVariable.modife = newModife
        },
        getSortedVariables(state) {
            state.variables = {}
            const amoVariables = {
                lead: [],
                contact: [],
                company: []
            }
            state.mergedVariables.forEach(([, field]) => {
                if(field.ENTREE_DEALS) {
                    amoVariables.lead.push({
                        sort: field.SORT,
                        entity_type: consts.entityTypes.lead,
                        name: field.NAME,
                        id: field.ID
                    })
                }
                if(field.ENTREE_COMPANY) {
                    amoVariables.company.push({
                        sort: field.SORT,
                        entity_type: consts.entityTypes.company,
                        name: field.NAME,
                        id: field.ID
                    })
                }
                if(field.ENTREE_CONTACTS) {
                    amoVariables.contact.push({
                        sort: field.SORT,
                        entity_type: consts.entityTypes.contact,
                        name: field.NAME,
                        id: field.ID
                    })
                }
            })
            Object.keys(amoVariables).forEach(entity => {
                amoVariables[entity].sort((a ,b) => a.sort - b.sort)
            })
            state.variables = amoVariables
        },
        searchingVariable(state, value) {
            const serchClone = state.fetchVariables.filter(([, variable]) => variable.NAME.toLowerCase().includes(value.toLowerCase()))
            state.mergedVariables = serchClone
            this.commit('interpolation/getSortedVariables')
        },
        copyVariablesForSearch(state) {
            state.fetchVariables = state.mergedVariables
        }
    },
    actions: {
        async loadAmoCustomFileds({ state, commit }) {
            state.mergedVariables = [];
            state.variables = {};
            const filteredPredifinedCf = Object.entries(APP.constant("account").predefined_cf).filter(([, field]) => field.TYPE_ID !== 21)
            state.mergedVariables = Object.entries(Object.assign(APP.constant("account").cf, Object.fromEntries(filteredPredifinedCf), baseCf))
            commit('copyVariablesForSearch')
            commit('getSortedVariables')
        }
    }
}