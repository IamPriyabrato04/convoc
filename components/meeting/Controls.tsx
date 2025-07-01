"use client";

import { useMeetingStore } from "@/store/useMeetingStore";
import { Mic, MicOff, Video, VideoOff, Monitor } from "lucide-react";
import { Button } from "../ui/button";

export default function Controls() {
    const {
        localMicOn,
        localCameraOn,
        setLocalMicOn,
        setLocalCameraOn,
        streams,
    } = useMeetingStore();

    const toggleMic = () => {
        setLocalMicOn(!localMicOn);
        const stream = streams[0];
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) audioTrack.enabled = !localMicOn;
        }
    };

    const toggleCamera = () => {
        setLocalCameraOn(!localCameraOn);
        const stream = streams[0];
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) videoTrack.enabled = !localCameraOn;
        }
    };

    return (
        <div className="flex items-center justify-center gap-10 p-2 bg-neutral-900 rounded-2xl border border-neutral-700">
            <Button
                onClick={toggleMic}
                className={`p-2 rounded-full transition ${localMicOn ? "bg-neutral-600 hover:bg-neutral-500" : "bg-red-600 hover:bg-red-700"
                    }`}
            >
                {localMicOn ? <Mic /> : <MicOff />}
            </Button>

            <Button
                onClick={toggleCamera}
                className={`p-2 rounded-full transition ${localCameraOn ? "bg-neutral-600 hover:bg-neutral-500" : "bg-red-600 hover:bg-red-700"
                    }`}
            >
                {localCameraOn ? <Video /> : <VideoOff />}
            </Button>

            <Button className="p-2 bg-neutral-600 rounded-full hover:bg-neutral-500 transition">
                <Monitor />
            </Button>
        </div>
    );
}
