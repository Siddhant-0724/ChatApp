import { create } from "zustand";
import { createAuthSlice } from "./slices/auth.slices";
import { createChatSlice } from "./slices/chat.slices";

export const useAppStore = create()((...a)=>({
    ...createAuthSlice(...a),
    ...createChatSlice(...a)
}))

export const colors = [
    "bg-[#22C55E] text-[#FFFFFF] border-[1px] border-[#22C55E]",
    "bg-[#EF4444] text-[#FFFFFF] border-[1px] border-[#EF4444]",
    "bg-[#3B82F6] text-[#FFFFFF] border-[1px] border-[#3B82F6]",
    "bg-[#F97316] text-[#FFFFFF] border-[1px] border-[#F97316]",
    "bg-[#8B5CF6] text-[#FFFFFF] border-[1px] border-[#8B5CF6]",
  ];
  
  export const getColor = (color) => {
    if (color >= 0 && color < colors.length) {
      return colors[color]; // Use brackets to access array elements
    }
    return colors[0]; // Fallback to the first color if the index is invalid
  };
  