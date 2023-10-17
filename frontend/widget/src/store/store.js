import { createStore } from 'vuex';
import pattern from './modules/pattern.module'
import users from './modules/users.module'
import signature from './modules/signature.module';
import interpolation from './modules/interpolation.module';
import send from './modules/send.module';
import settings from './modules/settings.module';
import usersRights from './modules/usersRights.module';

export const store = createStore({
    state() {
        return {
            currentPage: 'pattern',
            pages: [
                {
                    name: 'pattern',
                    title: 'Шаблоны'
                },
                {
                    name: 'users',
                    title: 'Пользователи'
                },
                {
                    name: 'signature',
                    title: 'Подписи'
                }
            ],
            currentAmoUser: {
                name: '',
                id: '',
                isAdmin: false,
                subdomain: '',
                accountId: null
            } 
        }
    },
    getters: {
        getCurrentPage(state) {
            return state.currentPage
        },
        getPagesNames(state) {
            return state.pages
        },
        getCurrentAmoUser(state) {
            return state.currentAmoUser
        }
    },
    mutations: {
        changeCurrentPost(state, id) {
            state.currentPage = id
        },
        updateUserInfo(state, amoUser) {
            state.currentAmoUser = {...amoUser}
        }
    },
    actions: {
    },
    modules: {
        pattern,
        users,
        signature,
        interpolation,
        send,
        settings,
        usersRights
    }
}) 