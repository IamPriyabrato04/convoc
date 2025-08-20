"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";


export default function SkeletonLoader() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    return (
        <div className="h-screen w-full bg-neutral-950 flex flex-col">
            {/* Header placeholder */}
            <div className="h-16 bg-neutral-800 animate-pulse" />

            <div className="flex flex-1 overflow-hidden">
                {isMobile ? (
                    <div className="flex-1 p-2 md:p-4 animate-pulse">
                        <div className="w-full h-full bg-gray-800 rounded-md flex justify-center items-center" >
                            <svg className="w-50 h-50 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                            </svg>
                        </div>
                    </div>
                ) : <>
                    {/* Left (video) area */}
                    <div className="flex-1 p-2 md:p-4 animate-pulse">
                        <div className="w-full h-full bg-gray-800 rounded-md flex justify-center items-center" >
                            <svg className="w-50 h-50 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                            </svg>
                        </div>
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
                                        <div className="h-3 bg-gray-700 rounded-md w-1/3" />
                                        <div className="h-10 bg-gray-700 rounded-md w-3/4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>}
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
