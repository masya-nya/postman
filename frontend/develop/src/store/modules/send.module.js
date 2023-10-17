import { axiosMailer } from "../../axios/axios.js"
// import axios from "axios"
import consts from '../../consts/consts.js'
const { roles } = consts

export default {
    namespaced: true,
    state() {
        return {
            url: {
                getPattern: '/template',
                getUserEmails: '/mail/user',
                sendMessage: '/send-message',
                getUserPatterns: '/templates/account',
                messagePreview: '/message-preview',
                userSignature: '/signature/user',
                mailContact: '/mail/contact'
            },
            amoUser: {
                id: '',
                subdomain: '',
                isAdmin: false,
                name: ''
            },
            attachedFilesKeyName: 'attachedFiles'
        }
    },
    getters: {
    },
    mutations: {
        loadAmoUserInfo(state, userInfo) {
            state.amoUser = {...userInfo}
        }
    },
    actions: {
        async loadPattern({ state }, {patternId , dealId}) {
            const { subdomain } = state.amoUser
            const { getPattern } = state.url
            const { data: pattern } = await axiosMailer.post(`${getPattern}?subdomain=${subdomain}&id=${patternId}&leadId=${dealId}`);
            return pattern
        },
        async loadSignature({ state }) {
            const { subdomain, id } = state.amoUser
            const { userSignature } = state.url
            const { data: signature } = await axiosMailer.post(`${userSignature}?subdomain=${subdomain}&userId=${id}`);
            return signature
        },
        async loadContactMail({ state }, {dealId}) {
            const { subdomain } = state.amoUser;
            const { mailContact } = state.url
            const { data: contactMail } = await axiosMailer.post(`${mailContact}?leadId=${dealId}&subdomain=${subdomain}`);
            return contactMail;
        },
        async loadUserEmails({ state }) {
            const { id, subdomain } = state.amoUser
            const { getUserEmails } = state.url
            const { data: userEmails } = await axiosMailer.post(`${getUserEmails}?subdomain=${subdomain}&id=${id}&role=${roles.user}`);
            return userEmails
        },
        async loadLinkedLeads() {
            // const { data: contactData } = await axios.get('/api/v4/contacts?id=635953&with=leads')
            // const [ contact ] = contactData._embedded.contacts
            // const { leads: ids } = contact._embedded  
            // const { data: leadsData  } = await axios.get(`/api/v4/leads?${ids.map(({id}, index) => `filter[id][${index}]=${id}`).join("&")}`)
            // const { leads: linkedLeads } = leadsData._embedded
            const linkedLeads = [{id: 10857991, name: 'Продажа чего то'}]
            return linkedLeads
        },
        async getUsersPatterns({ state }) {
            const { id, subdomain } = state.amoUser
            const { getUserPatterns } = state.url
            const { data: patterns } = await axiosMailer.post(`${getUserPatterns}?subdomain=${subdomain}&id=${id}&role=${roles.user}`);
            return patterns 
        },
        async sendMessage({ state }, messageData) {
            const { subdomain, id } = state.amoUser
            const { sendMessage } = state.url
            const { attachedFilesKeyName } = state

            let formData = new FormData();
            formData.append('subdomain', subdomain)
            formData.append('userId', id)
            
            Object.keys(messageData).forEach(key => {
                if(key === attachedFilesKeyName) {
                    formData.append('serverFiles', JSON.stringify(messageData[key].filter(file => !file.lastModified)));
                    messageData[key].forEach(file => {
                        formData.append('file', file);
                    })
                } else {
                    if(Array.isArray(messageData[key])) {
                        formData.append(key, JSON.stringify(messageData[key]))
                    } else {
                        formData.append(key, messageData[key])
                    }
                }
            })

            axiosMailer.post(sendMessage,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
        },
        async getPreview({ state }, message) {
            const { subdomain, id } = state.amoUser
            const { body, isSignatureUse, dealId } = message
            const { messagePreview } = state.url
            const { data: previewMessage } = await axiosMailer.post(messagePreview, {
                body: body,
                isSignatureUse: isSignatureUse,
                subdomain,
                signatureOwnerId: id,
                dealId: dealId
            });
            return previewMessage
        }
    }
}