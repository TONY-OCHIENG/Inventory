import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { FormDetail, FormInput, Response } from '../types/types'
import { apiClient } from '../components/ClientURL'

export const useFormDetail = create<FormDetail>()(
    devtools(
        (set) => ({
            loading: false,
            setLoading: () => {
                set((state) => ({
                    loading: !state.loading
                }))
            },
            setCode: async (code: String): Promise<Response> => {
                const response = await apiClient.post("/api/v1/verifyCode",code)
                const { success, message} = await response.data
                return { success, message}                
            },
            registerAccount: async (details: FormInput): Promise<Response> => {
                const response = await apiClient.post("/api/v1/registerAccount",details)
                const { success, message} = await response.data
                return { success, message}
            }
        })
    )
)