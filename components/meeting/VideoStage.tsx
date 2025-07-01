"use client";

import { useMeetingStore } from "@/store/useMeetingStore";
import React, { RefObject, useCallback } from "react";

export default function VideoStage({ localVideoRef }: { localVideoRef: RefObject<HTMLVideoElement | null> }) {
    const streams = useMeetingStore((s) => s.streams);

    const setVideoRef = useCallback(
        (ref: HTMLVideoElement | null, stream: MediaStream, isLocal: boolean) => {
            if (ref) {
                ref.srcObject = stream;
                if (isLocal && localVideoRef) {
                    localVideoRef.current = ref;
                }
            }
        },
        [localVideoRef]
    );

    return (
        <div className="flex-1 relative p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {streams.map((stream, i) => (
                <video
                    key={i}
                    autoPlay
                    playsInline
                    muted={i === 0}
                    className="w-full h-48 object-cover rounded-lg shadow"
                    ref={(ref) => setVideoRef(ref, stream, i === 0)}
                />
            ))}
        </div>
    );
}
