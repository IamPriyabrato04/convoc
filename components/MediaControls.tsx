"use client";

import { useMeetingStore } from "@/store/useMeetingStore";
import { useState } from "react";
import { Button } from "./ui/button";

export default function MediaControls() {
    const {
        localMicOn,
        localCameraOn,
        setLocalMicOn,
        setLocalCameraOn,
        streams,
        setStreams,
    } = useMeetingStore();

    const [isSharing, setIsSharing] = useState(false);

    const toggleMic = () => {
        setLocalMicOn(!localMicOn);
    };

    const toggleCamera = () => {
        setLocalCameraOn(!localCameraOn);
    };

    const toggleScreenShare = async () => {
        if (isSharing) {
            // Stop screen share
            const currentStream = streams.find((s) =>
                s.getVideoTracks().some((track) => track.label.includes("screen"))
            );

            currentStream?.getTracks().forEach((track) => track.stop());

            // Remove screen stream from Zustand
            setStreams(streams.filter((s) => s !== currentStream));

            setIsSharing(false);
        } else {
            try {
                const screenStream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                });

                setStreams([...streams, screenStream]);
                setIsSharing(true);
            } catch (error) {
                console.error("Failed to start screen share:", error);
            }
        }
    };

    return (
        <div className="flex gap-3">
            <Button
                onClick={toggleMic}
                className={`px-3 py-1 rounded ${localMicOn ? "bg-green-500" : "bg-red-500"
                    }`}
            >
                {localMicOn ? "Mic On" : "Mic Off"}
            </Button>

            <Button
                onClick={toggleCamera}
                className={`px-3 py-1 rounded ${localCameraOn ? "bg-green-500" : "bg-red-500"
                    }`}
            >
                {localCameraOn ? "Camera On" : "Camera Off"}
            </Button>

            <Button
                onClick={toggleScreenShare}
                className={`px-3 py-1 rounded ${isSharing ? "bg-yellow-500" : "bg-blue-500"}`}
            >
                {isSharing ? "Stop Share" : "Share Screen"}
            </Button>
        </div>
    );
}
