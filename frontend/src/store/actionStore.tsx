import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Reminder, Reminders } from "../types/types";
import { apiClient } from "../components/ClientURL";


export const useActions = create<Reminder>()(
    devtools((set) => ({
        reminder: [],
        setReminders: async(userID: String) => {
            const response = await apiClient.get(`/api/v1/reminders/${userID}`)
            const { result } = await response.data
            set(() => ({
                reminder: result
            }))
        },
        addReminder: async (user_id: String, reminder: Reminders) => {
            const response = await apiClient.post(`/api/v1/addReminder/${user_id}`,reminder)
            const { success, message} = await response.data
            return {success, message}            
        }
    }),{name:"actions"})
)