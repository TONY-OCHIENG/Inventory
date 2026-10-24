import { create } from "zustand";
import type { ProductDetails, Products } from "../types/types";
import { devtools } from "zustand/middleware";
import { apiClient } from "../components/ClientURL";

export const useProduct = create<ProductDetails>()(
    devtools((set) => ({
        product: [],
        setProducts: async (user_id: String,page: Number, limit: Number) => {
          const response = await apiClient.get(`api/v1/products/${user_id}?page=${page}&limit=${limit}`)
          const { result} = response.data
          set(() => ({
            product: result
          }))
        },
        deleteProduct: async (product_id: String) => {
          const response = await apiClient.delete(`/api/v1/deleteProduct/${product_id}`)
          const {success, message} = await response.data
          return { success, message}
        },
        createProducts: async (product: FormData, user_id: String) => {
            const response = await apiClient.post(`/api/v1/addProducts/${user_id}`,product)
            const { success, message} = await response.data
            return {success, message}
        }
    }))
)