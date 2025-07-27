"use client";

import {
    AudioTrack,
    TrackRefContext,
    useTracks,
    VideoTrack,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { TrackReference } from "@livekit/components-core";
import React from "react";
import Controls from "./Controls";

export default function VideoStage() {
    const cameraTracks = useTracks([Track.Source.Camera]).filter(
        (t): t is TrackReference =>
            !!t.publication && t.publication.kind === "video"
    );

    // Define grid classes based on number of participants
    const getGridClass = (count: number) => {
        if (count <= 1) return "grid-cols-1";
        if (count <= 2) return "grid-cols-1 sm:grid-cols-2";
        if (count <= 4) return "grid-cols-2 sm:grid-cols-2 md:grid-cols-2";
        if (count <= 6) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-3";
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
    };

    return (
        <div className="w-full overflow-y-hidden bg-black">
            <div className={`grid gap-2 ${getGridClass(cameraTracks.length)} z-1`}
                style={{ maxHeight: "74vh" }}
            >
                {cameraTracks.map((trackRef, idx) => (
                    <ParticipantTile key={idx} trackRef={trackRef} />
                ))}
            </div>
            <div className="absolute z-10 border border-red-800 hidden hover:visible">
                <Controls />
            </div>
        </div>
    );
}

// each participant's video-tile
function ParticipantTile({ trackRef }: { trackRef: TrackReference }) {
    return (
        <div className="relative w-full rounded-lg bg-gray-800 overflow-hidden shadow-lg">
            <TrackRefContext.Provider value={trackRef}>
                {trackRef.publication.kind === "video" && (
                    <VideoTrack trackRef={trackRef} />
                )}
                {trackRef.publication.kind === "audio" && (
                    <AudioTrack trackRef={trackRef} />
                )}
            </TrackRefContext.Provider>
        </div>
    );
}
