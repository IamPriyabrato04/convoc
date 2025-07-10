import {
    TrackToggle,
    DisconnectButton,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { LogOut } from "lucide-react";
import React from "react";

export default function Controls() {
    return (
        <div
            className="
        flex w-full justify-center items-center gap-4
        bg-neutral-900/60 backdrop-blur-md border border-neutral-700
        rounded-xl shadow-lg
      "
        >

            <TrackToggle
                source={Track.Source.Microphone}
                className="p-2 rounded-full transition bg-neutral-600 hover:bg-neutral-500"
                showIcon
            />

            <TrackToggle
                source={Track.Source.Camera}
                className="p-2 rounded-full transition bg-neutral-600 hover:bg-neutral-500"
                showIcon
            />

            <TrackToggle
                source={Track.Source.ScreenShare}
                className="p-2 rounded-full transition bg-yellow-600 hover:bg-yellow-700"
                showIcon
            />

            <DisconnectButton className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition">
                <LogOut />
            </DisconnectButton>
        </div>
    );
}
