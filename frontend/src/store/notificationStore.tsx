import { create } from "zustand";
import type { Notification, NotificationDetail } from "../types/types";
import { devtools } from "zustand/middleware";
import { apiClient } from "../components/ClientURL";

export const useNotification = create<NotificationDetail>()(
    devtools((set) => ({
        notification: [],
        addNotification: async (user_id: String, notification: Notification) => {
          await apiClient.post(`/api/v1/addNotification/${user_id}`,notification)
        }
    }))
)