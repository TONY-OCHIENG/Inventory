import { create } from "zustand";
import type { ProductDetails, Products } from "../types/types";
import { devtools } from "zustand/middleware";
import { apiClient } from "../components/ClientURL";

export const useProduct = create<ProductDetails>()(
    devtools((set) => ({
        product: [],
        createProducts: async (product: FormData, user_id: String) => {
            const response = await apiClient.post(`/api/v1/addProducts/${user_id}`,product)
            const { success, message} = await response.data
            return {success, message}
        }
    }))
)