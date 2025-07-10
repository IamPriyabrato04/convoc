"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LogOutIcon, CopyIcon } from "lucide-react";
import ChatSection from "./Chat-Section";
import { Button } from "../ui/button";
import { useDisconnectButton } from "@livekit/components-react";
import WaitingList from "./WaitingList";
import { useMeetingStore } from "@/store/useMeetingStore";

export default function Header({ roomId }: { roomId: string }) {
    const [copied, setCopied] = useState(false);
    const { isOwner } = useMeetingStore();


    // Setup LiveKit's disconnect button hook with stopTracks true
    const { buttonProps } = useDisconnectButton({ stopTracks: true });

    const { stopTracks, ...cleanProps } = buttonProps;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(roomId);
            setCopied(true);
            toast.success("Room ID copied!");
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Failed to copy:", err);
            toast.error("Failed to copy Room ID");
        }
    };

    return (
        <div
            className="
        flex flex-col sm:flex-row sm:items-center sm:justify-between
        gap-3 sm:gap-0
        rounded-2xl bg-neutral-900/60 backdrop-blur-md shadow-lg
        px-4 w-full border border-neutral-700
      "
        >
            <div className="flex flex-wrap items-center gap-3 overflow-hidden">
                <h2 className="text-base sm:text-lg font-medium">Meeting ID :</h2>
                <span className="text-sm sm:text-md opacity-70 truncate max-w-[150px] sm:max-w-none">
                    {roomId}
                </span>

                <button
                    onClick={handleCopy}
                    className="
            flex items-center justify-center p-1 rounded 
            hover:bg-neutral-700 transition relative
          "
                >
                    <CopyIcon
                        className={`w-4 h-4 transition-transform duration-300 ${copied ? "scale-125 text-green-500" : ""}`}
                    />
                </button>
            </div>
            {isOwner && roomId && (
                <WaitingList roomId={roomId} isOwner={isOwner} />
            )}

            <ChatSection />

            <Button
                {...cleanProps}
                className="px-4 bg-glass bg-red-500 rounded-2xl hover:bg-red-700 transition text-sm sm:text-base flex items-center cursor-pointer" onClick={() => {
                    console.log("Disconnecting from room...");
                    window.location.href = "/dashboard";
                }}
            >
                Leave <LogOutIcon className="ml-1 h-4 w-4" />
            </Button>
        </div>
    );
}
