// hooks/useLeaveMeeting.ts
import { useRouter } from "next/navigation";
import { useMeetingStore } from "@/store/useMeetingStore";
import { getSocket } from "@/lib/socket";

export function useLeaveMeeting() {
    const router = useRouter();
    const { streams, setStreams, setParticipants, setWaitingList, setMessages, roomId } = useMeetingStore();

    const leave = async () => {
        // 1) Close SFU socket
        try {
            const socket = getSocket();
            socket.close();
        } catch (err) {
            console.warn("No socket to close", err);
        }

        streams.forEach((s) => s.getTracks().forEach((t) => t.stop()));

        await fetch(`/api/meetings/${roomId}/leave`, { method: "POST" });

        // Reset store state
        setStreams([]);
        setParticipants([]);
        setWaitingList([]);
        setMessages([]);

        // Redirect to /dashboard
        router.push("/dashboard");
    };

    return { leave };
}
