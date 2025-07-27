"use client"

import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

interface SummaryPanelProps {
    isMobile?: boolean
}

export default function SummaryPanel({ isMobile }: SummaryPanelProps) {
    if (isMobile) {
        return (
            <div className="bg-neutral-800 border-t border-neutral-700 p-3">
                <div className="flex items-start gap-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-white text-sm">Summarize</h3>
                            <Badge className="bg-blue-600 hover:bg-blue-700 gap-1 text-xs">
                                <Sparkles className="w-3 h-3" />
                                AI
                            </Badge>
                        </div>

                        <p className="text-xs text-neutral-300 leading-relaxed">
                            Whether you&apos;re looking to generate leads, educate your audience, or showcase your webinar software...
                            <span className="bg-yellow-600/30 px-1 rounded">Integrate with your favorite marketing tools</span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-neutral-800 border-t border-neutral-700 p-4">
            <div className="flex items-start gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-white">Summarize</h3>
                        <Badge className="bg-blue-600 hover:bg-blue-700 gap-1">
                            <Sparkles className="w-3 h-3" />
                            Powered by AI
                        </Badge>
                    </div>

                    <p className="text-sm text-neutral-300 leading-relaxed">
                        Whether you&apos;re looking to generate leads, educate your audience, or showcase your webinar software is the
                        ultimate solution for creating your next event. Don&apos;t let customers who have transformed their webinars into
                        unforgettable experiences.
                        <span className="bg-yellow-600/30 px-1 rounded">
                            Integrate with your favorite marketing and CRM tools for a seamless experience
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}
