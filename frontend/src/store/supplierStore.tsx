import { create } from "zustand";
import type { Suppliers, SupplierDetails, BalanceDetails } from "../types/types";
import { devtools } from "zustand/middleware";
import { apiClient } from "../components/ClientURL";

export const useSupplier = create<Suppliers>()(
    devtools((set) => ({
        supplier:[],
        suppliers:0,
        activeSuppliers:0,
        inActiveSupplier: 0,
        total: 0,
        totalBalance: async (user_id: String) => {
            const response = await apiClient.get(`/api/v1/getTotalBalance/${user_id}`)
            const { result } = await response.data
            set(() => ({
                total: result
            })) 
        },
        getinActiveSupplier: async (user_id: String) => {
            const response = await apiClient.get(`/api/v1/getinActivesuppliers/${user_id}`)
            const { result } = await response.data
            set(() => ({
                inActiveSupplier: result
            }))
        },
        getActiveSuppliers: async (user_id: String) => {
            const response = await apiClient.get(`/api/v1/getActivesuppliers/${user_id}`)
            const { result } = await response.data
            set(() => ({
                activeSuppliers: result
            }))
        },
        getAllSuppliers: async (user_id: String) => {
            const response = await apiClient.get(`/api/v1/getAllsuppliers/${user_id}`)
            const { result } = await response.data
            set(() => ({
                suppliers: result
            }))
        },
        updateBalance: async (supplier_id: String, balance: BalanceDetails) => {
            const response = await apiClient.put(`/api/v1/updateBalance/${supplier_id}`, balance)
            const { success, message} = await response.data
            return { success, message}
        },
        deleteSupplier: async (supplier_id: String) => {
            const response = await apiClient.delete(`/api/v1/deleteSupplier/${supplier_id}`)
            const { success, message} = await response.data
            return {success, message}
        },
        activateSupplier: async (supplier_id: String) => {
            const response = await apiClient.put(`/api/v1/activateSupplier/${supplier_id}`)
            const { success, message} = await response.data
            return { success, message}
        },
        deactivateSupplier: async (supplier_id: String) => {
            const response = await apiClient.put(`/api/v1/deactivateSupplier/${supplier_id}`)
            const { success, message} = await response.data
            return { success, message}
        },
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