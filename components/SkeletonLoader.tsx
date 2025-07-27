"use client";

export default function SkeletonLoader() {
    return (
        <div className="h-screen w-full bg-neutral-950 flex flex-col">
            {/* Header placeholder */}
            <div className="h-16 bg-neutral-800 animate-pulse" />

            <div className="flex flex-1 overflow-hidden">
                {/* Left (video) area */}
                <div className="flex-1 p-2 md:p-4 animate-pulse">
                    <div className="w-full h-full bg-gray-800 rounded-md" />
                </div>

                {/* Right (side panel) */}
                <div className="w-80 border-l border-neutral-700 p-4 animate-pulse">
                    {/* Tabs */}
                    <div className="flex space-x-2 mb-4">
                        <div className="h-8 w-1/2 bg-gray-700 rounded" />
                        <div className="h-8 w-1/2 bg-gray-700 rounded" />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                        {/* List item placeholders */}
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-600 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-gray-700 rounded w-2/3" />
                                    <div className="h-2 bg-gray-700 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom summary placeholder */}
            <div className="h-24 border-t border-neutral-700 p-4 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-700 rounded w-full mb-1" />
                <div className="h-3 bg-gray-700 rounded w-5/6" />
            </div>
        </div>
    );
}
