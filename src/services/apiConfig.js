import Constants from 'expo-constants';

const ip = Constants.manifest2.extra.expoGo.debuggerHost.split(':').shift()

// export const  = 'http://localhost:8080/api'
export const api_url = `http://${ip}:8080/api`
export const statusBarHeight = Constants.statusBarHeight

export default {
    api_url,
    // Autenticação de usuário
    authEndpoint: `${api_url}/auth`,

    // Client
    clientsEndpoint: `${api_url}/users/clients`,

    // Password
    passwordEndpoint: `${api_url}/passwords`,

    // Companies
    companiesEndpoint: `${api_url}/users/companies`
}