"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Users, MessageSquare, Send, Mic, MicOff, Video, VideoOff, X, Pin, PinOff } from "lucide-react"

interface Participant {
    id: string
    name: string
    avatar: string
    isHost: boolean
    isMuted: boolean
    isVideoOff: boolean
    status: "online" | "away" | "offline"
    isPinned: boolean
}

interface ChatMessage {
    id: string
    userId: string
    userName: string
    message: string
    timestamp: Date
}

interface MobilePanelProps {
    isOpen: boolean
    onClose: () => void
    participants: Participant[]
    chatMessages: ChatMessage[]
    activeTab: "participants" | "chat"
    onTabChange: (tab: "participants" | "chat") => void
    onSendMessage: (message: string) => void
    onPinParticipant: (participantId: string) => void
}

export default function MobilePanel({
    isOpen,
    onClose,
    participants,
    chatMessages,
    activeTab,
    onTabChange,
    onSendMessage,
    onPinParticipant,
}: MobilePanelProps) {
    const [newMessage, setNewMessage] = useState("")
    const pinnedCount = participants.filter((p) => p.isPinned).length

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            onSendMessage(newMessage)
            setNewMessage("")
        }
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="bottom" className="h-[80vh] p-0 bg-neutral-900 text-white">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <SheetHeader className="border-b border-neutral-700 p-4">
                        <div className="flex items-center justify-between">
                            <SheetTitle className="text-lg font-semibold">Meeting Info</SheetTitle>
                            {/* <Button variant="ghost" size="icon" onClick={onClose} className="text-neutral-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </Button> */}
                        </div>
                    </SheetHeader>

                    {/* Tabs */}
                    <Tabs
                        value={activeTab}
                        onValueChange={(value) => onTabChange(value as "participants" | "chat")}
                        className="flex-1 flex flex-col"
                    >
                        <div className="border-b border-neutral-700 px-4 py-2">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger
                                    value="participants"
                                    className="gap-2 text-neutral-400 hover:text-white data-[state=active]:text-white"
                                >
                                    <Users className="w-4 h-4" />
                                    Participants
                                    <Badge variant="secondary" className="ml-1 text-xs">
                                        {participants.length}
                                    </Badge>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="chat"
                                    className="gap-2 text-neutral-400 hover:text-white data-[state=active]:text-white"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Chat
                                    <Badge variant="secondary" className="ml-1 text-xs">
                                        {chatMessages.length}
                                    </Badge>
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="participants" className="flex-1 m-0">
                            <ScrollArea className="flex-1">
                                <div className="p-4 space-y-3">
                                    {participants.map((participant) => (
                                        <div key={participant.id} className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800">
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                                                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                            </Avatar>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-white truncate">{participant.name}</span>
                                                    {participant.isHost && (
                                                        <Badge variant="outline" className="text-xs">
                                                            Host
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="text-xs text-neutral-400 capitalize">{participant.status}</div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onPinParticipant(participant.id)}
                                                    disabled={!participant.isPinned && pinnedCount >= 4}
                                                    className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-600"
                                                >
                                                    {participant.isPinned ? (
                                                        <PinOff className="w-4 h-4 text-blue-400" />
                                                    ) : (
                                                        <Pin className="w-4 h-4" />
                                                    )}
                                                </Button>
                                                {participant.isMuted ? (
                                                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                                        <MicOff className="w-4 h-4 text-red-500" />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <Mic className="w-4 h-4 text-green-500" />
                                                    </div>
                                                )}
                                                {participant.isVideoOff ? (
                                                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                                        <VideoOff className="w-4 h-4 text-red-500" />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <Video className="w-4 h-4 text-green-500" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>

                        <TabsContent value="chat" className="flex-1 m-0 flex flex-col">
                            <ScrollArea className="flex-1 px-4">
                                <div className="py-4 space-y-4">
                                    {chatMessages.map((message) => (
                                        <div key={message.id} className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-white">{message.userName}</span>
                                                <span className="text-xs text-neutral-400">{formatTime(message.timestamp)}</span>
                                            </div>
                                            <p className="text-sm text-neutral-200 break-words bg-neutral-800 p-3 rounded-lg">
                                                {message.message}
                                            </p>
                                        </div>
                                    ))}

                                    {/* AI Response */}
                                    <div className="bg-blue-50 rounded-lg p-3 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                <span className="text-xs text-white font-bold">AI</span>
                                            </div>
                                            <span className="text-sm font-medium text-blue-900">Roomify</span>
                                            <Badge variant="secondary" className="text-xs">
                                                HOST
                                            </Badge>
                                            <span className="text-xs text-neutral-400">2 min ago</span>
                                        </div>
                                        <p className="text-sm text-neutral-200">
                                            I think this webinar will provide us with some great insights
                                        </p>
                                    </div>

                                    {/* You message */}
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-white">You</span>
                                            <span className="text-xs text-neutral-400">1 min ago</span>
                                        </div>
                                        <p className="text-sm text-neutral-200 bg-blue-50 p-3 rounded-lg">Thank you Keith!</p>
                                    </div>
                                </div>
                            </ScrollArea>

                            <div className="border-t border-neutral-700 p-4">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                        className="flex-1 bg-neutral-800 text-white"
                                    />
                                    <Button onClick={handleSendMessage} size="icon" className="text-neutral-400 hover:text-white">
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </SheetContent>
        </Sheet>
    )
}
