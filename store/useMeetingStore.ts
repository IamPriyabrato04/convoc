import { create } from "zustand";

type Participant = {
    id: string;
    userId: string;
    micOn: boolean;
    cameraOn: boolean;
};

type Message = {
    id: string;
    content: string;
    senderId: string;
    timestamp: string;
};

type MeetingState = {
    roomId: string;
    participants: Participant[];
    messages: Message[];
    localMicOn: boolean;
    localCameraOn: boolean;
    streams: MediaStream[];
    waitingList: WaitingParticipant[];
    setWaitingList: (list: WaitingParticipant[]) => void;
    setRoomId: (id: string) => void;
    setParticipants: (participants: Participant[]) => void;
    addParticipant: (p: Participant) => void;
    removeParticipant: (id: string) => void;
    addMessage: (m: Message) => void;
    setLocalMicOn: (on: boolean) => void;
    setLocalCameraOn: (on: boolean) => void;
    setStreams: (streams: MediaStream[]) => void;
};
type WaitingParticipant = {
    id: string;
    userId: string;
    userName: string; // from User model
};
export const useMeetingStore = create<MeetingState>((set) => ({
    roomId: "",
    participants: [],
    messages: [],
    localMicOn: true,
    localCameraOn: true,
    streams: [],
    waitingList: [],
    setWaitingList: (list) => set({ waitingList: list }),
    setRoomId: (id) => set({ roomId: id }),
    setParticipants: (participants) => set({ participants }),
    addParticipant: (p) => set((state) => ({ participants: [...state.participants, p] })),
    removeParticipant: (id) => set((state) => ({
        participants: state.participants.filter((p) => p.id !== id),
    })),
    addMessage: (m) => set((state) => ({ messages: [...state.messages, m] })),
    setLocalMicOn: (on) => set({ localMicOn: on }),
    setLocalCameraOn: (on) => set({ localCameraOn: on }),
    setStreams: (streams) => set({ streams }),
}));
