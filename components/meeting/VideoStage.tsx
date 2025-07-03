"use client";

import React, { useState } from "react";
import { useMeetingStore } from "@/store/useMeetingStore";
import { Pin } from "lucide-react";

export default function VideoStage({
    localVideoRef,
}: {
    localVideoRef: React.RefObject<HTMLVideoElement | null>;
}) {
    const streams = useMeetingStore((s) => s.streams);
    const [pinnedStream, setPinnedStream] = useState<MediaStream | null>(null);

    const displayedStreams = pinnedStream ? [pinnedStream, ...streams.filter(s => s !== pinnedStream)] : streams;

    return (
        <div className="flex-1 relative p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedStreams.map((stream, i) => (
                <div
                    key={i}
                    onClick={() => setPinnedStream(stream)}
                    className={`relative rounded-lg overflow-hidden shadow transition-all cursor-pointer ${pinnedStream === stream ? "col-span-full row-span-2" : ""
                        }`}
                >
                    <video
                        autoPlay
                        playsInline
                        muted={i === 1}
                        className="w-auto h-auto object-cover rounded-lg"
                        ref={(ref) => {
                            if (ref) {
                                ref.srcObject = stream;
                                if (i === 0 && localVideoRef) {
                                    localVideoRef.current = ref;
                                }
                            }
                        }}
                    />
                    {pinnedStream === stream && (
                        <div className="absolute bottom-2 right-2 bg-neutral-900/70 text-white text-xs px-2 py-1 rounded">
                            <Pin/>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
