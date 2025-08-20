// src/store/useUiStore.ts
import { create } from "zustand";

type UiState = {
    isPanelOpen: boolean;
    setPanelOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
    isPanelOpen: false,
    setPanelOpen: (open) => set({ isPanelOpen: open }),
}));
