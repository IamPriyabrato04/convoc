import { create } from "zustand";

export enum ParticipantStatusEnum {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
}

type User = {
    id: string;
    name?: string;
    email?: string;
    image?: string;
};

type Participant = {
    id: string;
    userId: string;
    micOn: boolean;
    cameraOn: boolean;
    status: ParticipantStatusEnum;
    user: User;
    isPinned: boolean;
    isHost?: boolean;
};

type ChatMessage = {
    id: string;
    userId: string;
    userName: string;
    message: string;
    timestamp: Date;
};

type MeetingFile = {
    id: string;
    name: string;
    url: string;
};

interface MeetingState {
    roomId: string | null;
    ownerId: string | null;
    participants: Participant[];
    waitingList: User[];
    chatMessages: ChatMessage[];
    files: MeetingFile[];
    isOwner: boolean;
    allowedToJoin: boolean;

    // Derived values
    pinnedParticipants: Participant[];
    participantCount: number;
    chatMessageCount: number;

    // Actions
    setRoomId: (id: string | null) => void;
    setOwnerId: (id: string | null) => void;
    setParticipants: (p: Participant[]) => void;
    setChatMessage: (message: ChatMessage) => void;
    togglePinParticipant: (id: string) => void;
    setWaitingList: (w: User[]) => void;
    setIsOwner: (f: boolean) => void;
    setAllowedToJoin: (a: boolean) => void;

    // Reset everything
    reset: () => void;
}

const getInitialRoomId = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("roomId");
    }
    return null;
};

const getInitialIsOwner = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("isOwner") === "true";
    }
    return false;
};

export const useMeetingStore = create<MeetingState>((set, get) => ({
    roomId: getInitialRoomId(),
    ownerId: null,
    participants: [],
    waitingList: [],
    chatMessages: [],
    files: [],
    isOwner: getInitialIsOwner(),
    allowedToJoin: false,

    get pinnedParticipants() {
        return get().participants.filter((p) => p.isPinned);
    },

    get participantCount() {
        return get().participants.length;
    },

    get chatMessageCount() {
        return get().chatMessages.length;
    },

    setRoomId: (id) => {
        if (typeof window !== "undefined") {
            if (id) {
                localStorage.setItem("roomId", id);
            } else {
                localStorage.removeItem("roomId");
            }
        }
        set({ roomId: id });
    },

    setOwnerId: (id) => set({ ownerId: id }),

    setParticipants: (p) => {
        // Ensure max 4 pinned
        const pinned = p.filter((p) => p.isPinned);
        if (pinned.length > 4) {
            // Auto unpin extras
            let count = 0;
            const updated = p.map((participant) => {
                if (participant.isPinned && count < 4) {
                    count++;
                    return participant;
                }
                return { ...participant, isPinned: false };
            });
            set({ participants: updated });
        } else {
            set({ participants: p });
        }
    },

    togglePinParticipant: (id) => {
        const participants = get().participants;
        const pinnedCount = participants.filter(p => p.isPinned).length;
        const updated = participants.map(p => {
            if (p.id === id) {
                if (p.isPinned) return { ...p, isPinned: false };
                return pinnedCount < 4 ? { ...p, isPinned: true } : p;
            }
            return p;
        });
        set({ participants: updated });
    },

    setChatMessage: (message) => {
        set((state) => ({
            chatMessages: [...state.chatMessages, message],
        }));
    },

    setWaitingList: (w) => set({ waitingList: w }),

    setIsOwner: (f) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("isOwner", String(f));
        }
        set({ isOwner: f });
    },

    setAllowedToJoin: (a) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("allowedToJoin", String(a));
        }
        set({ allowedToJoin: a });
    },

    reset: () =>
        set({
            roomId: null,
            ownerId: null,
            isOwner: false,
            allowedToJoin: false,
            participants: [],
            waitingList: [],
            chatMessages: [],
            files: [],
        })
    })
    
);
