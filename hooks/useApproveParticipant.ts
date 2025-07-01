import { useMeetingStore } from "@/store/useMeetingStore";

export function useApproveParticipant() {
    const { roomId, setWaitingList } = useMeetingStore();

    const approve = async (userId: string) => {
        const res = await fetch(`/api/meetings/${roomId}/approve`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });
        const data = await res.json();

        if (res.ok) {
            setWaitingList(data.updatedWaitingList);
        }
    };

    const reject = async (userId: string) => {
        const res = await fetch(`/api/meetings/${roomId}/reject`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });
        const data = await res.json();

        if (res.ok) {
            setWaitingList(data.updatedWaitingList);
        }
    };

    return { approve, reject };
}
