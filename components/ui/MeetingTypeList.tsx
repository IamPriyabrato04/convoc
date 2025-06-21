"use client";
import { PlusIcon, UserRoundPlus, VideoIcon, VideoOffIcon } from "lucide-react";
import React, { useState } from "react";
import DashboardCard from "./DashboardCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoinMeeting" | "isInstantMeeting" | undefined
  >();

  const createMeeting = ()=>{

  }
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <DashboardCard
        className="bg-teal-600"
        icon={PlusIcon}
        title="New Meeting"
        description="Schedule a meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <DashboardCard
        className="bg-blue-600"
        icon={UserRoundPlus}
        title="Join Meeting"
        description="Via invitation link"
        handleClick={() => setMeetingState("isJoinMeeting")}
      />
      <DashboardCard
        className="bg-purple-600"
        icon={VideoIcon}
        title="Start Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <DashboardCard
        className="bg-orange-600"
        icon={VideoOffIcon}
        title="Recordings"
        description="View past meetings"
        handleClick={() => router.push("/recordings")}
      />
      <MeetingModal
      isOpen={meetingState==='isInstantMeeting'}
      onClose={()=>setMeetingState(undefined)}
      title='Start an instant meeting'
      className='text-center'
      buttonText='Start Meeting'
      handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
