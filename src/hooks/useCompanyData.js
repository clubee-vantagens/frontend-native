import { useQuery } from "@tanstack/react-query";
import axios from 'axios'
import { api_url } from "../constants/constants";

const fetchCompany = async () => {
    const res = await axios.get(`${api_url}/users/company`)
    return res?.data
}

export function useCompanyData() {
    const query = useQuery({
        queryKey: ["users"],
        queryFn: fetchCompany,
    })
    return query
}