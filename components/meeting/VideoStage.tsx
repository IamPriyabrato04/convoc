"use client";

import { useMeetingStore } from "@/store/useMeetingStore";


export default function VideoStage({ localVideoRef }: { localVideoRef: React.RefObject<HTMLVideoElement> }) {
    const streams = useMeetingStore((s) => s.streams);

    return (
        <div className="flex-1 relative p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {streams.map((stream, i) => (
                <video
                    key={i}
                    ref={i === 0 ? localVideoRef : null}
                    srcObject={stream}
                    autoPlay
                    playsInline
                    muted={i === 0}
                    className="w-full h-48 object-cover rounded-lg shadow"
                />
            ))}
        </div>
    );
}
