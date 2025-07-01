"use client";

import { useEffect, useState } from "react";
import { useMeetingStore } from "@/store/useMeetingStore";
import WaitingList from "./WaitingList";



export default function SidePanel() {
    const participants = useMeetingStore((s) => s.participants);
    const { roomId } = useMeetingStore();
    const [isOwner, setIsOwner] = useState(false);


    useEffect(() => {
        const checkOwner = async () => {
            try {
                const res = await fetch(`/api/meetings/${roomId}/check-owner`);
                const data = await res.json();
                setIsOwner(data.isOwner);
            } catch (err) {
                console.error("Error checking owner:", err);
            }
        };

        if (roomId) {
            checkOwner();
        }
    }, [roomId]);

    return (
        <div className="w-80 bg-neutral-950 p-4 border-l border-gray-700 overflow-y-auto">
            <h3 className="mb-4 text-lg">Participants ({participants.length})</h3>
            {participants.map((p) => (
                <div key={p.id} className="flex items-center gap-2 mb-2">
                    <span className="h-8 w-8 bg-neutral-800 rounded-full" />
                    <span>{p.userId}</span>
                </div>
            ))}

            {isOwner && (
                <>
                    <WaitingList roomId={roomId} isOwner={isOwner} />
                </>
            )}
        </div>
    );
}
