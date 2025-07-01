"use client";

import { useMeetingStore } from "@/store/useMeetingStore";

export default function DesktopMeetingLayout() {
    const participants = useMeetingStore((s) => s.participants);

    return (
        <div className="w-full h-full grid grid-cols-3 gap-4 p-4 bg-gray-900">
            {participants.map((p) => (
                <div
                    key={p.id}
                    className="bg-black rounded-lg overflow-hidden border-2 border-gray-700 shadow-lg"
                >
                    {/* Replace with actual video streams */}
                    <p className="text-white text-center p-2">Participant: {p.userId}</p>
                </div>
            ))}
        </div>
    );
}
