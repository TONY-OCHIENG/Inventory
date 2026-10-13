import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import axios from 'axios'
import type { FormData } from '../types/types'

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