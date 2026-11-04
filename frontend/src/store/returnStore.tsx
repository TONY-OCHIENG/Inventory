import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Return, ReturnDetails } from "../types/types";
import { apiClient } from "../components/ClientURL";

export const useReturn = create<ReturnDetails>()(
    devtools((set) => ({
        addReturns: async (user_id: String, detail: Return) => {
            const response = await apiClient.post(`/api/v1/addReturn/${user_id}`,detail)
            const { success, message} = await response.data
            return {success, message}
        }
    }))
)