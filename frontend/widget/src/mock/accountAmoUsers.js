const { id: userId, name } = AMOCRM.constant('user');
const { subdomain, id: accountId } = APP.constant("account");

export const user = {
    name: name,
    id: userId,
    subdomain: subdomain,
    accountId: accountId
}
export const managers = APP.constant("managers")
export const groups = APP.constant("groups")