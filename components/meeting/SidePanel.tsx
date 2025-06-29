"use client";

import { useMeetingStore } from "@/store/useMeetingStore";


export default function SidePanel() {
    const participants = useMeetingStore((s) => s.participants);
    return (
        <div className="w-80 bg-gray-800 p-4 border-l border-gray-700 overflow-y-auto">
            <h3 className="mb-4 text-lg">Participants ({participants.length})</h3>
            {participants.map((p) => (
                <div key={p.id} className="flex items-center gap-2 mb-2">
                    <span className="h-8 w-8 bg-gray-600 rounded-full" />
                    <span>{p.userId}</span>
                </div>
            ))}
            {/* Chat would live below */}
        </div>
    );
}
