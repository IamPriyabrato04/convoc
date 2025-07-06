"use client";

import { Mic, MicOff, Video, VideoOff, Monitor } from "lucide-react";
import { Button } from "../ui/button";
import {
    useTrackToggle,
    useLocalParticipant,
} from "@livekit/components-react";

export default function Controls() {
    const {
        isMicrophoneEnabled,
        isCameraEnabled,
        microphoneTrack,
        cameraTrack,
    } = useLocalParticipant();

    // Fix: explicitly ensure undefined if no track
    const { toggle: toggleMic, buttonProps: micButtonProps } = useTrackToggle(
        microphoneTrack ?? undefined
    );
    const { toggle: toggleCam, buttonProps: camButtonProps } = useTrackToggle(
        cameraTrack ?? undefined
    );

    return (
        <div
            className="
        flex items-center justify-center gap-6 p-3 
        bg-neutral-900/60 backdrop-blur-lg rounded-2xl border border-neutral-700
        shadow-xl transition-all
      "
        >
            <Button
                {...micButtonProps}
                onClick={(e) => {
                    e.preventDefault();
                    toggleMic();
                }}
                className={`p-2 rounded-full transition ${isMicrophoneEnabled ? "bg-neutral-600 hover:bg-neutral-500" : "bg-red-600 hover:bg-red-700"
                    }`}
            >
                {isMicrophoneEnabled ? <Mic /> : <MicOff />}
            </Button>

            <Button
                {...camButtonProps}
                onClick={(e) => {
                    e.preventDefault();
                    toggleCam();
                }}
                className={`p-2 rounded-full transition ${isCameraEnabled ? "bg-neutral-600 hover:bg-neutral-500" : "bg-red-600 hover:bg-red-700"
                    }`}
            >
                {isCameraEnabled ? <Video /> : <VideoOff />}
            </Button>

            <Button className="p-2 bg-neutral-600 rounded-full hover:bg-neutral-500 transition">
                <Monitor />
            </Button>
        </div>
    );
}
