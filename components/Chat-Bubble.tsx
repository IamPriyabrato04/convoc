import { CheckCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React from "react"; // Explicitly import React

interface ChatBubbleProps {
    senderImage?: string; // Made optional as per image (some messages don't have avatar)
    username: string;
    userHandle?: string; // Added for the @name below the username
    time: string;
    message: string;
    isLocalUser: boolean; // Prop to determine if it's "You" for styling
}

export default function ChatBubble({ senderImage, username, userHandle, time, message, isLocalUser }: ChatBubbleProps) {
    return (
        <div className={`flex flex-col max-w-[calc(100%-1rem)] ${isLocalUser ? "items-end" : "items-start"}`}>
            <div className={`flex items-center gap-x-2 pb-1 ${isLocalUser ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar only if senderImage is provided or if it's "You" for consistency */}
                {senderImage && (
                    <Avatar className="w-6 h-6 shrink-0"> {/* Slightly larger avatar than 4x4 */}
                        <AvatarImage src={senderImage} alt={username} />
                        <AvatarFallback className={`${isLocalUser ? "bg-blue-600" : "bg-neutral-600"} text-white text-xs font-semibold`}>
                            {username.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                )}
                <div className={`flex flex-col ${isLocalUser ? "items-end" : "items-start"}`}>
                    <span className="text-sm font-semibold text-neutral-200"> {/* Increased font size and changed color to match image */}
                        {username}
                    </span>
                    {userHandle}
                </div>
            </div>

            <p className={`text-sm whitespace-pre-wrap font-normal py-2 px-3 rounded-xl max-w-full break-words
                          ${isLocalUser
                    ? "bg-blue-600 text-white rounded-br-sm" // My messages
                    : "bg-neutral-700 text-white rounded-bl-sm" // Other participants' messages
                }`}>
                {message}
            </p>

            <div className={`flex items-center gap-x-2 pt-1 ${isLocalUser ? "justify-end" : "justify-start"}`}>
                {/* Assuming CheckCheck is for message status, like "Delivered" */}
                {isLocalUser && ( // Only show delivered status for local user's messages
                    <div className="flex gap-x-1 items-center">
                        <CheckCheck className="w-3 h-3 text-blue-400" /> {/* Smaller icon */}
                        <span className="text-[10px] font-light text-neutral-400">
                            Delivered
                        </span>
                    </div>
                )}
                <span className="text-[10px] font-light text-neutral-400">{time}</span>
            </div>
        </div>
    );
}