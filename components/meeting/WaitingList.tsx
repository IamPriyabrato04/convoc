"use client";

import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader2, Check, X, Users, ChevronDown } from "lucide-react";

type UserType = {
    id: string;
    name?: string;
    email?: string;
    image?: string;
};

type ParticipantType = {
    id: string;
    user: UserType;
};

export default function WaitingList({
    roomId,
    isOwner,
}: {
    roomId: string;
    isOwner: boolean;
}) {
    const [pendingList, setPendingList] = useState<ParticipantType[]>([]);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    useEffect(() => {
        if (!isOwner) return;

        const fetchPending = async () => {
            try {
                const res = await fetch(`/api/meetings/${roomId}/pending`);
                const data = await res.json();
                if (data.participants) {
                    setPendingList(data.participants);
                } else {
                    setPendingList([]);
                }
            } catch (error) {
                console.error("Failed to fetch pending participants:", error);
            }
        };

        fetchPending();
        const interval = setInterval(fetchPending, 5000);

        return () => clearInterval(interval);
    }, [isOwner, roomId]);

    const approve = async (id: string) => {
        setLoadingId(id);
        try {
            await fetch(`/api/meetings/${roomId}/approve`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ participantId: id }),
            });
        } catch (error) {
            console.error("Failed to approve participant:", error);
        }
        setLoadingId(null);
    };

    const reject = async (id: string) => {
        setLoadingId(id);
        try {
            await fetch(`/api/meetings/${roomId}/reject`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ participantId: id }),
            });
        } catch (error) {
            console.error("Failed to reject participant:", error);
        }
        setLoadingId(null);
    };

    if (!isOwner) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center border border-neutral-600 rounded-3xl gap-1 text-white hover:bg-neutral-700 transition w-fit"
                >
                    <Users className="w-5 h-5" />
                    <span>Waiting List </span><ChevronDown className="w-5 h-5 border border-amber-100 rounded-full" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="bg-neutral-900 border border-neutral-300 w-80"
                align="end"
            >
                <h3 className="text-lg font-bold text-white mb-2">
                    Waiting List ({pendingList.length}) 
                </h3>

                <ScrollArea className="h-[300px] rounded-md border border-neutral-700 p-1 bg-neutral-800">
                    {pendingList.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center">No pending requests</p>
                    ) : (
                        pendingList.map((p) => {
                            const isLoading = loadingId === p.id;
                            return (
                                <div
                                    key={p.id}
                                    className="flex items-center justify-between bg-neutral-900 border border-neutral-700 p-2 rounded-md mb-1"
                                >
                                    {isLoading ? (
                                        <div className="flex justify-center items-center w-full">
                                            <Loader2 className="w-5 h-5 animate-spin text-white" />
                                        </div>
                                    ) : (
                                        <>
                                            <span className="text-sm text-white">
                                                {p.user?.name || p.user?.email || "Unknown"}
                                            </span>
                                            <div className="flex gap-1">
                                                <Button
                                                    onClick={() => approve(p.id)}
                                                    size="icon"
                                                    className="bg-green-500 rounded-full hover:bg-green-700"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    onClick={() => reject(p.id)}
                                                    size="icon"
                                                    className="bg-red-500 rounded-full hover:bg-red-700"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })
                    )}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
