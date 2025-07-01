"use client";


import { useEffect, useState } from "react";
import DesktopMeetingLayout from "./meetingLayout/DesktopMeetingLayout";
import TabletMeetingLayout from "./meetingLayout/TabletMeetingLayout";
import MobileMeetingLayout from "./meetingLayout/MobileMeetingLayout";

export default function ResponsiveMeetingLayout() {
    const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

    useEffect(() => {
        const updateLayout = () => {
            if (window.innerWidth >= 1024) {
                setDevice("desktop");
            } else if (window.innerWidth >= 640) {
                setDevice("tablet");
            } else {
                setDevice("mobile");
            }
        };

        updateLayout();
        window.addEventListener("resize", updateLayout);

        return () => window.removeEventListener("resize", updateLayout);
    }, []);

    if (device === "desktop") return <DesktopMeetingLayout />;
    if (device === "tablet") return <TabletMeetingLayout />;
    return <MobileMeetingLayout />;
}
