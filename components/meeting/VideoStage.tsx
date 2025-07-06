"use client";

import {
    GridLayout,
    ParticipantTile,
    useTracks,
    TrackReferenceOrPlaceholder,
} from "@livekit/components-react";

export default function VideoStage() {
    // Select all video tracks (subscribed tracks + local)
    const tracks = useTracks(
        [
            { source: "camera", withPlaceholder: true },
            { source: "screen_share", withPlaceholder: true },
        ],
        { onlySubscribed: false }
    );

    return (
        <div
            className="flex-1 relative p-2
                 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
                 bg-neutral-900/60 backdrop-blur-xl rounded-xl border border-neutral-800
                 shadow-xl transition-all overflow-y-auto"
        >
            <GridLayout tracks={tracks as TrackReferenceOrPlaceholder[]} style={{ height: "100%", width: "100%" }}>
                {(track) => (
                    <ParticipantTile
                        key={track.participant.identity}
                        trackRef={track}
                    // If you want to pin or customize overlay, you can add overlay props here
                    />
                )}
            </GridLayout>
        </div>
    );
}
