import { v4 as uuid } from 'uuid'
import { axiosMailer } from '../../axios/axios.js';
import consts from '../../consts/consts.js';
const { roles, statuses } = consts

export default {
    namespaced: true,
    state() {
        return {
            currentPattern: '',
            currentPatternBody: {},
            url: {
                postPattern: '/template/add',
                getPatterns: '/templates/account',
                getPattern: '/template?subdomain=',
                postDeletePattern: '/template/delete?subdomain='
            },
            addingPatternStatus: false,
            patterns: [],
            fetchPatterns: [],
            groupedPatterns: {}
        }
    },
    getters: {
        getCurrentPattern(state) {
            return state.currentPattern
        },
        getCurrentPatternBody(state) {
            return state.currentPatternBody
        },
        getFetchPatterns(state) {
            return state.fetchPatterns
        },
        getAddingPatternStatus(state) {
            return state.addingPatternStatus
        },
        getGroupedPatterns(state) {
            return state.groupedPatterns
        }, 
        getSortedGroupsPatterns(state) {
            return state.sortedGroupsPatterns
        },
    },
    mutations: {
        changeCurrentPattern(state, patternId) {
            state.addingPatternStatus = false;
            state.currentPattern = patternId;
        },
        buildGroupPatterns(state) {
            const newPatterns = {}
            state.patterns.forEach(pattern => {
                if (pattern.isPublic) {
                    if (!newPatterns['public']) {
                        newPatterns['public'] = {
                            isPublic: true,
                            authorId: pattern.authorId,
                            patterns: []
                        }
                    }
                    newPatterns['public'].patterns.push({...pattern})
                }
                else {
                    if (!newPatterns[pattern.authorId]) {
                        newPatterns[pattern.authorId] = {
                            isPublic: false,
                            authorId: pattern.authorId,
                            patterns: []
                        }
                    }
                    newPatterns[pattern.authorId].patterns.push({...pattern})
                }
            })
            state.groupedPatterns = newPatterns
        },
        createNewPattern(state) {
            const { name, id } = this.getters['getCurrentAmoUser']
            if(!state.addingPatternStatus) {
                const newPatternId = uuid()
                state.currentPatternBody = {
                    id: newPatternId,
                    name: '',
                    title: '',
                    body: '<p></p>',
                    receiverType: 0,
                    isPublic: false,
                    isSignatureUse: false,
                    receiver: [],
                    author: name,
                    authorId: id,
                    files: [],
                    filesLinks: []
                }
                state.currentPattern = newPatternId;
                state.addingPatternStatus = true;
            }
        },
        deletePattern(store, patternId){
            // Функция удаления и сохранения не существует в слуачаях пустого стейта, проверку на -1 решил не добавлять
            store.patterns.splice(store.patterns.findIndex(pattern => pattern.id === patternId), 1)
            store.fetchPatterns = JSON.parse(JSON.stringify(store.patterns))
            this.commit('pattern/buildGroupPatterns')
        },
        saveChanges(state, pattern) {
            if(state.addingPatternStatus) {
                state.patterns.push({...pattern})
                this.commit('pattern/buildGroupPatterns')
                state.addingPatternStatus = false;
            } else {
                // Функция удаления и сохранения не существует в слуачаях пустого стейта, проверку на -1 решил не добавлять
                const patternIndx = state.patterns.findIndex(ptrn => ptrn.id === pattern.id)
                state.patterns[patternIndx] = pattern
                this.commit('pattern/buildGroupPatterns')
            }
        },
        changeCurrentPatternBody(state, newCurrentPattern) {
            if(newCurrentPattern) {
                state.currentPatternBody = newCurrentPattern;
            } else {
                state.currentPatternBody = {};
            }
        },
        searchingPattern(state, searchValue) {
            const searchedPatterns = state.fetchPatterns.filter(pattern => pattern.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
            state.patterns = searchedPatterns
            this.commit('pattern/buildGroupPatterns')
        },
    },
    actions: {
        async getPatterns({ state, commit }) {
            const { subdomain, id, isAdmin } = this.getters['getCurrentAmoUser']
            const { data: fetchPatterns } = await axiosMailer.post(`${state.url.getPatterns}?subdomain=${subdomain}&id=${id}&role=${isAdmin ? roles.admin : roles.user}`)
            state.fetchPatterns = fetchPatterns;
            state.patterns = fetchPatterns;
            state.currentPattern = fetchPatterns[0]?.id ?? ''
            commit('buildGroupPatterns')
        },
        async getPattern({ state, commit }) {
            const { subdomain } = this.getters['getCurrentAmoUser']
            const { currentPattern, url, addingPatternStatus } = state
            if(currentPattern === '') {
                commit('createNewPattern')
            }
            if(!addingPatternStatus) {
                const { data } = await axiosMailer.post(url.getPattern + subdomain + '&id=' + currentPattern)
                commit('changeCurrentPatternBody', data)
            }
        },
        async postPatternChanges({ state, commit }, pattern) {
            const { url } = state;
            const { subdomain } = this.getters['getCurrentAmoUser']
            const formData = new FormData();
            formData.append('subdomain', subdomain);
            const patternObjCopy = Object.assign({}, pattern);
            patternObjCopy.files? patternObjCopy.filesLinks = patternObjCopy.files.filter(file => file.path): patternObjCopy.filesLinks
            Object.keys(patternObjCopy).forEach(key => {
                if(key === 'files') {
                    patternObjCopy[key].forEach(file => {
                        formData.append('file', file);
                    })
                } else {
                    if(Array.isArray(patternObjCopy[key])) {
                        formData.append(key, JSON.stringify(patternObjCopy[key]))
                    } else {
                        formData.append(key, patternObjCopy[key])
                    }
                }
            })
            const { status } = await axiosMailer.post(url.postPattern, 
                formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            if(status === statuses.success) {
                commit('saveChanges', pattern)
                APP.notifications.show_message({
                    header: "Внимание",
                    text: "Шаблон сохранен!"
                });
            } else {
                APP.notifications.show_message_error({
                    header: "Внимание",
                    text: "Ошибка сохранения шаблона!"
                });
            }
        },
        async deletePattern({ state, commit }) {
            const { subdomain } = this.getters['getCurrentAmoUser']
            const { url, currentPattern, patterns } = state;
            const { status } = await axiosMailer.post(url.postDeletePattern + subdomain + '&id=' + currentPattern)
            if(status === statuses.success) {
                commit('deletePattern', currentPattern)
                commit('changeCurrentPattern', patterns[0]?.id ?? '')
                APP.notifications.show_message({
                    header: "Внимание",
                    text: "Шаблон удален!"
                });
            } else {
                APP.notifications.show_message_error({
                    header: "Внимание",
                    text: "Ошибка удаления шаблона!"
                });
            }
        }
    }
}