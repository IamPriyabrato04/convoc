"use client";

import {
    AudioTrack,
    TrackRefContext,
    useTracks,
    VideoTrack,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { TrackReference } from "@livekit/components-core";
import React, { useState } from "react";
import Controls from "./Controls";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function VideoStage() {
    // Get camera tracks
    const cameraTracks = useTracks([Track.Source.Camera]).filter(
        (t): t is TrackReference =>
            !!t.publication && t.publication.kind === "video"
    );

    // Determine if mobile
    const isMobile = useMediaQuery("(max-width: 768px)");

    // Controls visibility state
    const [showControls, setShowControls] = useState(false);

    // Desktop: show on hover; Mobile: toggle on tap
    const containerHandlers = isMobile
        ? {
            onClick: () => setShowControls((v) => !v),
        }
        : {
            onMouseEnter: () => setShowControls(true),
            onMouseLeave: () => setShowControls(false),
        };

    // Dynamic grid classes: mobile always 1 col
    const getGridClass = (count: number) => {
        if (isMobile) return "grid-cols-1";
        if (count <= 1) return "grid-cols-1";
        if (count === 2) return "grid-cols-1 sm:grid-cols-2";
        if (count <= 4) return "grid-cols-2 sm:grid-cols-2 md:grid-cols-2";
        if (count <= 6) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-3";
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
    };

    return (
        <div
            className="relative w-full h-full glassmorphic-dark overflow-hidden flex items-center justify-center"
            {...containerHandlers}
        >
            <div
                className={`grid gap-2 ${getGridClass(cameraTracks.length)} z-1 w-full h-full`}
                style={{ maxHeight: isMobile ? '60vh' : '74vh' }}
            >
                {cameraTracks.map((trackRef, idx) => (
                    <ParticipantTile key={trackRef.publication.trackSid || idx} trackRef={trackRef} />
                ))}
            </div>

            {/* Controls: Desktop fade, Mobile slide */}
            <div
                className={`absolute inset-x-0 bottom-0 z-10 flex justify-center transition-all duration-300 
          ${showControls ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}
            >
                <Controls />
            </div>
        </div>
    );
}

// Participant video tile
function ParticipantTile({ trackRef }: { trackRef: TrackReference }) {
    return (
        <div className="relative w-full h-full rounded-lg bg-transparent overflow-hidden shadow-lg flex items-center justify-center">
            <TrackRefContext.Provider value={trackRef}>
                {trackRef.publication.kind === "video" && (
                    <VideoTrack trackRef={trackRef} className="object-cover w-full h-full" />
                )}
                {trackRef.publication.kind === "audio" && <AudioTrack trackRef={trackRef} />}
            </TrackRefContext.Provider>
        </div>
    );
}
