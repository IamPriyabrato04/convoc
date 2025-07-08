"use client";

import {
    GridLayout,
    ParticipantTile,
    useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";

export default function VideoStage() {
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false }
    );

    return (
        <div
            className="flex-1 relative p-2
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
        bg-neutral-900/60 backdrop-blur-xl rounded-xl border border-neutral-800
        shadow-xl transition-all overflow-auto"
        >
            <GridLayout tracks={tracks} style={{ height: "auto", width: "100%" }}>
                <ParticipantTile />
            </GridLayout>
        </div>
    );
}
