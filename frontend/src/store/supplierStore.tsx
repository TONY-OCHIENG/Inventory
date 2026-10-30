import { create } from "zustand";
import type { Supplier, SupplierDetails } from "../types/types";
import { devtools } from "zustand/middleware";
import { apiClient } from "../components/ClientURL";

export const useSupplier = create<Supplier>()(
    devtools((set) => ({
        addSupplier: async(user_id: String, supplier: SupplierDetails) => {
            const response = await apiClient.post(`/api/v1/addSupplier/${user_id}`,supplier)
            const { success, message} = await response.data
            return { success, message}
        }
    }),{name: 'supplier'})
)