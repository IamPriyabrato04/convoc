"use client";

import { useMeetingStore } from "@/store/useMeetingStore";
import { Mic, MicOff, Video, VideoOff, Monitor } from "lucide-react";
import { Button } from "../ui/button";

export default function Controls() {
    const { participants, setStreams } = useMeetingStore();
    // you’d also wire up camera/mic toggles here
    return (
        <div className="flex items-center justify-center gap-6 p-4 bg-gray-900">
            <Button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition">
                <Mic />
            </Button>
            <Button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition">
                <Video />
            </Button>
            <Button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition">
                <Monitor />
            </Button>
        </div>
    );
}
