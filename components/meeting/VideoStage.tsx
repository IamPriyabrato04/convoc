"use client";

import {
    AudioTrack,
    TrackRefContext,
    useTracks,
    VideoTrack,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { TrackReference } from "@livekit/components-core";
import React, { useState } from "react"; // Import useState
import Controls from "./Controls";

export default function VideoStage() {
    const cameraTracks = useTracks([Track.Source.Camera]).filter(
        (t): t is TrackReference =>
            !!t.publication && t.publication.kind === "video"
    );

    // State to manage controls visibility
    const [showControls, setShowControls] = useState(false); // Start hidden

    // Define grid classes based on number of participants
    const getGridClass = (count: number) => {
        if (count <= 1) return "grid-cols-1";
        if (count <= 2) return "grid-cols-1 sm:grid-cols-2";
        if (count <= 4) return "grid-cols-2 sm:grid-cols-2 md:grid-cols-2";
        if (count <= 6) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-3";
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
    };

    return (
        // The outermost div is the "grandparent" that controls hover
        <div
            className="relative w-full h-full glassmorphic-dark overflow-hidden bg-black flex items-center justify-center" // Added relative, h-screen, flex, items-center, justify-center
            onMouseEnter={() => setShowControls(true)} // Show controls on mouse enter
            onMouseLeave={() => setShowControls(false)} // Hide controls on mouse leave
        >
            <div
                className={`grid gap-2 ${getGridClass(cameraTracks.length)} z-1`}
                style={{ maxHeight: "74vh", width: "100%" }} // Adjusted max-height to fill parent, added width: 100%
            >
                {cameraTracks.map((trackRef, idx) => (
                    <ParticipantTile key={idx} trackRef={trackRef} />
                ))}
            </div>

            {/* Controls Component positioned center-bottom, visible on hover */}
            <div
                className={`absolute inset-x-0 bottom-4 z-10 flex justify-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none' // Transition visibility
                    }`}
            // Removed redundant p-1 as padding might be part of Controls component or not needed here
            >
                <Controls />
            </div>
        </div>
    );
}

// each participant's video-tile
function ParticipantTile({ trackRef }: { trackRef: TrackReference }) {
    return (
        // This div represents each individual video stream tile
        <div className="relative w-full h-full rounded-lg bg-gray-800 overflow-hidden shadow-lg flex items-center justify-center"> {/* Added h-full, flex, items-center, justify-center */}
            <TrackRefContext.Provider value={trackRef}>
                {trackRef.publication.kind === "video" && (
                    <VideoTrack trackRef={trackRef} className="object-cover w-full h-full" />
                )}
                {trackRef.publication.kind === "audio" && (
                    <AudioTrack trackRef={trackRef} />
                )}
            </TrackRefContext.Provider>
        </div>
    );
}