import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Return, ReturnDetails } from "../types/types";
import { apiClient } from "../components/ClientURL";

export const useReturn = create<ReturnDetails>()(
    devtools((set) => ({
        return: [],
        setReturn: async (user_id: String) => {
            const response = await apiClient.get(`/api/v1/getReturn/:${user_id}`)
            const { result } = await response.data
            set(() => ({
                return: result
            }))
        },
        addReturns: async (user_id: String, detail: Return) => {
            const response = await apiClient.post(`/api/v1/addReturn/${user_id}`,detail)
            const { success, message} = await response.data
            return {success, message}
        }
    }))
)