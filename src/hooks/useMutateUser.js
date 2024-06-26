import {useMutation} from '@tanstack/react-query'
import axios from 'axios'
import {api_url} from '../constants/constants'

const mutateUsers = async (userData) => {
        const res = await axios.post(`${api_url}/users/client/register`, userData)
        return res.data
    
}
export function useMutateUsers() {
    const {mutate, isError, error, isSuccess,  status} = useMutation({
        mutationFn: mutateUsers,
        onError: (error) => {
            console.error(error.response.data) 
        },
        onSettled: (data, error) => {
            if(data) console.log('Mutation successful:', data)
            if(error) console.error('Mutation failed:', error.response.data)
        }
    })
    return {mutate, isError, error, isSuccess,  status}
}