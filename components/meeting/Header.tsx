"use client";

import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { useLeaveMeeting } from "@/hooks/useLeaveMeeting";
import { useMeetingStore } from "@/store/useMeetingStore";

export default function Header({ roomId }: { roomId: string }) {
    const { leave } = useLeaveMeeting();
    const { setRoomId, setStreams } = useMeetingStore();

    const handleLeave = async () => {
        await leave();
        setRoomId("");
        setStreams([]);
    };

    return (
        <div className="flex items-center justify-between rounded-2xl bg-neutral-900 px-6 py-1 w-full">
            <div className="flex items-center gap-2">
                <h2 className="text-lg font-medium">Meeting ID:</h2>
                <span className="text-md opacity-60">{roomId}</span>
            </div>
            <Button
                onClick={handleLeave}
                className="px-4 bg-red-400 rounded-2xl hover:bg-red-700 transition cursor-pointer"
            >
                Leave <LogOutIcon />
            </Button>
        </div>
    );
}
