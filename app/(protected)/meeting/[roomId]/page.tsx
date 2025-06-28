'use client';

import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { connectSocket } from '@/lib/socket';
import { startMediaFlow, setupConsumerListener } from '@/lib/mediasoupClient';
import * as mediasoupClient from 'mediasoup-client';

async function getJwtToken(): Promise<string | null> {
  const res = await fetch("/api/auth/jwt");
  const data = await res.json();
  return data.token;
}


export default function RoomPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [joined, setJoined] = useState(false);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const roomId = useParams().roomId as string;

  const joinMeeting = async () => {
    const token = await getJwtToken();
    if (!token) {
      alert("JWT token missing");
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log("navigator.mediaDevices", navigator.mediaDevices);
      console.log("navigator.mediaDevices.getUserMedia", navigator.mediaDevices?.getUserMedia);
      console.log("Permissions API supported?", navigator.permissions);


      alert("Camera or microphone not supported or permissions denied");
      return;
    }

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (videoRef.current) {
      // videoRef.current.play();
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      videoRef.current.srcObject = localStream;
      videoRef.current.play().catch((err) => console.error("Video play error", err));
    }

    console.log("Token:", token);
    console.log("Room ID:", roomId);
    await connectSocket({ token, roomId });

    const device = new mediasoupClient.Device();
    console.log(device);


    await startMediaFlow(device, localStream);
    if (!device.loaded) {
      alert("Failed to load mediasoup device");
      return;
    }

    await setupConsumerListener(device, (stream) => {
      setRemoteStreams(prev => [...prev, stream]);
    });

    setJoined(true);
  };

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center gap-10 p-4">
      <p className="text-lg font-semibold">Meeting ID: {roomId}</p>

      <video
        ref={videoRef}
        className="w-full max-w-3xl rounded-xl border"
        autoPlay
        muted
        playsInline
      />

      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {remoteStreams.map((stream, i) => (
          <video
            key={i}
            className="w-64 h-48 border rounded"
            autoPlay
            playsInline
            ref={(ref) => {
              if (ref) {
                ref.srcObject = stream;
                ref.play();
              }
            }}
          />
        ))}
      </div>

      {!joined && (
        <button
          onClick={() => { joinMeeting() }}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Join Meeting
        </button>
      )}
    </main>
  );
}
