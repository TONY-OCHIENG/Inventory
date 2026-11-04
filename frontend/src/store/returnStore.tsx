import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ReturnDetails } from "../types/types";

export const useReturn = create<ReturnDetails>()(
    devtools((set) => ({
        addReturns: async (user_id: String)
    }))
)