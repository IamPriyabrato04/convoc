"use client";

import { useState, useEffect, useRef } from "react";
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
    Mic,
    MicOff,
    Video,
    VideoOff,
} from "lucide-react";
import ChatBubble from "../Chat-Bubble";
import ChatInputBox from "../ChatInputBox";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// shadcn-sheet imports
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUiStore } from "@/store/useUiStore";

export default function SidePanel() {
    const participantsLive = useParticipants();
    const { localParticipant } = useLocalParticipant();
    const { chatMessages, send } = useChat();

    const [activeTab, setActiveTab] = useState<"participants" | "chat">("chat");
    const [newMessage, setNewMessage] = useState("");
    const chatMessagesEndRef = useRef<HTMLDivElement>(null);

    const mobile = useMediaQuery("(max-width: 768px)");
    const isOpen = useUiStore((s) => s.isPanelOpen);
    const setPanelOpen = useUiStore((s) => s.setPanelOpen);


    // auto-scroll
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
            return {
                id: p.sid,
                name: meta.name || p.name || "Unknown",
                avatar: meta.image || "/defaultProfile.png",
                isHost: !!meta.isHost,
                isPinned: useMeetingStore.getState().pinnedParticipants.some(pp => pp.id === p.sid),
                isMuted: !p.isMicrophoneEnabled,
                isVideoOff: !p.isCameraEnabled,
                status: "online",
            };
        })
        .sort((a, b) =>
            a.id === localParticipant.sid
                ? -1
                : b.id === localParticipant.sid
                    ? 1
                    : 0
        );

    const formatTime = (date: Date) =>
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // The core panel (tabs + content) extracted into a render function:
    const PanelContent = () => (
        <div className="flex flex-col h-full">
            <Tabs value={activeTab} onValueChange={(v) =>
                v === "participants" || v === "chat" ? setActiveTab(v) : null
            } className="flex-1 flex flex-col">
                {/* Tab List */}
                <div className="px-4 py-2 border-b border-neutral-700/50">
                    <TabsList className="grid grid-cols-2 gap-2 bg-neutral-700/50 rounded-lg w-full">
                        <TabsTrigger value="participants" className="flex items-center justify-center gap-1 text-sm data-[state=active]:bg-neutral-600/70 data-[state=active]:text-white w-full">
                            <Users className="w-4 h-4" /> Participants
                            <Badge className="ml-1 text-xs bg-sky-800 text-neutral-200 rounded-full">{participants.length}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="chat" className="flex items-center justify-center gap-1 text-sm data-[state=active]:bg-neutral-600/70 data-[state=active]:text-white w-full">
                            <MessageSquare className="w-4 h-4" /> Live Chat
                            <Badge className="ml-1 text-xs bg-sky-800 text-neutral-200 rounded-full">{chatMessages.length}</Badge>
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Participants */}
                <TabsContent
                    value="participants"
                    className="flex-1 overflow-hidden flex flex-col"
                >
                    <ScrollArea className="flex-1">
                        <div className="p-2 space-y-2">
                            {participants.map((p) => (
                                <div
                                    key={p.id}
                                    className="flex items-center justify-between p-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/60 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={p.avatar} />
                                            <AvatarFallback>
                                                {p.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-white truncate">
                                                {p.name}
                                            </span>
                                            <div className="text-xs text-neutral-400">
                                                {p.status}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {!p.isMuted ? (
                                            <Mic className="w-4 h-4 text-neutral-400" />
                                        ) : (
                                            <MicOff className="w-4 h-4 text-red-500" />
                                        )}
                                        {!p.isVideoOff ? (
                                            <Video className="w-4 h-4 text-neutral-400" />
                                        ) : (
                                            <VideoOff className="w-4 h-4 text-red-500" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>

                {/* Chat */}
                <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1 px-2 overflow-auto max-h-[54vh] sm:max-h-[74vh]">
                        <div className="space-y-4 pt-2 z-1">
                            {chatMessages.map(msg => {
                                const isLocal = msg.from?.identity === localParticipant.identity;
                                return (
                                    <div
                                        key={msg.id}
                                        className={`flex ${isLocal ? "justify-end" : "justify-start"
                                            }`}
                                    >
                                        <ChatBubble
                                            username={isLocal ? "You" : msg.from?.name || "Anon"}
                                            time={formatTime(new Date(msg.timestamp))}
                                            message={msg.message}
                                            isLocalUser={isLocal}
                                        />
                                    </div>
                                );
                            })}
                            <div ref={chatMessagesEndRef} />
                        </div>
                    </ScrollArea>

                    <div className="flex-shrink-0 p-4 bg-neutral-900 border-t border-neutral-700/50 z-50">
                        <ChatInputBox newMessage={newMessage} setNewMessage={setNewMessage} onSendMessage={handleSend} />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );

    // **Mobile**: wrap in Sheet
    if (mobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setPanelOpen}>
                <SheetContent side="bottom" className="h-[80vh] p-0 bg-neutral-900 text-white">
                    <SheetHeader >
                        <div className="flex items-center justify-between">
                            <SheetTitle>Meeting Info</SheetTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setPanelOpen(false)}
                            >
                            </Button>
                        </div>
                    </SheetHeader>
                    {PanelContent()}
                </SheetContent>
            </Sheet>
        );
    }

    // **Desktop/Tablet**: fixed side panel
    return (
        <div className="w-[330px] rounded-2xl overflow-hidden glassmorphic flex flex-col h-full m-1">
            {PanelContent()}
        </div>
    );
}
