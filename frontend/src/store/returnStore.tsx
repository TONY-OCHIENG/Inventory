import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Return, ReturnDetails } from "../types/types";
import { apiClient } from "../components/ClientURL";

export const useReturn = create<ReturnDetails>()(
    devtools((set) => ({
        returns: [],
        totalReturn: 0,
        pendingReturn: 0,
        completedReturn: 0,
        setcompletedReturn: async (user_id: String) => {
            const response = await apiClient.get(`/api/v1/completedReturn/${user_id}`)
            const { result } = await response.data
            set(() => ({
                completedReturn: result
            }))
        },
        setpendingReturn: async (user_id: String) => {
            const response = await apiClient.get(`/api/v1/pendingReturn/${user_id}`)
            const { result } = await response.data
            set(() => ({
                pendingReturn: result
            })) 
        },
        settotalReturn: async (user_id: String) => {
            const response = await apiClient.get(`/api/v1/totalReturn/${user_id}`)
            const { result } = await response.data
            set(() => ({
                totalReturn: result
            }))
        },
        canceleReturn: async (user_id: String) => {
            const response = await apiClient.put(`/api/v1/canceleReturn/${user_id}`)
            const { success, message} = await response.data
            return { success, message}
        },
        deleteReturn: async (return_id: String) => {
            const response = await apiClient.delete(`/api/v1/deleteReturn/${return_id}`)
            const { success, message} = await response.data
            return { success, message}
        },
        completeReturn: async (return_id: String) => {
            const response = await apiClient.put(`/api/v1/completeReturn/${return_id}`)
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