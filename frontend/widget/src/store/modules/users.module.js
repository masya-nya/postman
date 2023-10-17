import { v4 as uuid } from 'uuid'
import consts from '../../consts/consts.js'
import { axiosMailer } from "../../axios/axios.js";
const { statuses } = consts
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
            state.users = Object.fromEntries(
                                Object.entries(managers)
                                    .filter(([, user]) => user.active)
                                    .map(([key, user]) => {
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
            const emailId = emails.indexOf(emails.find(email => email.mailUuid === emailChanges.mailUuid))
            emails[emailId] = {...emailChanges}
        },
        deleteEmail({ users }, { email: emailChanges,  userId}) {
            const emails = users[userId].emails
            const emailId = emails.indexOf(emails.find(email => email.mailUuid === emailChanges.mailUuid))
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
            const { subdomain } = this.getters['getCurrentAmoUser']
            const { url } = state;
            const { status } = await axiosMailer.post(url.addEmail, {
                ...email,
                id: userId,
                subdomain,
                title
            })
            if(status === statuses.success) {
                commit('saveNewEmail', { email, userId });
                APP.notifications.show_message({
                    header: "Внимание",
                    text: "Email добавлен!"
                });
            } else {
                APP.notifications.show_message_error({
                    header: "Внимание",
                    text: "Ошибка добавления email'а!"
                });
            }
        },
        async saveEmailChanges({ state, commit }, { email, userId, title }) {
            const { subdomain } = this.getters['getCurrentAmoUser']
            const { url } = state;
            const { status } = await axiosMailer.post(url.addEmail, {
                ...email,
                id: userId,
                subdomain,
                title
            })
            if(status === statuses.success) {
                commit('saveEmailChanges', { email, userId })
                APP.notifications.show_message({
                    header: "Внимание",
                    text: "Email сохранен!"
                });
            } else {
                APP.notifications.show_message_error({
                    header: "Внимание",
                    text: "Ошибка сохранения email'а!"
                });
            }
            
        },
        async deleteEmail({ state, commit }, { email, userId }) {
            const { subdomain } = this.getters['getCurrentAmoUser']
            const { url } = state;
            const { status } = await axiosMailer.post(url.deleteEmail, {
                ...email,
                subdomain
            })
            if(status === statuses.success) {
                commit('deleteEmail', { email, userId })
                APP.notifications.show_message({
                    header: "Внимание",
                    text: "Email удален!"
                });
            } else {
                APP.notifications.show_message_error({
                    header: "Внимание",
                    text: "Ошибка удаления email'а!"
                });
            }
        },
        async emailDuplicateCheck({ state }, { login }) {
            const { subdomain } = this.getters['getCurrentAmoUser']
            const { data } = await axiosMailer.post(state.url.checkDublicate, { login, subdomain })
            return data.isExist
        }
    }
}