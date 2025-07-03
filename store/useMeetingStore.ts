import { create } from "zustand";
import { persist } from "zustand/middleware";

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
    allowedToJoin: boolean;
    pinnedStreamId: string | null;

    setRoomId: (id: string) => void;
    setParticipants: (p: Participant[]) => void;
    addParticipant: (p: Participant) => void;
    removeParticipant: (id: string) => void;

    addMessage: (m: Message) => void;
    setMessages: (messages: Message[]) => void;

    setLocalMicOn: (on: boolean) => void;
    setLocalCameraOn: (on: boolean) => void;

    setStreams: (streams: MediaStream[]) => void;
    addStream: (stream: MediaStream) => void;
    removeStream: (id: string) => void;

    setWaitingList: (list: WaitingParticipant[]) => void;

    resetMeeting: () => void;
    setAllowedToJoin: (allowed: boolean) => void;

    setPinnedStreamId: (id: string | null) => void;
};

export const useMeetingStore = create<MeetingState>()(
    persist(
        (set) => ({
            roomId: "",
            participants: [],
            messages: [],
            localMicOn: true,
            localCameraOn: true,
            streams: [],
            waitingList: [],
            allowedToJoin: false,
            pinnedStreamId: null,

            setRoomId: (id) => set({ roomId: id }),
            setParticipants: (participants) => set({ participants }),
            addParticipant: (p) =>
                set((s) => ({ participants: [...s.participants, p] })),
            removeParticipant: (id) =>
                set((s) => ({
                    participants: s.participants.filter((p) => p.id !== id),
                })),

            addMessage: (m) =>
                set((s) => ({ messages: [...s.messages, m] })),
            setMessages: (messages) => set({ messages }),

            setLocalMicOn: (on) => set({ localMicOn: on }),
            setLocalCameraOn: (on) => set({ localCameraOn: on }),

            setStreams: (streams) => set({ streams }),
            addStream: (stream) =>
                set((s) => ({ streams: [...s.streams, stream] })),
            removeStream: (id) =>
                set((s) => ({
                    streams: s.streams.filter((str) => str.id !== id),
                })),

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
                    allowedToJoin: false,
                    pinnedStreamId: null,
                }),

            setAllowedToJoin: (allowed) => set({ allowedToJoin: allowed }),

            setPinnedStreamId: (id) => set({ pinnedStreamId: id }),
        }),
        {
            name: "meeting-storage",
            partialize: (state) => ({
                roomId: state.roomId,
                localMicOn: state.localMicOn,
                localCameraOn: state.localCameraOn,
            }),
        }
    )
);
