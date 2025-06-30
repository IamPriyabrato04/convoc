import { create } from "zustand";

export type Participant = {
    id: string;
    userId: string;
    micOn: boolean;
    cameraOn: boolean;
};

export type Message = {
    id: string;
    content: string;
    senderId: string;
    timestamp: string;
};

export type WaitingParticipant = {
    id: string;
    userId: string;
    userName: string;
};

export type MeetingState = {
    roomId: string;
    participants: Participant[];
    messages: Message[];
    localMicOn: boolean;
    localCameraOn: boolean;
    streams: MediaStream[];
    waitingList: WaitingParticipant[];

    setRoomId: (id: string) => void;
    setParticipants: (p: Participant[]) => void;
    addParticipant: (p: Participant) => void;
    removeParticipant: (id: string) => void;

    addMessage: (m: Message) => void;
    setMessages: (messages: Message[]) => void; // ✅ NEW

    setLocalMicOn: (on: boolean) => void;
    setLocalCameraOn: (on: boolean) => void;

    setStreams: (streams: MediaStream[]) => void;

    setWaitingList: (list: WaitingParticipant[]) => void;

    resetMeeting: () => void; // ✅ NEW
};

export const useMeetingStore = create<MeetingState>((set) => ({
    roomId: "",
    participants: [],
    messages: [],
    localMicOn: true,
    localCameraOn: true,
    streams: [],
    waitingList: [],

    setRoomId: (id) => set({ roomId: id }),
    setParticipants: (participants) => set({ participants }),
    addParticipant: (p) => set((s) => ({ participants: [...s.participants, p] })),
    removeParticipant: (id) => set((s) => ({
        participants: s.participants.filter((p) => p.id !== id),
    })),

    addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),
    setMessages: (messages) => set({ messages }), // ✅

    setLocalMicOn: (on) => set({ localMicOn: on }),
    setLocalCameraOn: (on) => set({ localCameraOn: on }),

    setStreams: (streams) => set({ streams }),

    setWaitingList: (waitingList) => set({ waitingList }),

    resetMeeting: () =>
        set({
            roomId: "",
            participants: [],
            messages: [],
            localMicOn: true,
            localCameraOn: true,
            streams: [],
            waitingList: [],
        }), // ✅
}));
