"use client";

import { useEffect, useState, useCallback, memo } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader2, Check, X, Users, ChevronDown, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const PendingParticipantItem = memo(function PendingParticipantItem({
    participant,
    isLoading,
    onApprove,
    onReject,
}: {
    participant: ParticipantType;
    isLoading: boolean;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
}) {
    const displayName = participant.user?.name || participant.user?.email || "Unknown User";
    const displayImage = participant.user?.image || "";

    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-700/60 transition-colors mb-1 last:mb-0">
            {isLoading ? (
                <div className="flex justify-center items-center w-full py-1">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={displayImage} alt={displayName} />
                            <AvatarFallback className="bg-neutral-600 text-white font-bold text-xs">
                                {displayName.charAt(0).toUpperCase() || <UserRound className="w-4 h-4" />}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-neutral-100 font-medium truncate">
                            {displayName}
                        </span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <Button
                            onClick={() => onApprove(participant.id)}
                            size="icon"
                            className="w-8 h-8 bg-green-600 hover:bg-green-700 rounded-full"
                            title="Approve"
                        >
                            <Check className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() => onReject(participant.id)}
                            size="icon"
                            className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full"
                            title="Reject"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
});

export default function WaitingList({
    roomId,
    isOwner,
}: {
    roomId: string;
    isOwner: boolean;
}) {
    const [pendingList, setPendingList] = useState<ParticipantType[]>([]);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown visibility

    const handleApprove = useCallback(
        async (id: string) => {
            setLoadingId(id);
            try {
                const res = await fetch(`/api/meetings/${roomId}/approve`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ participantId: id }),
                });
                if (res.ok) {
                    setPendingList(prev => prev.filter(p => p.id !== id));
                    setDropdownOpen(false); // close dropdown
                } else {
                    console.error("Failed to approve participant:", await res.text());
                }
            } catch (error) {
                console.error("Failed to approve participant:", error);
            } finally {
                setLoadingId(null);
            }
        },
        [roomId]
    );

    const handleReject = useCallback(
        async (id: string) => {
            setLoadingId(id);
            try {
                const res = await fetch(`/api/meetings/${roomId}/reject`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ participantId: id }),
                });
                if (res.ok) {
                    setPendingList(prev => prev.filter(p => p.id !== id));
                    setDropdownOpen(false); // ✅ close dropdown
                } else {
                    console.error("Failed to reject participant:", await res.text());
                }
            } catch (error) {
                console.error("Failed to reject participant:", error);
            } finally {
                setLoadingId(null);
            }
        },
        [roomId]
    );

    useEffect(() => {
        if (!isOwner) return;

        const fetchPending = async () => {
            try {
                const res = await fetch(`/api/meetings/${roomId}/pending`);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setPendingList(data.participants || []);
            } catch (error) {
                console.error("Failed to fetch pending participants:", error);
                setPendingList([]);
            }
        };

        fetchPending();
        const interval = setInterval(fetchPending, 5000);
        return () => clearInterval(interval);
    }, [isOwner, roomId]);

    if (!isOwner) return null;

    return (
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    onClick={() => setDropdownOpen(true)}
                    className="flex items-center gap-2 px-4 py-1 text-white bg-neutral-600 hover:bg-neutral-700 rounded-full shadow-lg"
                >
                    <Users className="w-5 h-5" />
                    <span className="font-medium text-base">Waiting List</span>
                    {pendingList.length > 0 && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full ml-1">
                            {pendingList.length}
                        </span>
                    )}
                    <ChevronDown className="w-5 h-5 text-white ml-1" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="relative glassmorphic-dark border-neutral-700/50 rounded-lg p-4 mt-2 shadow-2xl space-y-3" align="end">
                {/* Close button */}
                <Button
                    onClick={() => setDropdownOpen(false)}
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-neutral-400 hover:text-red-500"
                    title="Close"
                >
                    <X className="w-8 h-8 text-red-700 font-extrabold" />
                </Button>

                <h3 className="text-xl font-bold text-neutral-100 mb-2 border-b border-neutral-700/50 pb-2">
                    Waiting List ({pendingList.length})
                </h3>

                <ScrollArea className="h-[100px] rounded-lg border border-neutral-700/50 p-2">
                    {pendingList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full min-h-[70px] text-center text-neutral-400">
                            <Users className="w-8 h-8 mb-1 opacity-50" />
                            <p className="text-lg">No pending requests</p>
                            <p className="text-sm">New participants will appear here.</p>
                        </div>
                    ) : (
                        pendingList.map((p) => (
                            <PendingParticipantItem
                                key={p.id}
                                participant={p}
                                isLoading={loadingId === p.id}
                                onApprove={handleApprove}
                                onReject={handleReject}
                            />
                        ))
                    )}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
