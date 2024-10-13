import Constants from 'expo-constants';

const ip = Constants.manifest2.extra.expoGo.debuggerHost.split(':').shift()





// export const api_url = 'http://localhost:8080/api'
export const api_url = `http://${ip}:8080/api`