import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { useRouter } from "next/navigation";
import { useMeetingStore } from "@/store/useMeetingStore";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  buttonText?: string;
  handleClick?: () => void;
  children?: ReactNode;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  buttonText,
  handleClick,
  children,
}: MeetingModalProps) => {

  const [value, setValue] = useState('');
  const router = useRouter();
  const { setRoomId } = useMeetingStore();

  const createMeeting = () => {
    fetch("/api/meetings/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: value }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          return;
        }
        setRoomId(data.code);
        // Redirect to the meeting room page
        router.push(`/meeting/${data.code}`);
      })
      .catch((error) => {
        console.error("Error creating meeting:", error);
      });
  }

  const joinMeeting = () => {
    fetch(`/api/meetings/[meetingId]/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: value }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          return;
        }
        setRoomId(data.code);
        // Redirect to the meeting room page
        router.push(`/meeting/${data.code}`);
      })
      .catch((error) => {
        console.error("Error creating meeting:", error);
      });
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-neutral-900 text-white px-6 py-9">
        <div className="flex flex-col gap-6">
          <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
          {children}
          <Input placeholder="Enter meeting name" className="w-full" value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }} />
          <Button className="bg-blue-700 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={() => {
              if (buttonText === 'Start Meeting') {
                createMeeting();
              }
              else handleClick?.();
              onClose(); // Close the modal after action
            }}
          >
            {buttonText || 'Schedule Meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
