"use client";

import { useJoinMeeting } from "@/hooks/useJoinMeeting";
import { useMeetingStore } from "@/store/useMeetingStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WaitingPage() {

    const { allowedToJoin, setAllowedToJoin, roomId, setRoomId } = useMeetingStore();
    const { join } = useJoinMeeting(roomId);
    const router = useRouter();

    useEffect(() => {
        if (!roomId) return;

        const interval = setInterval(async () => {
            const res = await fetch(`/api/meetings/${roomId}/status`);
            const data = await res.json();
            if (data.status === "ACCEPTED") {
                setAllowedToJoin(true);
                clearInterval(interval);
                router.push(`/meeting/${roomId}`);

            } else if (data.status === "PENDING") {
                setAllowedToJoin(false);

            } else if (data.status === "REJECTED") {
                alert("Request was denied by host");
                clearInterval(interval);
                setRoomId("");
                setAllowedToJoin(false);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [roomId]);

    useEffect(() => {
        if (allowedToJoin) {
            join();
        }
    }, [allowedToJoin]);

    return <div className="text-white text-2xl font-bold flex justify-center items-center h-screen">Waiting for host to approve...</div>;
}
