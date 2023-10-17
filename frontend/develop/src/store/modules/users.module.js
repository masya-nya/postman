import { v4 as uuid } from 'uuid'
import consts from '../../consts/consts.js'
import { axiosMailer } from "../../axios/axios.js";
import { managers, groups } from '../../mock/accountAmoUsers.js'

export default {
    namespaced: true,
    state() {
        return {
            users: {},
            url: {
                getMails: '/mails',
                verifyEmail: '/mail/verify',
                addEmail: '/mail/add',
                deleteEmail: '/mail/delete',
                checkDublicate: '/mail/check-dublicate'
            },
            searchValue: ''
        }
    },
    getters: {
        getUsers(state) {
            return Object.entries(state.users)
                .filter(([, user]) => user.title.toLowerCase().includes(state.searchValue.toLowerCase().trim()) || user.group_name.toLowerCase().includes(state.searchValue.toLowerCase().trim()))
                .sort((a, b) => b[0].charCodeAt(0) - a[0].charCodeAt(0))
        },
        getSearchValue(state) {
            return state.searchValue
        }
    },
    mutations: {
        loadAmoUsers(state) {
            let refactorUsers = {}
            state.users = Object.fromEntries(
                                Object.entries(managers)
                                    .filter(([, user]) => user.active)
                                    .map(([key, user]) => {
                                        Array.isArray(refactorUsers[user.group]) ? refactorUsers[user.group].push({key: user}) : refactorUsers[user.group] = [{key: user}]
                                        user.group_name = groups[user.group]
                                        return [key, user]
                                    })
                                )
        },
        initUsers(state, fetchUsers) {
            let users = Object.fromEntries(Object.entries(state.users).map(([id, user]) => {
                if (fetchUsers[id]) {
                    user.emails = fetchUsers[id].emails
                }
                else {
                    user.emails = [{
                        isVerify: false,
                        login: user.login,
                        from: user.title,
                        password: '',
                        isCorporative: false,
                        smtpServ: consts.smtpBase.serv,
                        smtpPort: consts.smtpBase.port,
                        mailUuid: uuid()
                    }]
                }
                return [id, user]
            }))
            if(fetchUsers.corporate) {
                users.corporate = {
                    ...fetchUsers.corporate, group: 'corporate', group_name: 'Корпоративная почта'
                }
            } else {
                users.corporate = {
                    emails: [],
                    id: 'corporate',
                    title: 'Корпоративная почта',
                    group: 'corporate',
                    group_name: 'Корпоративная почта'
                }
            }
            state.users = users
        },
        saveEmailChanges({ users }, { email: emailChanges,  userId}) {
            const emails = users[userId].emails
            let emailId = emails.indexOf(emails.find(email => email.mailUuid === emailChanges.mailUuid))
            emails[emailId] = {...emailChanges}
        },
        deleteEmail({ users }, { email: emailChanges,  userId}) {
            const emails = users[userId].emails
            let emailId = emails.indexOf(emails.find(email => email.mailUuid === emailChanges.mailUuid))
            emails.splice(emailId, 1)
        },
        saveNewEmail({ users }, { email: newEmail,  userId }) {
            users[userId].emails.push({...newEmail})
        },
        updateSearchValue(state, newValue) {
            state.searchValue = newValue
        }
    },
    actions: {
        async getMails({ state, commit }) {
            const { subdomain } = this.getters['getCurrentAmoUser']
            const { data } = await axiosMailer.post(state.url.getMails, {
                subdomain
            })
            commit('initUsers', data)
        },
        async verifyEmail({ state }, { email } ) {
            const { subdomain } = this.getters['getCurrentAmoUser']
            const { data } = await axiosMailer.post(state.url.verifyEmail, {
                ...email,
                subdomain
            })
            return data
        },
        async newEmail({ state, commit }, { email, userId, title }) {
            console.log('newEmail', email);
            const { subdomain } = this.getters['getCurrentAmoUser']
            const { data } = await axiosMailer.post(state.url.addEmail, {
                ...email,
                id: userId,
                subdomain,
                title
            })
            commit('saveNewEmail', { email, userId });
            console.log('newEmail:', data)
        },
        async saveEmailChanges({ state, commit }, { email, userId, title }) {
            const { subdomain } = this.getters['getCurrentAmoUser']
            const { data } = await axiosMailer.post(state.url.addEmail, {
                ...email,
                id: userId,
                subdomain,
                title
            })
            commit('saveEmailChanges', { email, userId })
            console.log('saveEmailChanges:', data)
        },
        async deleteEmail({ state, commit }, { email, userId }) {
            const { subdomain } = this.getters['getCurrentAmoUser']
            const { data } = await axiosMailer.post(state.url.deleteEmail, {
                ...email,
                subdomain
            })
            commit('deleteEmail', { email, userId })
            console.log(data)
        },
        async emailDuplicateCheck({ state }, { login }) {
            const { subdomain } = this.getters['getCurrentAmoUser']
            const { data } = await axiosMailer.post(state.url.checkDublicate, { login, subdomain })
            console.log(data.isExist);
            return data.isExist
        }
    }
}