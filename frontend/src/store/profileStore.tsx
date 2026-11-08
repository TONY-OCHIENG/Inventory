import { create } from "zustand";
import type { ProfileDetail } from "../types/types";
import { devtools } from "zustand/middleware";
import { apiClient } from "../components/ClientURL";

export const useProfile = create<ProfileDetail>()(
    devtools((set) => ({
        profile: [],
        setProfile: async (user_id: String) => {
            const response = await apiClient.get(`/api/v1/userProfile/${user_id}`)
            const { result } = await response.data
            set(() => ({
                profile: result
            }))
        }
    }))
)