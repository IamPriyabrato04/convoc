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
import Loader from "@/app/(protected)/meeting/[roomId]/loading";

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setRoomId } = useMeetingStore();

  const createMeeting = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/meetings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: value }),
      });

      const data = await res.json();

      if (!data.code) {
        console.error("Invalid response: missing room code");
        setLoading(false);
        return;
      }


      if (data.error) {
        console.error(data.error);
        setLoading(false);
        return;
      }

      setRoomId(data.code);
      router.push(`/meeting/${data.code}`);
    } catch (error) {
      console.error("Error creating meeting:", error);
    } finally {
      setLoading(false);
    }
  };


  const joinMeeting = () => {
    setLoading(true);
    fetch(`/api/meetings/${value}/ask-to-join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          console.error(data.message);
          setLoading(false);
          return;
        }
        setRoomId(data.code);

        if (data.isOwner) {
          router.push(`/meeting/${data.code}`);
        } else {
          router.push(`/meeting/waiting`);
        }
      })
      .catch((error) => {
        console.error("Error joining meeting:", error);
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <Loader />} {/* ⬅️ Show loader */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-neutral-900 text-white px-6 py-9">
          <div className="flex flex-col gap-6">
            <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
            {children}
            <Input
              placeholder={buttonText === 'Start Meeting' ? "Enter meeting name" : "Enter meeting code"}
              className="w-full"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              className="bg-blue-700 focus-visible:ring-0 focus-visible:ring-offset-0"
              onClick={() => {
                if (buttonText === 'Start Meeting') createMeeting();
                else if (buttonText === 'Join Meeting') joinMeeting();
                else handleClick?.();
                onClose(); // close modal
              }}
            >
              {buttonText || 'Join Meeting'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MeetingModal;
