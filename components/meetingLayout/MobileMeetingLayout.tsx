"use client";

import { useMeetingStore } from "@/store/useMeetingStore";

export default function MobileMeetingLayout() {
    const participants = useMeetingStore((s) => s.participants);

    return (
        <div className="w-full h-full flex flex-col gap-2 p-2 bg-gray-900 overflow-y-scroll">
            {participants.map((p) => (
                <div
                    key={p.id}
                    className="bg-black rounded-lg overflow-hidden border border-gray-600"
                >
                    <p className="text-white text-center p-1">Participant: {p.userId}</p>
                </div>
            ))}
        </div>
    );
}
