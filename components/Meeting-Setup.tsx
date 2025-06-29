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
      <div className="flex flex-col items-center justify-center gap-2 p-10">
        <LoaderCircleIcon className="animate-spin h-10 w-10 text-blue-500" />
        <span className="text-gray-600">Loading camera...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center gap-2 text-red-600 p-6 border border-red-500 rounded-lg shadow">
        <AlertTriangleIcon size={28} />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full h-full px-4">
      {/* Preview */}
      <div className="w-full md:w-2/3 max-w-lg aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-gray-300">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 w-full md:w-1/3">
        <div className="flex gap-4">
          <button
            onClick={toggleMic}
            className={`p-3 rounded-full shadow transition ${micOn ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              } text-white`}
          >
            {micOn ? <Mic size={22} /> : <MicOff size={22} />}
          </button>

          <button
            onClick={toggleCamera}
            className={`p-3 rounded-full shadow transition ${cameraOn ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              } text-white`}
          >
            {cameraOn ? <Video size={22} /> : <VideoOff size={22} />}
          </button>
        </div>

        <button
          onClick={() => { }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
        >
          Ask to join
        </button>
      </div>
    </div>
  );
}
