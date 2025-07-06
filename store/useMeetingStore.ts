// store/useMeetingStore.ts
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
    chatMessages: [];
    files: [];
    isOwner: boolean;

    setRoomId: (id: string) => void;
    setOwnerId: (id: string) => void;
    setParticipants: (p: Participant[]) => void;
    setWaitingList: (w: User[]) => void;
    setIsOwner: (f: boolean) => void;
}

export const useMeetingStore = create<MeetingState>((set) => ({
    roomId: null,
    ownerId: null,
    participants: [],
    waitingList: [],
    chatMessages: [],
    files: [],
    isOwner: false,

    setRoomId: (id) => set({ roomId: id }),
    setOwnerId: (id) => set({ ownerId: id }),
    setParticipants: (p) => set({ participants: p }),
    setWaitingList: (w) => set({ waitingList: w }),
    setIsOwner: (f) => set({ isOwner: f }),
}));
