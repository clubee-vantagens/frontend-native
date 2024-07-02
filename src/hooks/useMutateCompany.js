import {useMutation} from '@tanstack/react-query'
import axios from 'axios'
import {api_url} from '../constants/constants'

const mutateCompany = async (userData) => {
        const res = await axios.post(`${api_url}/users/company/register`, userData)
        return res.data
    
}
export function useMutateCompany() {
    const {mutate, isError, error, isSuccess, isLoading, status} = useMutation({
        mutationFn: mutateCompany,
        onError: (error) => {
            console.error(error.response.data) 
        },
        onSettled: (data, error) => {
            if(data) console.log('Mutation successful:', data)
            if(error) console.error('Mutation failed:', error.response)
        }
    })
    return {mutate, isError, error, isSuccess, isLoading, status}
}