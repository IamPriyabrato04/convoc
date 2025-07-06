"use client";

import { useState, useRef } from "react";
import * as mediasoupClient from "mediasoup-client";
import { connectSocket, getSocket } from "@/lib/socket";
import { startMediaFlow } from "@/lib/mediasoupClient";

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

        const localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        if (localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
            localVideoRef.current.muted = false;
            await localVideoRef.current.play();
        }

        await connectSocket({ token, roomId });

        const device = new mediasoupClient.Device();
        await startMediaFlow(device, localStream);

        const socket = getSocket();

        let recvTransport: mediasoupClient.types.Transport | null = null;

        socket.addEventListener("message", async (event) => {
            const msg = JSON.parse(event.data);

            if (msg.type === "transportCreated" && msg.data.direction === "recv") {
                recvTransport = device.createRecvTransport(msg.data);

                recvTransport.on("connect", ({ dtlsParameters }, callback) => {
                    socket.send(JSON.stringify({
                        type: "connectTransport",
                        data: { dtlsParameters, direction: "recv" }
                    }));
                    callback();
                });
            }

            if (msg.type === "newProducer" && recvTransport) {
                const { producerId } = msg.data;

                socket.send(JSON.stringify({
                    type: "consume",
                    data: { producerId, rtpCapabilities: device.rtpCapabilities }
                }));
            }

            if (msg.type === "consumed" && recvTransport) {
                const { id, producerId, kind, rtpParameters } = msg.data;

                const consumer = await recvTransport.consume({
                    id,
                    producerId,
                    kind,
                    rtpParameters,
                });

                const stream = new MediaStream([consumer.track]);
                setRemoteStreams((prev) => [...prev, stream]);

                await consumer.resume();
            }
        });

        // Create recv transport request
        socket.send(JSON.stringify({ type: "createWebRtcTransport", data: { direction: "recv" } }));

        setJoined(true);
    };

    return {
        joined,
        remoteStreams,
        localVideoRef,
        join,
    };
}
