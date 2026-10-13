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
            registerAccount: async (details: FormInput): Promise<Response> => {
                const response = await apiClient.post("/api/v1/registerAccount",details)
                const { success, message} = await response.data
                return { success, message}
            }
        })
    )
)