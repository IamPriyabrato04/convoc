"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangleIcon,
  LoaderCircleIcon,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";

export default function MeetingSetup({
  onJoin,
}: {
  onJoin: (stream: MediaStream) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Set up media stream only once
  useEffect(() => {
    const setupMedia = async () => {
      try {
        const media = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(media);
      } catch (err) {
        setError("Unable to access camera/microphone");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    setupMedia();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // 2. Attach stream to video element when ready
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const toggleCamera = () => {
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setCameraOn(videoTrack.enabled);
  };

  const toggleMic = () => {
    if (!stream) return;
    const audioTrack = stream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setMicOn(audioTrack.enabled);
  };

  if (loading) {
    return (
      <div className="text-center p-10 flex items-center justify-center gap-2">
        <LoaderCircleIcon className="animate-spin h-10 w-10" />
        Loading camera...
      </div>
    );
  }

  if (error) {
    return (
      <div className="border rounded-2xl border-red-500 text-red-500 flex justify-center items-center gap-2 sm:text-4xl">
        <AlertTriangleIcon size={40} /> {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center md:flex-row gap-6 w-full h-full sm:gap-y-10">
      {/* Webcam Preview */}
      <div className="w-full h-fit md:w-2/3 max-w-lg aspect-video rounded-xl overflow-hidden shadow-lg border-2 border-neutral-400">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center justify-center gap-4 w-full md:w-1/3 max-w-xs">
        <div className="flex items-center gap-6">
          <button
            onClick={toggleMic}
            className={`p-3 rounded-full ${
              micOn ? "bg-gray-500" : "bg-red-600"
            } text-white shadow-lg`}
          >
            {micOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>

          <button
            onClick={toggleCamera}
            className={`p-3 rounded-full ${
              cameraOn ? "bg-gray-500" : "bg-red-600"
            } text-white shadow-lg`}
          >
            {cameraOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>
        </div>

        <button
          onClick={() => onJoin(stream!)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mt-4"
        >
          Ask to join meeting
        </button>
      </div>
    </div>
  );
}
