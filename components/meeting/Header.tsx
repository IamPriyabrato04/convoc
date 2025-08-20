"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Share, Bell, CopyIcon, Menu, ChartPie, MessageSquareDotIcon } from "lucide-react"
import { useMeetingStore } from "@/store/useMeetingStore"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { toast } from "sonner"
import WaitingList from "./WaitingList"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useUiStore } from "@/store/useUiStore"

export default function Header({ roomId }: { roomId: string }) {
    const [copied, setCopied] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)")
    const isOwner = useMeetingStore((s) => s.isOwner);
    const setPanelOpen = useUiStore((s) => s.setPanelOpen);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(roomId)
            setCopied(true)
            toast.success("Room ID copied!")
            setTimeout(() => setCopied(false), 1500)
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Copy failed")
        }
    }

    // Mobile menu sheet
    const renderMobileMenu = () => (
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetContent side="left" className="h-auto bg-neutral-950 text-white">
                <SheetHeader className="px-4 pt-4">
                    <SheetTitle className="text-lg font-semibold">Options</SheetTitle>
                </SheetHeader>
                <div className="px-4 py-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-2">
                            <CopyIcon className="w-4 h-4" />
                            Copy Room ID
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <Share className="w-4 h-4" />
                            Share link
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" className="gap-2 relative">
                            <Bell className="w-4 h-4" />
                            Notifications
                            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full" />
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )

    return (
        <header className="bg-neutral-950 border-b border-neutral-700 px-4 py-2 flex items-center justify-between">
            {/* Left: WaitingList icon + count */}
            <div className="flex items-center gap-2">
                <WaitingList roomId={roomId} isOwner={isOwner} />
            </div>

            {/* Center: Title */}
            <div className="flex-1 text-center">
                <h1 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white truncate`}>
                    {!isMobile && (
                        <span className="flex items-center justify-center gap-2">
                            <h4>Room: {roomId ?? 'Untitled'}</h4>
                            <CopyIcon
                                onClick={handleCopy}
                                className={`w-5 h-5 cursor-pointer ${copied ? 'text-green-500' : 'text-neutral-300'}`}
                            />
                        </span>
                    )}
                </h1>
            </div>

            {/* Right: Copy + More */}
            <div className="flex items-center gap-3">
                {isMobile && (
                    <Button onClick={() => setPanelOpen(true)} variant="secondary" size="lg" className="m-2 rounded-2xl">
                        <MessageSquareDotIcon /> Open Chats
                    </Button>
                )}
                {isMobile && (
                    <Button variant="secondary" size="sm" onClick={() => setMenuOpen(true)} className="text-neutral-300">
                        <Menu className="w-7 h-7" />
                    </Button>
                )}

                <Avatar className="w-6 h-6 md:w-8 md:h-8">
                    <AvatarImage src="/defaultProfile.png" />
                    <AvatarFallback className="bg-neutral-600 text-white">U</AvatarFallback>
                </Avatar>
            </div>

            {isMobile && renderMobileMenu()}
        </header>
    )
}
