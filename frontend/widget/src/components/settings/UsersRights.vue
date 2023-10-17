<template>
    <div class="reon-settings-user-rights">
        <div class="reon-settings-user-rights__header">
            <div class="reon-settings-user-rights__header-search">
                <input 
                    type="text" 
                    placeholder="Поиск: введите и нажмите Enter" 
                    class="reon-settings-user-rights__header-search-input"
                    @keyup.enter="managersSearch"
                    @keydown.enter="clearFilters"
                >
            </div>
            <div class="reon-settings-user-rights__header-group">
                <n-select
                    v-model:value="getGroupFilterValue"
                    :options="getManagersGroupsForFilter"
                />
            </div>
            <div class="reon-settings-user-rights__header-admin">
                <n-select
                    v-model:value="getAdminFilterValue"
                    :options="getIsAdminFilterOptions"
                />
            </div>
        </div>
        <div class="reon-settings-user-rights__list">
            <user-rights-item 
                v-for="manager in getManagers" :key="manager.id"
                :name="manager.title"
                :id="manager.id"
                :isAdmin="manager.isMailerAdmin"
                :groupInfo="manager.group_info"
            />
        </div>
    </div>
</template>

<script>
import UserRightsItem from './UserRightsItem.vue';

export default {
    data() {
        return {
        }
    },
    computed: {
        getManagers() {
            return this.$store.getters['usersRights/getManagers']
        },
        getManagersGroupsForFilter() {
            return this.$store.getters['usersRights/getManagersGroupsForFilter']
        },
        getIsAdminFilterOptions() {
            return this.$store.getters['usersRights/getIsAdminFilterOptions']
        },
        getAdminFilterValue: {
            get() {
                return this.$store.getters['usersRights/getAdminFilterValue']
            },
            set(value) {
                this.$store.commit('usersRights/setNewNestModelValue', { model: 'filters', subset: 'isMailerAdmin', value })
            }
        },
        getGroupFilterValue: {
            get() {
                return this.$store.getters['usersRights/getGroupFilterValue']
            },
            set(value) {
                this.$store.commit('usersRights/setNewNestModelValue', { model: 'filters', subset: 'group', value })
            }
        }
    },
    methods: {
        managersSearch(event) {
            const { value } = event.target
            this.$store.commit('usersRights/managersSearch', value)
        },
        clearFilters() {
            this.$store.commit('usersRights/clearFilters')
        }
    },
    watch: {
        '$store.state.usersRights.filters.isMailerAdmin.value': function() {
            this.$store.commit('usersRights/filterManagers')
        },
        '$store.state.usersRights.filters.group.value': function() {
            this.$store.commit('usersRights/filterManagers')
        },
        getAllCheckboxesToogle: function(checked) {
            this.$store.commit('usersRights/allCheckboxesToogle', checked)
        }
    },
    beforeMount() {
        this.$store.commit('usersRights/loadAmoUsers', this.$self.get_settings())
    },
    components: { UserRightsItem }
}
</script>

<style>
.reon-settings-user-rights {
    border: 1px solid #ccc;
    border-radius: 3px;
}
.reon-settings-user-rights__header {
    display: grid;
    grid-template-columns: 7fr 5fr 5fr;
    align-items: center;
    border-bottom: 1px solid #ccc;
}
.reon-settings-user-rights__header > * {
    display: flex;
    align-items: center;
    height: 100%;
}
.reon-settings-user-rights__list {
    display: flex;
    flex-direction: column;
    height: 250px;
    overflow-y: scroll;
}
.reon-settings-user-rights__list >* {
    border-bottom: 1px solid #ccc;
}
.reon-settings-user-rights__header-search {
    padding: 10px;
    border-right: 1px solid #ccc;
}
.reon-settings-user-rights__header-search-input {
    width: 100%;
    font-size: 13px;
}
.reon-settings-user-rights__header-group {
    border-right: 1px solid #ccc;
}
/* Без important работать не будет */
.reon-settings-user-rights__header .n-base-selection__border {
    border: none !important;
}
.reon-settings-user-rights__header .n-base-selection:hover {
    border: none !important;
}
</style>