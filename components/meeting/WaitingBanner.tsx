"use client";

import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

export default function WaitingBanner({ onJoinClick }: { onJoinClick: () => void }) {
    const [visible, setVisible] = useState(true);

    const handleClick = () => {
        setVisible(false);
        onJoinClick();
    };

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="flex items-center justify-center gap-4 p-4 bg-gray-900 border-b border-gray-700 w-fit mx-auto rounded-2xl transition-all duration-500">
            <span>Wants to join the meeting</span>
            <Button
                onClick={handleClick}
                className="px-4 py-2 bg-blue-400 rounded-2xl hover:bg-blue-700 transition"
            >
                Allow
                <Check className="ml-2" />
            </Button>
            <Button
                onClick={handleClick}
                className="px-4 py-2 bg-red-400 rounded-2xl hover:bg-red-700 transition"
            >
                Deny <X className="ml-2" />
            </Button>
        </div>
    );
}
