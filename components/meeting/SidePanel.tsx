"use client";

import { useEffect, useState } from "react";
import { useMeetingStore } from "@/store/useMeetingStore";
import WaitingList from "./WaitingList";

export default function SidePanel() {
    const { roomId } = useMeetingStore();
    const [participants, setParticipants] = useState<any[]>([]);
    const [isOwner, setIsOwner] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    // Check owner
    useEffect(() => {
        const checkOwner = async () => {
            try {
                const res = await fetch(`/api/meetings/${roomId}/check-owner`);
                const data = await res.json();
                setIsOwner(data.isOwner);
                setCurrentUserId(data.userId); // Assuming your check-owner API also returns current userId
            } catch (err) {
                console.error("Error checking owner:", err);
            }
        };

        if (roomId) checkOwner();
    }, [roomId]);

    // Fetch participants
    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const res = await fetch(`/api/meetings/${roomId}/participants`);
                const data = await res.json();
                if (data.participants) {
                    // Move "You" on top
                    const ordered = [...data.participants];
                    if (currentUserId) {
                        ordered.sort((a, b) => {
                            if (a.id === currentUserId) return -1;
                            if (b.id === currentUserId) return 1;
                            return 0;
                        });
                    }
                    setParticipants(ordered);
                }
            } catch (err) {
                console.error("Error fetching participants:", err);
            }
        };

        if (roomId) {
            fetchParticipants();
            const interval = setInterval(fetchParticipants, 5000);
            return () => clearInterval(interval);
        }
    }, [roomId, currentUserId]);

    return (
        <div className="w-80 bg-neutral-950 p-4 border-l border-gray-700 overflow-y-auto">
            <h3 className="mb-4 text-lg">Participants ({participants.length})</h3>

            {participants.map((p) => (
                <div key={p.id} className="flex items-center gap-2 mb-2">
                    <span className="h-8 w-8 bg-neutral-800 rounded-full" ></span>
                    <span>{p.name}{p.id === currentUserId ? " (You)" : ""}</span>
                </div>
            ))}

            {isOwner && (
                <WaitingList roomId={roomId} isOwner={isOwner} />
            )}
        </div>
    );
}
