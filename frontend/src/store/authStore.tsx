import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import axios from 'axios'
import type { FormData, FormDetail, FormInput, Response } from '../types/types'

export const useForm = create<FormData>()(
    devtools(
        (set) => ({
            firstName: '',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:'',
            setFirstName: (firstName) => set({firstName: firstName}),
            setLastName: (lastName) => set({lastName: lastName}),
            setEmail: (email) => set({email: email}),
            setPassword: (password) => set({password: password}),
            setConfirmPassword: (confirmPassword) => set({confirmPassword: confirmPassword})
        }), {name: "use-form"}
    )
)

export const useFormDetail = create<FormDetail>()(
    devtools(
        (set) => ({
            details: [],
            setDetail: () => {
                set((state) =>({
                    details: state.details
                }))
             },
            registerAccount: async (details: FormInput[]): Promise<Response> => {
                const response = await axios.post("http://localhost:3000/api/v1/registerAccount",details)
                const { success, message} = await response.data
                return { success, message}
            }
        })
    )
)