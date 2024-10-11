import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { api_url } from "../constants/constants";

const fetchUsers = async ({ queryKey }) => {
    const session = queryKey[1]; // Extract the session from the queryKey
    const res = await axios.get(`${api_url}/users/client`, {
        headers: {
            Authorization: `Bearer ${session}`,
        },
    });
    console.log(res?.data);
    
    return res?.data;
};

export function useUserData(session) {
    return useQuery({
        queryKey: ["users", session], // Pass the session as part of the queryKey
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
        cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
        retry: 2, // Retry failed requests twice before showing an error
        enabled: !!session, // Only run query if session is available
    });
}