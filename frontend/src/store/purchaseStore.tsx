
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { PurchaseDetail } from "../types/types";
import { apiClient } from "../components/ClientURL";

export const usePurchase = create<PurchaseDetail>()(
    devtools((set) => ({
        purchase: [],
        totalPurchase: 0,
        setPurchases: async (user_id: String,page: Number, limit: Number) => {
           const response = await apiClient.get(`/api/v1/getPurchase/${user_id}?page=${page}&limit=${limit}`)
           const { results } = await response.data
           const { totalPurchase, result} = results
           set(() => ({
            purchase: result,
            totalPurchase: totalPurchase
           }))
        },
        addPurchase: async (user_id: String,purchase: FormData) => {
            const response = await apiClient.post(`/api/v1/addpurchase/${user_id}`,purchase)
            const { success, message} = await response.data
            return { success, message}            
        }
    }),{name:"purchase_store"})
)