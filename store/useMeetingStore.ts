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
};

interface MeetingState {
    roomId: string | null;
    ownerId: string | null;
    participants: Participant[];
    waitingList: User[];
    chatMessages: []; // update later as needed
    files: []; // update later as needed
    isOwner: boolean;
    allowedToJoin: boolean;

    setRoomId: (id: string | null) => void;
    setOwnerId: (id: string | null) => void;
    setParticipants: (p: Participant[]) => void;
    setWaitingList: (w: User[]) => void;
    setIsOwner: (f: boolean) => void;
    setAllowedToJoin: (a: boolean) => void;
}

// Read persisted values
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

export const useMeetingStore = create<MeetingState>((set) => ({
    roomId: getInitialRoomId(),
    ownerId: null,
    participants: [],
    waitingList: [],
    chatMessages: [],
    files: [],
    isOwner: getInitialIsOwner(),
    allowedToJoin: false,

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

    setParticipants: (p) => set({ participants: p }),

    setWaitingList: (w) => set({ waitingList: w }),

    setIsOwner: (f) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("isOwner", String(f));
        }
        set({ isOwner: f });
    },

    setAllowedToJoin: (a) => {
        localStorage.setItem("allowedToJoin", String(a));
        set({ allowedToJoin: a })
    },
}));
