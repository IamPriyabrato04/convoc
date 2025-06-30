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
import { Button } from "./ui/button";

export default function MeetingSetup() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <LoaderCircleIcon className="animate-spin h-12 w-12 text-blue-600" />
        <span className="text-gray-500 text-lg">Loading camera...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3 p-6 border border-red-500 rounded-xl bg-red-50 shadow">
        <AlertTriangleIcon size={36} className="text-red-600" />
        <span className="text-red-600 font-medium">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      {/* Preview */}
      <div className="w-full max-w-2xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-300 mb-6">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <Button
          onClick={toggleMic}
          className={`p-4 rounded-full shadow-lg transition-transform transform hover:scale-105 ${micOn ? "bg-neutral-600 hover:bg-neutral-700" : "bg-red-600 hover:bg-red-700"
            } text-white`}
        >
          {micOn ? <Mic size={24} /> : <MicOff size={24} />}
        </Button>

        <Button
          onClick={toggleCamera}
          className={`p-3 rounded-full shadow-lg transition-transform transform hover:scale-105 ${cameraOn ? "bg-neutral-600 hover:bg-neutral-700" : "bg-red-600 hover:bg-red-700"
            } text-white`}
        >
          {cameraOn ? <Video size={20} /> : <VideoOff size={20} />}
        </Button>
      </div>

      <Button
        onClick={() => { }}
        className="w-full max-w-xs bg-blue-600 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105"
      >
        Join the meeting 
      </Button>
    </div>
  );
}
