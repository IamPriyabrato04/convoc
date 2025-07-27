import { CheckCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function ChatBubble({ senderImage, username, time, message }: { senderImage: string, username: string, time: string, message: string }) {
    return (
        <div className="flex flex-col min-w-min px-1 max-w-[250px]">
            <div className={`flex items-center gap-x-2 pb-1 ${username === "You" ? "justify-end flex-row-reverse" : "justify-start flex-row"}`}>
                {senderImage && (
                    <Avatar className="w-5 h-5">
                        <AvatarImage src={senderImage} />
                        <AvatarFallback className="bg-neutral-600 text-white">
                            {username.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                )}
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {username}
                </span>
            </div>

            <p className={`text-sm break-all whitespace-pre-wrap font-normal py-1 px-2 text-gray-900 dark:text-white border border-gray-600 rounded-lg ${username === "You" ? `bg-blue-900 text-white self-end` : `bg-gray-500 text-black`}`}>
                {message}
            </p>

            <div className="flex items-center gap-x-2">
                <div className="flex gap-x-1 items-center">
                    <CheckCheck className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] font-light text-gray-500 dark:text-gray-400">
                        Delivered
                    </span>
                </div>
                <span className="text-[10px] font-light text-gray-500 dark:text-gray-400">{time}</span>
            </div>

        </div>
    )
}

