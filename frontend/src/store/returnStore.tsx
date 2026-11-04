import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Return, ReturnDetails } from "../types/types";
import { apiClient } from "../components/ClientURL";

export const useReturn = create<ReturnDetails>()(
    devtools((set) => ({
        returns: [],
        canceleReturn: async (user_id: String) => {
            const response = await apiClient.put(`/api/v1/canceleReturn/${user_id}`)
            const { success, message} = await response.data
            return { success, message}
        },
        setReturn: async (user_id: String) => {
            const response = await apiClient.get(`/api/v1/getReturn/${user_id}`)
            console.log(response)
            const { result } = await response.data
            set(() => ({
                returns: result
            }))
        },
        addReturns: async (user_id: String, detail: Return) => {
            const response = await apiClient.post(`/api/v1/addReturn/${user_id}`,detail)
            const { success, message} = await response.data
            return {success, message}
        }
    }))
)