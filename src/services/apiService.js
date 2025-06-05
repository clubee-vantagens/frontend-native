import axios from 'axios';
import apiConfig, {api_url} from "./apiConfig";

class apiService {
    constructor() {
        this.axios = axios.create({
        baseURL: api_url,
        });
    }

    // Autenticação de usuário
    login(email, password) {
        return this.axios.post(`${apiConfig.authEndpoint}/login`, { email, password });
    }

    refreshToken(session, refreshToken) {
        console.log("refreshTokenEndpoint")
        console.log(session)
        console.log(refreshToken)
        console.log("refreshTokenEndpoint")
        return this.axios.post(`${apiConfig.authEndpoint}/refresh`, { session, refreshToken });
    }

    // Clients
    // Finalizado
    userRegister(userData) {
        return this.axios.post(`${apiConfig.clientsEndpoint}/register`, userData)
    }

    userGetData(session) {
        return this.axios.get(`${apiConfig.clientsEndpoint}/me`, {
            headers: {
                Authorization: `Bearer ${session}`
            },
        });
    }

    userEditData(userData, session) {
        return this.axios.put(`${apiConfig.clientsEndpoint}/me`, userData, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
    }

    userDeleteData(session) {
        return this.axios.delete(`${apiConfig.clientsEndpoint}/me`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
    }
}

export default new apiService();    