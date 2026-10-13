import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import axios from 'axios'
import type { FormDetail, FormInput, Response } from '../types/types'

export const useFormDetail = create<FormDetail>()(
    devtools(
        (set) => ({
            registerAccount: async (details: FormInput[]): Promise<Response> => {
                const response = await axios.post("http://localhost:3000/api/v1/registerAccount",details)
                const { success, message} = await response.data
                return { success, message}
            }
        })
    )
)