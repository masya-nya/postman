import { managers, groups } from '../../mock/accountAmoUsers.js';
import consts from '../../consts/consts.js';
const { groupFreeUsersId, userRightsFilterKeys } = consts;
const { all, group, admin } = userRightsFilterKeys;

export default {
    namespaced: true,
    state() {
        return {
            managers: {},
            filteredManagers: {},
            managersGroups: [],
            allUsersIds: [],
            checkedUsersList: [],
            filters: {
                [group]: {
                    type: group,
                    value: all,
                },
                [admin]: {
                    type: admin,
                    value: all,
                }
            },
            baseFilterPattern: [{ label: 'Все', value: all }],
            isAdminFilterOptions: [
                { label: 'Все', value: all },
                { label: 'Активные', value: true },
                { label: 'Не активные', value: false }
            ],
            groupsColors: ['#98cbff', '#ccc8f9', '#ffce5a', '#f3beff', '#87f2c0', '#ff8f92', '#ffdc7f', '#ffeab2', '#deff81', '#f9deff', '#eb93ff', '#ffdbdb', '#d6eaff', '#ffc8c8'],
        }
    },
    getters: {
        getManagers({ filteredManagers }) {
            return filteredManagers
        },
        getManagersGroupsForFilter({ baseFilterPattern, managersGroups }) {
            return baseFilterPattern.concat(managersGroups)
        },
        getIsAdminFilterOptions({ isAdminFilterOptions }) {
            return isAdminFilterOptions
        },
        getAllUsersIds({ allUsersIds }) {
            return allUsersIds
        },
        getGroupFilterValue({ filters }) {
            return filters.group.value
        },
        getAdminFilterValue({ filters }) {
            return filters.isMailerAdmin.value
        },
        getCheckedUsersList({ checkedUsersList }) {
            return checkedUsersList
        }
    },
    mutations: {
        loadAmoUsers(state, selfSettings) {
            const { groupsColors } = state
            let allUsersIds = []
            const selfSettingsUsers = selfSettings.users_rights ? Object.values(JSON.parse(selfSettings.users_rights)) : []
            const collectedGroups = Object.fromEntries(Object.entries(groups)
                .filter(([group]) => group !== groupFreeUsersId)
                .map(([group, group_name], indx) => {
                    const collectedGroup = {
                        label: group_name,
                        value: group,
                        color: groupsColors[indx % groupsColors.length]
                    }
                    return [group, collectedGroup]
                }))
            
            const collectedManagers = Object.values(managers)
                .filter((user) => user.active)
                .map((user) => {
                    user.group_info = collectedGroups[user.group]
                    user.id = +user.id
                    user.isMailerAdmin = selfSettingsUsers.includes(user.id)
                    allUsersIds.push(user.id)
                    return user
                })
            
            state.managers = collectedManagers;
            state.filteredManagers = collectedManagers;
            state.managersGroups = Object.values(collectedGroups);
            state.checkedUsersList = selfSettingsUsers
            state.allUsersIds = allUsersIds;
        },
        setNewModelValue(state, { model, value }) {
            state[model].value = value;
        },
        setNewNestModelValue(state, { model, subset, value }) {
            state[model][subset].value = value;
        },
        allCheckboxesToogle(state, checked) {
            const { allUsersIds } = state
            if(checked) {
                state.allCheckedUsers = [...allUsersIds]
            } else {
                state.allCheckedUsers = null
            }
        },
        clearFilters(state) {
            const { filters } = state
            Object.keys(filters).forEach((filterType) => {
                state.filters[filterType].value = all;
            })
        },
        filterManagers(state) {
            const { managers, filters } = state
            let filteredList = [...managers]
            Object.entries(filters).forEach(([, filter]) => {
                if (filter.value !== all) {
                    filteredList = filteredList.filter(user => user[filter.type] === filter.value)
                }
            })
            state.filteredManagers = filteredList
        },
        toggleAdminUser(state, { checked, managerId }) {
            const { checkedUsersList, managers } = state;
            let newManagersList = [...managers];
            newManagersList[newManagersList.findIndex(manager => manager.id === managerId)].isMailerAdmin = checked;
            state.filterManagers = newManagersList;
            state.managers = newManagersList;
            if(checked) {                       
                state.checkedUsersList.push(managerId)
            } else {
                let newCheckedUsersList = [ ...checkedUsersList ]
                newCheckedUsersList.splice(newCheckedUsersList.findIndex(id => id === managerId), 1)
                state.checkedUsersList = newCheckedUsersList
            }
        },
        managersSearch(state, value) {
            const { managers } = state
            let foundedManagers = [...managers]
            foundedManagers = foundedManagers.filter(manager => manager.title.toLowerCase().includes(value.toLowerCase()))
            state.filteredManagers = foundedManagers
        }
    },
    actions: {

    }
}