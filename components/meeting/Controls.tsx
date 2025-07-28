"use client";

import {
    TrackToggle,
    DisconnectButton,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import {
    Users,
    MessageSquare,
    Phone,
    Hand,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMeetingStore } from "@/store/useMeetingStore";

export default function Controls() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const participantCount = useMeetingStore((s) => s.participantCount);
    const chatCount = useMeetingStore((s) => s.chatMessageCount);

    if (isMobile) {
        return (
            <div className="border border-neutral-700 px-4 py-1 glassmorphic">
                <div className="space-y-1">
                    {/* Top row - Mobile toggles */}
                    <div className="flex items-center justify-center gap-4">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="gap-2 hover:bg-neutral-700 text-neutral-400 glassmorphic-dark"
                        >
                            <Users className="w-4 h-4" />
                            {participantCount}
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="gap-2 hover:bg-neutral-700 text-neutral-400 glassmorphic-dark"
                        >
                            <MessageSquare className="w-4 h-4" />
                            {chatCount > 0 && (
                                <Badge variant="destructive" className="w-2 h-2 p-0 rounded-full" />
                            )}
                        </Button>
                    </div>

                    {/* Bottom row - LiveKit Mobile Controls */}
                    <div className="flex items-center justify-center gap-3">
                        <TrackToggle
                            source={Track.Source.Microphone}
                            className="p-2 rounded-full transition bg-neutral-600 hover:bg-neutral-500 glassmorphic"
                            showIcon
                        />
                        <TrackToggle
                            source={Track.Source.Camera}
                            className="p-2 rounded-full transition bg-neutral-600 hover:bg-neutral-500 glassmorphic"
                            showIcon
                        />
                        <TrackToggle
                            source={Track.Source.ScreenShare}
                            className="p-2 rounded-full transition bg-yellow-600 hover:bg-yellow-700"
                            showIcon
                        />
                        <DisconnectButton className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition">
                            <Phone className="w-5 h-5" />
                        </DisconnectButton>
                    </div>
                </div>
            </div>
        );
    }

    // Desktop layout
    return (
        <div className="border border-neutral-700 px-2 py-1 w-fit m-auto rounded-xl glassmorphic-dark">
            <div className="flex items-center justify-center gap-8">
                <TrackToggle
                    source={Track.Source.Microphone}
                    className="p-3 rounded-full transition bg-neutral-600 hover:bg-neutral-500 glassmorphic"
                    showIcon
                />
                <TrackToggle
                    source={Track.Source.Camera}
                    className="p-3 rounded-full transition bg-neutral-600 hover:bg-neutral-500 glassmorphic"
                    showIcon
                />
                <TrackToggle
                    source={Track.Source.ScreenShare}
                    className="p-3 rounded-full transition bg-yellow-600 hover:bg-yellow-700"
                    showIcon
                />

                <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full w-10 h-10 hover:bg-neutral-400 text-neutral-300 bg-neutral-400"
                >
                    <Hand className="w-5 h-5" />
                </Button>

                <DisconnectButton className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition">
                    <Phone className="w-5 h-5" />
                </DisconnectButton>
            </div>
        </div>
    );
}
