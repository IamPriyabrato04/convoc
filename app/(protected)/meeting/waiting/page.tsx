"use client";

import { useMeetingStore } from "@/store/useMeetingStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WaitingPage() {
    const { roomId, setRoomId, setAllowedToJoin } = useMeetingStore();
    const router = useRouter();

    useEffect(() => {
        let savedRoomId = roomId;
        console.log("Restoring roomId from localStorage:", savedRoomId);

        if (!roomId) {
            savedRoomId = localStorage.getItem("roomId") || null;
            if (savedRoomId) {
                setRoomId(savedRoomId);
            } else {
                router.push("/dashboard");
                return;
            }
        } else {
            localStorage.setItem("roomId", roomId);
        }

        const checkStatus = async () => {
            try {
                const res = await fetch(`/api/meetings/${savedRoomId}/status`);
                const data = await res.json();
                console.log("Checking status for room:", savedRoomId, "Response:", data);
                if (!data || !data.status) {
                    console.error("Invalid response format", data);
                    return;
                }
                

                if (data.status === "ACCEPTED") {
                    clearInterval(interval);
                    setAllowedToJoin(true);
                    router.push(`/meeting/${savedRoomId}`);
                } else if (data.status === "PENDING") {
                    console.log("Still pending...");
                } else if (data.status === "REJECTED") {
                    alert("Request was denied by host");
                    clearInterval(interval);
                    setRoomId("");
                    localStorage.removeItem("roomId");
                    router.push("/dashboard");
                }
            } catch (error) {
                console.error("Error checking status", error);
            }
        };

        const interval = setInterval(checkStatus, 2000);
        checkStatus();

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-white text-2xl font-bold flex justify-center items-center h-screen">
            Waiting for host to approve <span className="animate-pulse">...</span>
        </div>
    );
}
