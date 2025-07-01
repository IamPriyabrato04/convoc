"use client";

import { useMeetingStore } from "@/store/useMeetingStore";

export default function TabletMeetingLayout() {
    const participants = useMeetingStore((s) => s.participants);

    return (
        <div className="w-full h-full grid grid-cols-2 gap-3 p-3 bg-gray-900">
            {participants.map((p) => (
                <div
                    key={p.id}
                    className="bg-black rounded-lg overflow-hidden border border-gray-600"
                >
                    <p className="text-white text-center p-2">Participant: {p.userId}</p>
                </div>
            ))}
        </div>
    );
}
