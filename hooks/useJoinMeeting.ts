"use client";

import { useState, useRef } from "react";
import * as mediasoupClient from "mediasoup-client";
import { connectSocket } from "@/lib/socket";
import { setupConsumerListener, startMediaFlow } from "@/lib/mediasoupClient";

async function getJwtToken(): Promise<string | null> {
    const res = await fetch("/api/auth/jwt");
    const data = await res.json();
    return data.token;
}

export function useJoinMeeting(roomId: string) {
    const [joined, setJoined] = useState(false);
    const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
    const localVideoRef = useRef<HTMLVideoElement | null>(null);

    const join = async () => {
        const token = await getJwtToken();
        if (!token) {
            alert("JWT token missing");
            return;
        }

        if (!navigator.mediaDevices?.getUserMedia) {
            console.log("navigator.mediaDevices", navigator.mediaDevices);
            console.log("navigator.mediaDevices.getUserMedia", navigator.mediaDevices?.getUserMedia);
            alert("Camera or microphone not supported or permissions denied");
            return;
        }

        const localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        if (localVideoRef.current) {
            localVideoRef.current.pause();
            localVideoRef.current.srcObject = null;
            localVideoRef.current.srcObject = localStream;
            localVideoRef.current.play().catch((err) => console.error("Video play error", err));
        }

        await connectSocket({ token, roomId });

        const device = new mediasoupClient.Device();
        await startMediaFlow(device, localStream);

        if (!device.loaded) {
            alert("Failed to load mediasoup device");
            return;
        }

        await setupConsumerListener(device, (stream) => {
            setRemoteStreams((prev) => [...prev, stream]);
        });

        setJoined(true);
    };

    return {
        joined,
        remoteStreams,
        localVideoRef,
        join,
    };
}
