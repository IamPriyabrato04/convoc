"use client";

import { useState, useEffect, useRef } from "react"; // Import useEffect and useRef for auto-scroll
import { useParticipants, useLocalParticipant, useChat } from "@livekit/components-react";
import { useMeetingStore } from "@/store/useMeetingStore";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
    Users,
    MessageSquare,
    MoreHorizontal,
    Mic,
    MicOff,
    Video,
    VideoOff,
} from "lucide-react";
import ChatBubble from "../Chat-Bubble";
import ChatInputBox from "../ChatInputBox";
import { useMediaQuery } from "@/hooks/useMediaQuery";
// import MobilePanel from "./MobilePanel";

export default function SidePanel() {
    const participantsLive = useParticipants();
    const { localParticipant } = useLocalParticipant();

    // useChat from LiveKit for real-time chat
    const { chatMessages, send } = useChat();

    const [activeTab, setActiveTab] = useState<"participants" | "chat">("chat"); // Default to chat as per image
    const [newMessage, setNewMessage] = useState("");

    // Ref for auto-scrolling chat messages
    const chatMessagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll effect
    useEffect(() => {
        chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);


    const handleSend = () => {
        if (newMessage.trim()) {
            send(newMessage);
            setNewMessage("");
        }
    };

    const participants = participantsLive
        .map((p) => {
            const meta = p.metadata ? JSON.parse(p.metadata) : {};
            const name = meta.name || p.name || "Unknown";
            const avatar = meta.image || "/defaultProfile.png";
            const isHost = meta.isHost || false;
            // Use p.sid for unique identification for isPinned and isMuted/isVideoOff checks
            const isPinned = useMeetingStore.getState().pinnedParticipants.some((pp) => pp.id === p.sid);
            // LiveKit provides direct properties for audio/video status
            const isMuted = !p.isMicrophoneEnabled; // Invert logic for "isMuted"
            const isVideoOff = !p.isCameraEnabled; // Invert logic for "isVideoOff"

            // console.log(`Participant ${p.sid} - Name: ${name}, Avatar: ${avatar}, Is Host: ${isHost}, Is Pinned: ${isPinned}, Is Muted: ${isMuted}, Is Video Off: ${isVideoOff}`);

            const status = "online"; // You might get this from LiveKit or other presence data if available
            return { id: p.sid, name, avatar, isHost, isPinned, isMuted, isVideoOff, status };
        })
        .sort((a, b) => {
            // Sort local participant to the top
            if (a.id === localParticipant.sid) return -1;
            if (b.id === localParticipant.sid) return 1;
            return 0; // Maintain original order for others
        });


    // const pinnedCount = participants.filter((p) => p.isPinned).length;

    // Helper for formatting time (assuming you have this in '@/lib/utils')
    const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const mobile = useMediaQuery("(max-width: 768px)"); // Adjust breakpoint as needed
    console.log(mobile);
    

    // if (mobile) {
    //     return (
    //         <MobilePanel
    //             isOpen={open}
    //             onClose={onClose}
    //             participants={participants}
    //             chatMessages={chatMessages}
    //             send={send}
    //             newMessage={newMessage}
    //             setNewMessage={setNewMessage}
    //             activeTab={activeTab}
    //             setActiveTab={setActiveTab}
    //         />
    //     );
    // }

    return (
        <div className="w-[370px] min-w-[320px] max-w-[330px] rounded-2xl overflow-hidden glassmorphic flex flex-col h-full m-1 mt-1"> {/* Applied glassmorphic and rounded corners, margin */}
            <Tabs
                value={activeTab}
                onValueChange={(val) => val === 'participants' || val === 'chat' ? setActiveTab(val) : null}
                className="flex-1 flex flex-col"
            >
                {/* Tab Header for Participants and Live Chat */}
                <div className="p-4 pt-2 pb-2"> {/* Adjusted padding */}
                    <TabsList className="grid grid-cols-2 bg-neutral-700/50 rounded-lg w-full h-10 border border-neutral-600/50"> {/* Softer background, rounded, border */}
                        <TabsTrigger value="participants" className="text-neutral-200 gap-2 data-[state=active]:bg-neutral-600/70 data-[state=active]:text-white rounded-md text-sm font-semibold"> {/* Softer active state */}
                            <Users className="w-4 h-4" /> Participants
                            <Badge className="ml-1 text-xs bg-sky-800 text-neutral-200 rounded-full h-5 px-2 py-0.5"> {/* Rounded badge */}
                                {participants.length}
                            </Badge>
                        </TabsTrigger>
                        <TabsTrigger value="chat" className="text-neutral-200 gap-2 data-[state=active]:bg-neutral-600/70 data-[state=active]:text-white rounded-md text-sm font-semibold"> {/* Softer active state */}
                            <MessageSquare className="w-4 h-4" /> Live Chat
                            <Badge className="ml-1 text-xs bg-sky-800 text-neutral-200 rounded-full h-5 px-2 py-0.5"> {/* Rounded badge */}
                                {chatMessages.length}
                            </Badge>
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Participants Tab Content */}
                <TabsContent value="participants" className="flex-1 m-0 flex flex-col"> {/* Added flex flex-col */}
                    {/* Header for Participants List */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-700/50"> {/* Adjusted padding, softer border */}
                        <span className="text-sm font-semibold text-neutral-200">Participants</span> {/* Changed font-medium to font-semibold, adjusted color */}
                        <div className="flex items-center gap-2">
                            {/* The image doesn't show pinned count like this, but if you want to keep it: */}
                            {/* <span className="text-xs text-neutral-400">Pinned: {pinnedCount}/4</span> */}
                            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-neutral-700/50 rounded-full"> {/* Rounded button */}
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <ScrollArea className="flex-1"> {/* flex-1 ensures scroll area fills remaining space */}
                        <div className="p-1 space-y-1">
                            {participants.map((p) => (
                                <div key={p.id} className="flex items center gap-2 py-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/60 transition-colors border border-neutral-700"> {/* Softer background, transition */}
                                    <Avatar className="w-8 h-8"> {/* Slightly larger avatar */}
                                        <AvatarImage src={p.avatar} />
                                        <AvatarFallback className="bg-blue-600 text-white font-bold text-sm"> {/* Changed fallback color/style */}
                                            {p.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 w-0">
                                        <div className="flex items-center gap-2 pl-1">
                                            <span className="text-sm truncate font-semibold text-white">{p.name}</span> {/* Font style */}
                                            {p.id === localParticipant.sid && (
                                                <Badge className="text-xs bg-neutral-600/70 text-neutral-300 rounded-full px-1 py-0 font-normal">You</Badge>
                                            )}
                                            {p.isHost && <Badge className="text-xs bg-blue-600 text-white rounded-full px-1 font-normal">Host</Badge>} {/* Host badge style */}
                                        </div>
                                        {/* <div className="text-xs text-neutral-400 truncate">{p.id === localParticipant.sid ? `@${localParticipant.identity}` : `@${p.id}`}</div> Display identity as handle */}
                                    </div>
                                    <div className="flex items-center gap-3 pr-3">
                                        {!p.isMuted ? <Mic className="w-4 h-4 text-neutral-400" /> : <MicOff className="w-4 h-4 text-red-500" />} {/* Icons: use text-neutral-400 for enabled, text-red-500 for muted */}
                                        {!p.isVideoOff ? <Video className="w-4 h-4 text-neutral-400" /> : <VideoOff className="w-4 h-4 text-red-500" />} {/* Icons: use text-neutral-400 for enabled, text-red-500 for off */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>

                {/* Live Chat Tab Content */}
                <TabsContent value="chat" className="flex-1 flex flex-col m-0">
                    {/* Header for Live Chat */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-700/50"> {/* Adjusted padding, softer border */}
                        <span className="text-sm font-semibold text-neutral-200">Live Chat</span> {/* Changed font-medium to font-semibold, adjusted color */}
                        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-neutral-700/50 rounded-full"> {/* Rounded button */}
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Scrollable Message Area */}
                    {/* The outer div is to ensure flex-1 works correctly for ScrollArea */}
                    <div className="flex-1 flex flex-col overflow-y-hidden h-full">
                        <ScrollArea className="px-2 h-[445px]"> {/* flex-1 takes available space for messages */}
                            <div className="space-y-4 pt-2"> {/* Added pt-2 for top padding */}
                                {chatMessages.map((msg) => {
                                    const participant = participantsLive.find(p => p.identity === msg.from?.identity);
                                    let senderName = msg.from?.name || msg.from?.identity || "Anonymous";
                                    let senderImage = "";
                                    const senderHandle = msg.from?.identity || "anonymous";

                                    if (participant) {
                                        try {
                                            const meta = participant.metadata ? JSON.parse(participant.metadata) : {};
                                            senderName = meta.name || senderName;
                                            senderImage = meta.image || "";
                                        } catch {
                                            // ignore parse errors
                                        }
                                    }
                                    const isLocalUser = msg.from?.identity === localParticipant.identity;
                                    return (
                                        <div
                                            key={msg.id}
                                            // Conditional styling for sender and receiver bubbles
                                            className={`flex ${isLocalUser ? "justify-end" : "justify-start"} items-start`}
                                        >
                                            <ChatBubble
                                                senderImage={senderImage}
                                                username={isLocalUser ? "You" : senderName}
                                                userHandle={isLocalUser ? `@${localParticipant.identity}` : `@${senderHandle}`}
                                                time={formatTime(new Date(msg.timestamp))}
                                                message={msg.message}
                                                isLocalUser={isLocalUser} // Pass this for styling within ChatBubble
                                            />
                                        </div>
                                    );
                                })}
                                <div ref={chatMessagesEndRef} /> {/* Dummy div for scrolling to the bottom */}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Fixed Input Box Area - OUTSIDE the ScrollArea but inside TabsContent */}
                    <div className="flex-shrink-0 p-4 bg-transparent"> {/* Added padding matching image */}
                        <ChatInputBox
                            newMessage={newMessage}
                            setNewMessage={setNewMessage}
                            onSendMessage={handleSend}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div >
    );
}