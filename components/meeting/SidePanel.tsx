"use client";

import { useParticipants, useLocalParticipant } from "@livekit/components-react";
import Image from "next/image";

export default function SidePanel() {
    const participants = useParticipants();
    const { localParticipant } = useLocalParticipant();

    return (
        <div className="w-80 bg-neutral-950 p-4 border-l border-gray-700 overflow-y-auto">
            <h3 className="mb-4 text-lg">Participants ({participants.length})</h3>

            {participants
                .sort((a, b) => {
                    if (a.identity === localParticipant.identity) return -1;
                    if (b.identity === localParticipant.identity) return 1;
                    return 0;
                })
                .map((p) => {
                    const meta = p.metadata ? JSON.parse(p.metadata) : {};
                    const participantName = meta.name || p.name || "Unknown";
                    const participantImage = meta.image;

                    return (
                        <div key={p.sid} className="flex items-center gap-2 mb-2">
                            <Image
                                src={participantImage || "/defaultProfile.png"}
                                alt={participantName}
                                height={26}
                                width={26}
                                className="rounded-full object-cover"
                            />
                            <span>
                                {participantName}
                                {p.identity === localParticipant.identity ? " (You)" : ""}
                            </span>
                        </div>
                    );
                })
            }

            
        </div>
    );
}
