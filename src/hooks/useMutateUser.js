import {useMutation} from '@tanstack/react-query'
import axios from 'axios'
import {api_url} from '../constants/constants'

const mutateUsers = async (userData) => {
    try {
        const res = await axios.post(`${api_url}/users/register`, userData)
        return res.data
    } catch (error) {
        throw error
    }
}

export function useMutateUsers() {
    const {mutate, isError, error, isSuccess} = useMutation({
        mutationFn: mutateUsers,
        onError: (error) => {
            console.error('Error ocurred while mutating users:', error)
        },
        onSettled: (data, error) => {
            console.log('Mutation has settled. isError:', !!error);
        }
    })
    return {mutate, isError, error, isSuccess}
}