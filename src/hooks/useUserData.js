import { useQuery } from "@tanstack/react-query";
import axios from 'axios'
import { api_url } from "../constants/constants";

const fetchUsers = async () => {
    const res = await axios.get(`${api_url}/users/client/all`, {
        headers: {
            Authorization: 'd'
        }
    })
    return res?.data
}

export function useUserData() {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
        cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
        retry: 2, // Retry failed requests twice before showing an error
    });
}