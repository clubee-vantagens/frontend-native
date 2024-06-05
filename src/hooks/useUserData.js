import { useQuery } from "@tanstack/react-query";
import axios from 'axios'
import { api_url } from "../constants/constants";

const fetchUsers = async () => {
    const res = await axios.get(`${api_url}/users`)
    return res?.data
}

export function useUserData() {
    const query = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    })
    return query
}