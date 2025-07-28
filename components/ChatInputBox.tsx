"use client";

import React from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

interface ChatInputBoxProps {
    newMessage: string;
    setNewMessage: (message: string) => void;
    onSendMessage: () => void;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({
    newMessage,
    setNewMessage,
    onSendMessage,
}) => {
    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSendMessage();
        }
    };

    return (
        // Removed border-t and p-1 from this div.
        // The parent (SidePanel's TabsContent) now applies the necessary padding.
        // Removed fixed height h-38 as textarea height adjusts automatically.
        <div className="flex items-center gap-2 w-full bg-transparent">
            <form onSubmit={(e) => { e.preventDefault(); onSendMessage(); }} className="flex items-center gap-2 w-full">
                <Textarea
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyUp}
                    // Adjusted classes for the textarea to match image closely
                    // bg-neutral-700/70 gives a slightly translucent effect
                    // h-10 min-h-[40px] sets a fixed initial height
                    // resize-none prevents manual resizing
                    // focus-visible styles for better UX
                    className="flex-1 resize-none bg-neutral-700/70 border-neutral-600/50 text-white placeholder:text-neutral-400 rounded-lg h-10 min-h-[40px] px-3 py-2 text-sm focus-visible:ring-offset-0 focus-visible:ring-blue-500"
                    rows={1}
                />
                <Button
                    size="icon"
                    // Adjusted classes for the send button to match image closely
                    // bg-blue-600 is for the primary action color
                    // rounded-full makes it circular
                    // h-10 w-10 fixes its size
                    // shrink-0 prevents it from shrinking
                    className="bg-blue-600 hover:bg-blue-700 rounded-full h-10 w-10 shrink-0"
                    type="submit"
                >
                    <Send className="w-5 h-5 text-white" /> {/* Larger icon */}
                </Button>
            </form>
        </div>
    );
};

export default ChatInputBox;