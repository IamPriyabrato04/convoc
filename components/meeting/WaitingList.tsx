import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckIcon, XIcon, Loader2Icon } from "lucide-react";

export default function WaitingList({ roomId, isOwner }: { roomId: string, isOwner: boolean }) {
    const [pendingList, setPendingList] = useState<any[]>([]);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    useEffect(() => {
        if (!isOwner) return;

        const fetchPending = async () => {
            const res = await fetch(`/api/meetings/${roomId}/pending`);
            const data = await res.json();
            setPendingList(data.participants || []);
        };

        fetchPending();
        const interval = setInterval(fetchPending, 5000);

        return () => clearInterval(interval);
    }, [isOwner, roomId]);

    const approve = async (id: string) => {
        setLoadingId(id);
        await fetch(`/api/meetings/${roomId}/approve`, {
            method: "POST",
            body: JSON.stringify({ participantId: id }),
        });
        setLoadingId(null);
    };

    const reject = async (id: string) => {
        setLoadingId(id);
        await fetch(`/api/meetings/${roomId}/reject`, {
            method: "POST",
            body: JSON.stringify({ participantId: id }),
        });
        setLoadingId(null);
    };

    if (!isOwner) return null;

    return (
        <div>
            <h3 className="text-2xl font-bold mb-2">Waiting List</h3>
            <ScrollArea className="h-[200px] max-w-[320px] rounded-md border p-2">
                {pendingList.length === 0 ? (
                    <p className="text-gray-400 text-sm">No pending requests</p>
                ) : (
                    pendingList.map((p) => {
                        const isLoading = loadingId === p.id;
                        return (
                            <div
                                key={p.id}
                                className="flex items-center justify-between bg-neutral-900 border border-neutral-700 p-1 rounded-md mb-1 min-h-[40px]"
                            >
                                {isLoading ? (
                                    <div className="flex justify-center items-center w-full">
                                        <Loader2Icon className="w-5 h-5 animate-spin text-white" />
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-sm text-white">{p.user.name}</span>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => approve(p.id)}
                                                size="icon"
                                                className="bg-green-500 rounded-full hover:bg-green-700"
                                            >
                                                <CheckIcon className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                onClick={() => reject(p.id)}
                                                size="icon"
                                                className="bg-red-500 rounded-full hover:bg-red-700"
                                            >
                                                <XIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })
                )}
            </ScrollArea>
        </div>
    );
}
