import { create } from "zustand";
import type { Profile, ProfileDetail } from "../types/types";
import { devtools } from "zustand/middleware";
import { apiClient } from "../components/ClientURL";

export const useProfile = create<ProfileDetail>()(
    devtools((set) => ({
        profile: [],
        updateProfile: async (user_id: String, profile: Profile) => {
            const response = await apiClient.put(`/api/v1/updateProfile/${user_id}`,profile)
            const { success, message } = await response.data
            return { success, message} 
        },
        setProfile: async (user_id: String) => {
            const response = await apiClient.get(`/api/v1/userProfile/${user_id}`)
            const { result } = await response.data
            set(() => ({
                profile: result
            }))
        }
    }))
)