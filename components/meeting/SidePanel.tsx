"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Send, MoreHorizontal, Mic, MicOff, Video, VideoOff, Pin, PinOff } from "lucide-react";
import ChatBubble from "../Chat-Bubble";

export default function SidePanel() {
    const participantsLive = useParticipants();
    const { localParticipant } = useLocalParticipant();

    // useChat from LiveKit for real-time chat
    const { chatMessages, send } = useChat();
    const pinParticipant = useMeetingStore((state) => state.togglePinParticipant);

    const [activeTab, setActiveTab] = useState<"participants" | "chat">("chat");
    const [newMessage, setNewMessage] = useState("");

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
            const isPinned = useMeetingStore.getState().pinnedParticipants.some((pp) => pp.id === p.sid);
            const isMuted = p.isMuted;
            const isVideoOff = p.isCameraOff;
            const status = "online";
            return { id: p.sid, name, avatar, isHost, isPinned, isMuted, isVideoOff, status };
        })
        .sort((a, b) => (a.id === localParticipant.sid ? -1 : b.id === localParticipant.sid ? 1 : 0));

    const pinnedCount = participants.filter((p) => p.isPinned).length;

    const formatTime = (date: Date) =>
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
        <div className="w-[320px] min-w-[320px] max-w-[320px] bg-neutral-800 border-l border-neutral-700 flex flex-col h-full sm:flex">
            <Tabs
                value={activeTab}
                onValueChange={(val) => val === 'participants' || val === 'chat' ? setActiveTab(val) : null}
                className="flex-1 flex flex-col"
            >
                <div className="border-b border-neutral-700 px-4 py-3">
                    <TabsList className="grid grid-cols-2 bg-neutral-700 w-full">
                        <TabsTrigger value="participants" className="text-neutral-200 gap-2 data-[state=active]:bg-neutral-600">
                            <Users className="w-4 h-4" /> Participants
                            <Badge variant="secondary" className="ml-1 text-xs bg-neutral-600 text-neutral-200">
                                {participants.length}
                            </Badge>
                        </TabsTrigger>
                        <TabsTrigger value="chat" className="text-neutral-200 gap-2 data-[state=active]:bg-neutral-600">
                            <MessageSquare className="w-4 h-4" /> Live Chat
                            <Badge variant="secondary" className="ml-1 text-xs bg-neutral-600 text-neutral-200">
                                {chatMessages.length}
                            </Badge>
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="participants" className="flex-1 m-0">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-700">
                        <span className="text-sm font-medium text-white">Participants</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-400">Pinned: {pinnedCount}/4</span>
                            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-2 space-y-1">
                            {participants.map((p) => (
                                <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-700">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={p.avatar} />
                                        <AvatarFallback className="bg-neutral-600 text-white">
                                            {p.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm truncate text-white">{p.name}{p.id === localParticipant.sid ? " (You)" : ""}</span>
                                            {p.isHost && <Badge variant="outline" className="text-xs border-neutral-600 text-neutral-300">Host</Badge>}
                                            {p.isPinned && <Pin className="w-3 h-3 text-blue-400" />}
                                        </div>
                                        <div className="text-xs text-neutral-400 capitalize">{p.status}</div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => pinParticipant(p.id)}
                                            disabled={!p.isPinned && pinnedCount >= 4}
                                            className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-600"
                                            title={p.isPinned ? "Unpin video" : "Pin video"}
                                        >
                                            {p.isPinned ? <PinOff className="w-4 h-4 text-blue-400" /> : <Pin className="w-4 h-4" />}
                                        </Button>
                                        {p.isMuted ? <MicOff className="w-4 h-4 text-red-400" /> : <Mic className="w-4 h-4 text-green-400" />}
                                        {p.isVideoOff ? <VideoOff className="w-4 h-4 text-red-400" /> : <Video className="w-4 h-4 text-green-400" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="chat" className="flex-1 flex flex-col m-0">
                    <div className="flex items-center justify-between px-4 border-b border-neutral-700">
                        <span className="text-sm font-medium text-white">Live Chat</span>
                        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </div>
                    <ScrollArea className="flex-1 overflow-hidden px-4 py-1 space-y-4">
                        {chatMessages.map((msg) => {
                            // Look up the sender in the live participants list
                            const participant = participantsLive.find(p => p.identity === msg.from?.identity);
                            let senderName = msg.from?.name || msg.from?.identity || "Anonymous";
                            let senderImage = "";
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
                                    className={`flex overflow-y-auto ${isLocalUser ? "justify-end" : "justify-start"} items-end my-2`}
                                >   
                                    <ChatBubble senderImage={senderImage} username={isLocalUser ? "You" : senderName} time={formatTime(new Date(msg.timestamp))} message={msg.message} />
                                </div>
                            );
                        })}
                    </ScrollArea>
                    <div className="border-t border-neutral-700 p-4">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                className="flex-1 bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400"
                            />
                            <Button onClick={handleSend} size="icon" className="bg-blue-600 hover:bg-blue-700">
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div >
    );
}
