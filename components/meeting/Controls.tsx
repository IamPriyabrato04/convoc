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
        <div className="flex items-center justify-center gap-6 p-4 bg-gray-900">
            <Button
                onClick={toggleMic}
                className={`p-3 rounded-full transition ${localMicOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"
                    }`}
            >
                {localMicOn ? <Mic /> : <MicOff />}
            </Button>

            <Button
                onClick={toggleCamera}
                className={`p-3 rounded-full transition ${localCameraOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"
                    }`}
            >
                {localCameraOn ? <Video /> : <VideoOff />}
            </Button>

            <Button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition">
                <Monitor />
            </Button>
        </div>
    );
}
