import { create } from "zustand";
import type { ProductDetails } from "../types/types";
import { devtools } from "zustand/middleware";
import { apiClient } from "../components/ClientURL";

export const useProduct = create<ProductDetails>()(
    devtools((set) => ({
        product: [],
        totalProducts: 0,
        availableStock: 0,
        lowStock: 0,
        depletedStock: 0,
        setavailableProducts: async (user_id: String) => {
          const response = await apiClient.get(`/api/v1/availableStock/${user_id}`)
          const { result } = await response.data
          set(() => ({
            availableStock: result
          }))
        },
        setlowProducts: async (user_id: String) => {
          const response = await apiClient.get(`/api/v1/lowStock/${user_id}`)
          const { result } = await response.data
          set(() => ({
            lowStock: result
          }))
        },
        setdepletedStock: async (user_id: String) => {},
        setProducts: async (user_id: String,page: Number, limit: Number) => {
          const response = await apiClient.get(`api/v1/products/${user_id}?page=${page}&limit=${limit}`)
          const { results } = response.data
          const { result, totalProducts} = results
          set(() => ({
            product: result,
            totalProducts: totalProducts
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