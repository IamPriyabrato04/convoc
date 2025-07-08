"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MessageCircleMore, Send } from "lucide-react";
import { useRoomContext } from "@livekit/components-react";

export default function ChatSection() {
  const room = useRoomContext();
  const [messages, setMessages] = useState<{ id: number; sender: string; text: string }[]>([]);
  const [newMsg, setNewMsg] = useState("");

  // Listen for data messages
  room?.on("dataReceived", (payload, participant) => {
    const text = new TextDecoder().decode(payload);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: participant?.name || "Guest",
        text,
      },
    ]);
  });

  const handleSend = async () => {
    if (!newMsg.trim()) return;
    try {
      await room.localParticipant?.publishData(new TextEncoder().encode(newMsg), {
        reliable: true,
      });
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "You",
          text: newMsg,
        },
      ]);
      setNewMsg("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="bg-neutral-800 hover:bg-neutral-700">
          <MessageCircleMore className="w-6 h-6 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-neutral-900 border border-neutral-700 p-4 flex flex-col max-w-md w-full"
      >
        <DialogHeader>
          <DialogTitle className="text-white">Live Chat</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 mt-4 mb-2 rounded-md border border-neutral-700 bg-neutral-800 p-2">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-sm">No messages yet...</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="mb-2">
                <span className="font-semibold text-white">{msg.sender}: </span>
                <span className="text-gray-300">{msg.text}</span>
              </div>
            ))
          )}
        </ScrollArea>

        <div className="flex gap-2 mt-2">
          <Input
            placeholder="Type a message..."
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            className="bg-neutral-800 border-neutral-700 text-white"
          />
          <Button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            type="button"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
