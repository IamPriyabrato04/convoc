import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import SkeletonLoader from "@/components/SkeletonLoader";

export function lazyWithSkeleton<T extends ComponentType<unknown>>(
    importFn: () => Promise<{ default: T }>
) {
    return dynamic(importFn, {
        loading: () => <SkeletonLoader />,
        ssr: false,
    });
}