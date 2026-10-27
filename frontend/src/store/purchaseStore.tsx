
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { PurchaseDetail } from "../types/types";
import { apiClient } from "../components/ClientURL";

export const usePurchase = create<PurchaseDetail>()(
    devtools((set) => ({
        purchase: [],
        setPurchases: async (user_id: String) => {
           
        },
        addPurchase: async (user_id: String,purchase: FormData) => {
            const response = await apiClient.post(`/api/v1/addpurchase/${user_id}`,purchase)
            const { success, message} = await response.data
            return { success, message}            
        }
    }),{name:"purchase_store"})
)