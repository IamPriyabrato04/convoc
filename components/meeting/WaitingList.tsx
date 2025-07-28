"use client";

import { useEffect, useState, useCallback, memo } from "react"; // Added useCallback, memo
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader2, Check, X, Users, ChevronDown, UserRound } from "lucide-react"; // UserRound for fallback avatar
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming you have Avatar component

type UserType = {
    id: string;
    name?: string;
    email?: string;
    image?: string;
};

type ParticipantType = {
    id: string; // This should ideally be LiveKit participant SID or a unique ID from your backend
    user: UserType;
};

// Memoized component for individual pending participants
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
        <div
            className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-700/60 transition-colors mb-1 last:mb-0" // Adjusted background, hover, rounded, margin
        >
            {isLoading ? (
                <div className="flex justify-center items-center w-full py-1"> {/* Added py-1 for consistent height */}
                    <Loader2 className="w-5 h-5 animate-spin text-blue-400" /> {/* Changed loader color */}
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8"> {/* Larger avatar */}
                            <AvatarImage src={displayImage} alt={displayName} />
                            <AvatarFallback className="bg-neutral-600 text-white font-bold text-xs">
                                {displayName.charAt(0).toUpperCase() || <UserRound className="w-4 h-4" />} {/* Fallback to UserRound icon */}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-neutral-100 font-medium truncate"> {/* Adjusted text color, font, truncate */}
                            {displayName}
                        </span>
                    </div>
                    <div className="flex gap-2 shrink-0"> {/* Added shrink-0 to prevent buttons from squishing */}
                        <Button
                            onClick={() => onApprove(participant.id)}
                            size="icon"
                            className="w-8 h-8 bg-green-600 hover:bg-green-700 rounded-full transition-colors" // Adjusted size, color, rounded
                            title="Approve"
                        >
                            <Check className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() => onReject(participant.id)}
                            size="icon"
                            className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full transition-colors" // Adjusted size, color, rounded
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

    // Use useCallback to memoize action handlers for performance
    const handleApprove = useCallback(async (id: string) => {
        setLoadingId(id);
        try {
            const res = await fetch(`/api/meetings/${roomId}/approve`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ participantId: id }),
            });
            if (res.ok) {
                // Optimistically update UI or re-fetch to ensure consistency
                setPendingList(prev => prev.filter(p => p.id !== id));
            } else {
                console.error("Failed to approve participant:", await res.text());
            }
        } catch (error) {
            console.error("Failed to approve participant:", error);
        } finally {
            setLoadingId(null);
        }
    }, [roomId]); // Depend on roomId

    const handleReject = useCallback(async (id: string) => {
        setLoadingId(id);
        try {
            const res = await fetch(`/api/meetings/${roomId}/reject`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ participantId: id }),
            });
            if (res.ok) {
                // Optimistically update UI or re-fetch to ensure consistency
                setPendingList(prev => prev.filter(p => p.id !== id));
            } else {
                console.error("Failed to reject participant:", await res.text());
            }
        } catch (error) {
            console.error("Failed to reject participant:", error);
        } finally {
            setLoadingId(null);
        }
    }, [roomId]); // Depend on roomId

    useEffect(() => {
        if (!isOwner) return;

        const fetchPending = async () => {
            try {
                const res = await fetch(`/api/meetings/${roomId}/pending`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setPendingList(data.participants || []);
            } catch (error) {
                console.error("Failed to fetch pending participants:", error);
                setPendingList([]); // Clear list on error
            }
        };

        // Fetch immediately and then set up interval
        fetchPending();
        const interval = setInterval(fetchPending, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
    }, [isOwner, roomId]); // Dependencies for useEffect

    if (!isOwner) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary" // Use a shadcn variant or custom to better integrate
                    className="flex items-center gap-2 px-4 py-1 text-white bg-neutral-600 hover:bg-neutral-700 rounded-full transition-all duration-200 shadow-lg" // More prominent button
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
                // Apply glassmorphic class here
                className="glassmorphic-dark border-neutral-700/50 rounded-lg p-4 mt-2 shadow-2xl space-y-3" // Glassmorphic, softer border, more padding, larger shadow, space between elements
                align="end"
            >
                <h3 className="text-xl font-bold text-neutral-100 mb-2 border-b border-neutral-700/50 pb-2"> {/* Larger, bolder title, subtle bottom border */}
                    Waiting List ({pendingList.length})
                </h3>

                <ScrollArea className="h-[300px] rounded-lg border border-neutral-700/50 p-2"> {/* Adjusted border, padding, rounded */}
                    {pendingList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full min-h-[150px] text-center text-neutral-400"> {/* Centered message for no requests */}
                            <Users className="w-10 h-10 mb-2 opacity-50" />
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