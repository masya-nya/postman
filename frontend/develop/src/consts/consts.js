export default {
    axios: {
        url: 'https://widev7.reon.pro/widgets/postman',
        timeout: 50000
    },
    groupsColors: ['#D1A4DC','#FF8F92','#FFC8C8','#C7DB8C','#AABDFF','#FFE193','#90CDB0','#A9A5D7','#D8D5FF','#86C0FC','#F2DDF7',
    ],
    settingAmoFieldsName: {
        client_name: 'client_name',
        phone_number: 'phone_number',
        terms_of_use: 'terms_of_use',
        users_rights: 'users_rights'
    },
    entityCards: {
        lead: 'leads_card',
        contact : 'contacts_card',
        company: 'companies_card'
    },
    statuses: {
        success: 200
    },
    smtpBase: {
        serv: 'smtp.yandex.ru',
        port: '465'
    },
    roles: {
        admin: 'admin',
        user: 'user'
    },
    groupFreeUsersId: 'group_free_users',
    userRightsFilterKeys: {
        all: 'all',
        group: 'group',
        admin: 'isMailerAdmin'
    },
    entityTypes: {
        lead: 'lead',
        contact: 'contact',
        companie: 'companie'
    },
    corporateMailsId: 'corporate',
    modifiers: {
        uppercase: {
            value: 'uppercase',
            arg: false
        },
        lowercase: {
            value: 'lowercase',
            arg: false
        },
        first_to_upper: {
            value: 'first_to_upper',
            arg: false
        },
        del_miss_space: {
            value: 'del_miss_space',
            arg: false
        },
        num_to_fraction: {
            value: 'num_to_fraction',
            arg: false
        },
        countSymbolsAfterDot: {
            value: 'countSymbolsAfterDot',
            arg: true
        },
        rounding_up: {
            value: 'rounding_up',
            arg: false
        },
        rounding_down: {
            value: 'rounding_down',
            arg: false
        },
        num_to_writing: {
            value: 'num_to_writing',
            arg: false
        }
    }
}