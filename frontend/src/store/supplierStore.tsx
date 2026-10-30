import { create } from "zustand";
import type { Suppliers, SupplierDetails } from "../types/types";
import { devtools } from "zustand/middleware";
import { apiClient } from "../components/ClientURL";

export const useSupplier = create<Suppliers>()(
    devtools((set) => ({
        supplier:[],
        setSupplier: async (user_id: String) => {
            const response = await apiClient.get(`/api/v1/getSuppliers/${user_id}`)
            const { result } = await response.data
            set(() => ({
                supplier: result
            }))
        },
        addSupplier: async(user_id: String, supplier: SupplierDetails) => {
            const response = await apiClient.post(`/api/v1/addSupplier/${user_id}`,supplier)
            const { success, message} = await response.data
            return { success, message}
        }
    }),{name: 'supplier'})
)