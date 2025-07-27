"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { LiveKitRoom } from "@livekit/components-react";
import Header from "@/components/meeting/Header";
import VideoStage from "@/components/meeting/VideoStage";
import { Loader2 } from "lucide-react";
import { useMeetingStore } from "@/store/useMeetingStore";
import { useUserStore } from "@/store/useUserStore";
import SidePanel from "@/components/meeting/SidePanel";
import SummaryPanel from "@/components/meeting/SummaryPannel";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function MeetingRoomPage() {
  const { id: userId } = useUserStore();
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;

  const {
    setRoomId,
    allowedToJoin,
    isOwner,
    roomId: storeRoomId,
  } = useMeetingStore();

  const [token, setToken] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  useEffect(() => {
    const checkPermissionsAndFetchToken = async () => {
      try {
        const camPerm = await navigator.permissions.query({ name: "camera" as PermissionName });
        const micPerm = await navigator.permissions.query({ name: "microphone" as PermissionName });

        if (camPerm.state === "denied" || micPerm.state === "denied") {
          setPermissionError("Camera and/or Microphone permission denied. Please enable permissions in your browser settings.");
          return;
        }

        if (!userId) {
          console.error("No userId in store");
          return router.push("/auth/login");
        }

        if (!allowedToJoin && !isOwner) {
          return (
            <div className="flex items-center justify-center h-screen bg-neutral-950 text-white">
              <Loader2 className="h-10 w-10 animate-spin" /> Waiting to be allowed...
            </div>
          );
        }


        const res = await fetch(`/api/livekit-token?room=${roomId}&userId=${userId}`);
        const data = await res.json();
        console.log("LiveKit token response:", data);

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
      checkPermissionsAndFetchToken();
    }
  }, [roomId, userId, isOwner, allowedToJoin]);

  // Prevent manual URL access if store roomId doesn't match
  useEffect(() => {
    if (!storeRoomId || storeRoomId !== roomId) {
      router.push("/dashboard");
    }
  }, [storeRoomId, roomId, router]);

  if (permissionError) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-950">
        <div className="backdrop-blur-md bg-neutral-800/60 border border-neutral-700 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Permissions Needed</h2>
          <p className="mb-6 text-gray-300">{permissionError}</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 transition text-white font-medium shadow"
          >
            Go back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-950 text-white">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect
      onDisconnected={() => router.push("/dashboard")}
      audio={true} video={true}
    >
      <div className="h-screen bg-neutral-950 flex flex-col overflow-hidden border border-neutral-600 rounded-md">
        <Header roomId={roomId} />
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Video Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-2 md:p-4">
              <VideoStage />
            </div>

            <SummaryPanel />
          </div>
          <SidePanel />
        </div>
      </div>
    </LiveKitRoom>
  );
}
