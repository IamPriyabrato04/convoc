import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./button";

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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-neutral-900 text-white px-6 py-9">
        <div className="flex flex-col gap-6">
            <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
            {children}
            <Button className="bg-blue-700 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={()=>handleClick}
            >
                {buttonText || 'Schedule Meeting'}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
