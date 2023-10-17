<template>
    <div class="reon-settings-user-rights__list-item">
        <div class="reon-settings-user-rights__list-item-name">
            <div class="reon-settings-user-rights__list-item-name-inner">
                {{ name }}
            </div>
        </div>
        <div class="reon-settings-user-rights__list-item-group">
            <div 
                :style="{ color: groupInfo.color }"
                class="reon-settings-user-rights__list-item-group-inner">
                {{ groupInfo.label }}
            </div>
        </div>
        <div class="reon-settings-user-rights__list-item-admin">
            <div class="reon-settings-user-rights__list-item-admin-inner">
                <n-checkbox
                    v-model:checked="toggleAdminUser"
                />
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        name: {
            type: String
        },
        id: {
            type: String
        },
        isAdmin: {
            type: Boolean
        },
        groupInfo: {
            type: Object
        }
    },
    data() {
        return {
            toggleAdminUser: this.isAdmin
        }
    },
    methods: {
    },
    watch: {
        toggleAdminUser: function(newValue) {
            this.$store.commit('usersRights/toggleAdminUser', { checked: newValue, managerId: this.id})
        }
    }
}
</script>

<style scoped>
.reon-settings-user-rights__list-item {
    display: grid;
    grid-template-columns: 14fr 10fr 9fr;
    align-items: center;
}
.reon-settings-user-rights__list-item > * {
    padding: 10px;
}

</style>