"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { LiveKitRoom } from "@livekit/components-react";
import Header from "@/components/meeting/Header";
import VideoStage from "@/components/meeting/VideoStage";
// import SidePanel from "@/components/meeting/SidePanel";
// import Controls from "@/components/meeting/Controls";
import { Loader2 } from "lucide-react";
import { useMeetingStore } from "@/store/useMeetingStore";
import { useUserStore } from "@/store/useUserStore";

export default function MeetingRoomPage() {
  const { id: userId } = useUserStore();
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;
  const { setRoomId } = useMeetingStore();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (!userId) {
          console.error("No userId in store");
          return router.push("/auth/login");
        }
        const res = await fetch(`/api/livekit-token?room=${roomId}&userId=${userId}`);
        const data = await res.json();
        if (!data.token) {
          console.error("Failed to fetch LiveKit token");
          return router.push("/dashboard");
        }
        console.log("LiveKit token fetched successfully", data.token);
        setToken(data.token);
        setRoomId(roomId);
      } catch (error) {
        console.error("Failed to fetch LiveKit token", error);
        router.push("/dashboard");
      }
    };

    if (roomId && userId) {
      fetchToken();
    }
  }, [roomId, userId]);

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-950 text-white">
        <Loader2 className="h-10 w-10 animate-spin" /> Loading...
      </div>
    );
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect
      onDisconnected={() => router.push("/dashboard")}
      video
      audio
    >
      <div className="flex flex-col h-screen bg-neutral-950 text-white">
        <Header roomId={roomId} />
        <div className="flex flex-1 overflow-hidden">
          <VideoStage />
          {/* <SidePanel /> */}
        </div>
        {/* <Controls /> */}
      </div>
    </LiveKitRoom>
  );
}
