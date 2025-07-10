"use client";

import {
    ParticipantTile,
    useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useState } from "react";

export default function VideoStage() {
    // Get all camera tracks
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: false },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false }
    );

    // State to hold currently pinned participant identity
    const [pinnedTrackSid, setPinnedTrackSid] = useState<string | null>(null);

    // Find pinned track object
    const pinnedTrack = tracks.find((t) => t.participant.identity === pinnedTrackSid) || tracks[0];

    // Filter out pinned track from sidebar list
    const sidebarTracks = tracks.filter((t) => t.participant.identity !== pinnedTrack?.participant.identity);

    return (
        <div className="flex h-fit w-fit bg-neutral-900">
            {/* Center large pinned video */}
            <div className="flex-1 flex items-center justify-center bg-black relative rounded-lg overflow-hidden">
                {pinnedTrack ? (
                    <ParticipantTile trackRef={pinnedTrack} />
                ) : (
                    <div className="text-white">No active video</div>
                )}
            </div>

            {/* Right sidebar with other participants */}
            <div className="w-48 flex flex-col gap-1 p-1">
                {sidebarTracks.map((track) => (
                    <div
                        key={track.participant.sid}
                        onClick={() => setPinnedTrackSid(track.participant.identity)}
                        className="cursor-pointer rounded-lg overflow-hidden border border-neutral-700 hover:border-blue-500 transition-all"
                    >
                        <ParticipantTile trackRef={track} />
                    </div>
                ))}
            </div>
        </div>
    );
}
