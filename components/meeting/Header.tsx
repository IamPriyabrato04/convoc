// "use client";

// import { useState } from "react";
// import { toast } from "sonner";
// import { LogOutIcon, CopyIcon } from "lucide-react";
// import ChatSection from "./Chat-Section";
// import { Button } from "../ui/button";
// import { useDisconnectButton } from "@livekit/components-react";
// import WaitingList from "./WaitingList";
// import { useMeetingStore } from "@/store/useMeetingStore";

// export default function Header({ roomId }: { roomId: string }) {
//     const [copied, setCopied] = useState(false);
//     const { isOwner } = useMeetingStore();


//     // Setup LiveKit's disconnect button hook with stopTracks true
//     const { buttonProps } = useDisconnectButton({ stopTracks: true });

//     const { stopTracks, ...cleanProps } = buttonProps;

//     const handleCopy = async () => {
//         try {
//             await navigator.clipboard.writeText(roomId);
//             setCopied(true);
//             toast.success("Room ID copied!");
//             setTimeout(() => setCopied(false), 1500);
//         } catch (err) {
//             console.error("Failed to copy:", err);
//             toast.error("Failed to copy Room ID");
//         }
//     };

//     return (
//         <div
//             className="
//         flex flex-col sm:flex-row sm:items-center sm:justify-between
//         gap-3 sm:gap-0
//         rounded-2xl bg-neutral-900/60 backdrop-blur-md shadow-lg
//         px-4 w-full border border-neutral-700
//       "
//         >
//             <div className="flex flex-wrap items-center gap-3 overflow-hidden">
//                 <h2 className="text-base sm:text-lg font-medium">Meeting ID :</h2>
//                 <span className="text-sm sm:text-md opacity-70 truncate max-w-[150px] sm:max-w-none">
//                     {roomId}
//                 </span>

//                 <button
//                     onClick={handleCopy}
//                     className="
//             flex items-center justify-center p-1 rounded 
//             hover:bg-neutral-700 transition relative
//           "
//                 >
//                     <CopyIcon
//                         className={`w-4 h-4 transition-transform duration-300 ${copied ? "scale-125 text-green-500" : ""}`}
//                     />
//                 </button>
//             </div>
//             {isOwner && roomId && (
//                 <WaitingList roomId={roomId} isOwner={isOwner} />
//             )}

//             <ChatSection />

//             <Button
//                 {...cleanProps}
//                 className="px-4 bg-glass bg-red-500 rounded-2xl hover:bg-red-700 transition text-sm sm:text-base flex items-center cursor-pointer" onClick={() => {
//                     console.log("Disconnecting from room...");
//                     window.location.href = "/dashboard";
//                 }}
//             >
//                 Leave <LogOutIcon className="ml-1 h-4 w-4" />
//             </Button>
//         </div>
//     );
// }


"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, Share, Bell, MoreHorizontal, UserPlus, CopyIcon } from "lucide-react"
import { useMeetingStore } from "@/store/useMeetingStore"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useState } from "react"
import { toast } from "sonner"
import WaitingList from "./WaitingList"


export default function Header({ roomId }: { roomId: string }) {
    const [copied, setCopied] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)")
    const participantCount = useMeetingStore((state) => state.participantCount);
    const isOwner = useMeetingStore((state) => state.isOwner);

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
        <div className="bg-neutral-950 border-b border-neutral-700 px-2 md:px-4 py-1 md:py-2 flex items-center justify-between rounded-lg">
            {/* Left Section */}
            <div className="flex items-center gap-2 md:gap-4">
                {!isMobile ? (
                    <>
                        <div className="flex items-center gap-2">
                            <UserPlus className="w-5 h-5 text-neutral-400" />
                            <span className="text-sm text-neutral-400">Join meeting</span>
                            <Badge variant="secondary" className="text-xs bg-neutral-700 text-neutral-200">
                                {participantCount}
                            </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-neutral-400" />
                            <span className="text-sm text-neutral-400">Invited:</span>
                            <Badge variant="secondary" className="text-xs bg-neutral-700 text-neutral-200">
                                2
                            </Badge>
                        </div>
                    </>
                ) : (
                    <Badge variant="secondary" className="text-xs bg-neutral-700 text-neutral-200">
                        {participantCount} participants
                    </Badge>
                )}
            </div>

            {/* Center Section */}
            <div className="flex gap-3 text-center px-2">
                <WaitingList roomId={roomId} isOwner={isOwner} />
                <span className="text-sm md:text-lg font-semibold text-white truncate max-w-xs md:max-w-md mx-auto">
                    {isMobile ? "Weekly Meeting" : `Room: ${roomId ?? "Untitled"}`}
                </span>
                <CopyIcon onClick={handleCopy}
                    className={`w-4 h-4 mt-2 transition-transform duration-300 ${copied ? "scale-125 text-green-500" : "text-neutral-300"}`}
                />
            </div>



            {/* Right Section */}
            <div className="flex items-center gap-1 md:gap-3">
                {!isMobile ? (
                    <>
                        <Button variant="ghost" size="sm" className="gap-2 text-neutral-400 hover:text-white hover:bg-neutral-700">
                            <Share className="w-4 h-4" />
                            Share link
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative text-neutral-400 hover:text-white hover:bg-neutral-700"
                        >
                            <Bell className="w-4 h-4" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                        </Button>

                        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-neutral-700">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </>
                ) : (
                    <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-neutral-700">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                )}

                <Avatar className="w-6 h-6 md:w-8 md:h-8">
                    <AvatarImage src="/defaultProfile.png" />
                    <AvatarFallback className="bg-neutral-600 text-white">U</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}
