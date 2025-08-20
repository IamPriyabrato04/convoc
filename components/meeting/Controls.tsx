"use client";

import {
    TrackToggle,
    DisconnectButton,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import {
    Phone,
    Hand,
} from "lucide-react";
import { Button } from "@/components/ui/button";


export default function Controls() {

    return (
        <div className="border border-neutral-700 bg-neutral-900/50 glassmorphic-dark rounded-4xl p-2 w-full max-w-xs sm:max-w-sm px-5">
            <div className="flex items-center justify-evenly gap-1 sm:flex-row sm:justify-center sm:gap-8">
                <TrackToggle
                    source={Track.Source.Microphone}
                    className="p-4 rounded-full transition bg-neutral-600 hover:bg-neutral-500 glassmorphic"
                    showIcon
                />
                <TrackToggle
                    source={Track.Source.Camera}
                    className="p-4 rounded-full transition bg-neutral-600 hover:bg-neutral-500 glassmorphic"
                    showIcon
                />
                <TrackToggle
                    source={Track.Source.ScreenShare}
                    className="p-4 rounded-full transition bg-yellow-600 hover:bg-yellow-700"
                    showIcon
                />

                <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full w-12 h-12 hover:bg-neutral-400 text-neutral-300 bg-neutral-600"
                >
                    <Hand className="w-15 h-15" />
                </Button>

                <DisconnectButton className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition">
                    <Phone className="w-6 h-6" />
                </DisconnectButton>
            </div>
        </div>
    );
}
