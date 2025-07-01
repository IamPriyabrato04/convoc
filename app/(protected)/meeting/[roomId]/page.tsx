"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMeetingStore } from "@/store/useMeetingStore";
import Header from "@/components/meeting/Header";
import Controls from "@/components/meeting/Controls";
import SidePanel from "@/components/meeting/SidePanel";
import VideoStage from "@/components/meeting/VideoStage";
import { useJoinMeeting } from "@/hooks/useJoinMeeting";

export default function MeetingRoomPage() {
  const params = useParams();
  const router = useRouter();
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const roomId = params.roomId as string;
  const { join } = useJoinMeeting(roomId);

  const {
    setRoomId,
    setStreams,
    localMicOn,
    localCameraOn,
  } = useMeetingStore();

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        setRoomId(roomId);

        // Get local stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: localCameraOn,
          audio: localMicOn,
        });

        if (!isMounted) return;

        setStreams([stream]);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.muted = false;
          localVideoRef.current.play().catch((err) => {
            console.error("Video play error:", err);
          });
        }

        await join();
      } catch (err) {
        console.error("Error joining meeting:", err);
        router.push("/dashboard");
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-white">
      <Header roomId={roomId} />

      <div className="flex flex-1 overflow-hidden">
        <VideoStage localVideoRef={localVideoRef as React.RefObject<HTMLVideoElement>} />
        <SidePanel />
      </div>

      <Controls />
    </div>
  );
}
