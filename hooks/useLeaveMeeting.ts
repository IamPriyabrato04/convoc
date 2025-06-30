import { useMeetingStore } from "@/store/useMeetingStore";
import { getSocket } from "@/lib/socket";

export function useLeaveMeeting() {

    const {
        streams,
        setStreams,
        setParticipants,
        setWaitingList,
        setMessages,
        roomId,
    } = useMeetingStore();

    const leave = async () => {
        try {
            const socket = getSocket();

            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close();
                console.log("Socket closed successfully");
            } else if (socket && socket.readyState === WebSocket.CONNECTING) {
                console.log("Socket still connecting, delaying close...");
                socket.addEventListener("open", () => {
                    socket.close();
                    console.log("Socket closed after connecting");
                });
            } else {
                console.log("No socket to close or already closed");
            }
        } catch (err) {
            console.log("Error while closing socket", err);
        }

        // Stop local media tracks
        streams.forEach((s) => s.getTracks().forEach((t) => t.stop()));

        try {
            await fetch(`/api/meetings/${roomId}/leave`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
            });
        } catch (err) {
            console.error("Error sending leave request:", err);
        }

        // Reset state
        setStreams([]);
        setParticipants([]);
        setWaitingList([]);
        setMessages([]);

        window.location.href = "/dashboard";
        console.log("Left the meeting and redirected to dashboard (with reload)");
    };

    return { leave };
}
