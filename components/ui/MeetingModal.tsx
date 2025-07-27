"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { useRouter } from "next/navigation"
import { useMeetingStore } from "@/store/useMeetingStore"
import { Copy, Check, ChevronDownIcon } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"

interface MeetingModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  className?: string
  buttonText?: string
  handleClick?: () => void
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  buttonText,
  handleClick,
}: MeetingModalProps) => {
  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("10:30:00")
  const [scheduledAt, setScheduledAt] = useState<Date | null>(new Date())
  const [loading, setLoading] = useState(false)
  const [successDialog, setSuccessDialog] = useState(false)
  const [meetingCode, setMeetingCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const { setIsOwner, setRoomId, setOwnerId, setAllowedToJoin } = useMeetingStore()
  const router = useRouter()

  const combineDateTime = () => {
    if (!selectedDate || !selectedTime) return null
    const [hours, minutes, seconds] = selectedTime.split(":").map(Number)
    const dateWithTime = new Date(selectedDate)
    dateWithTime.setHours(hours)
    dateWithTime.setMinutes(minutes)
    dateWithTime.setSeconds(seconds || 0)
    return dateWithTime
  }

  const createMeeting = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/meetings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: value }),
      })
      const data = await res.json()

      if (!data.code || data.error) {
        console.error(data.error || "Invalid response")
        return
      }

      setRoomId(data.code)
      setOwnerId(data.userId)
      setIsOwner(true)
      setAllowedToJoin(true)
      router.push(`/meeting/${data.code}`)
    } catch (error) {
      console.error("Error creating meeting:", error)
    } finally {
      setLoading(false)
    }
  }

  const joinMeeting = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/meetings/${value}/request-to-join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()

      if (!data.success) {
        return
      }

      setRoomId(data.code)
      setOwnerId(data.userId)
      setIsOwner(data.isOwner)
      setAllowedToJoin(data.isOwner)
      router.push(data.isOwner ? `/meeting/${data.code}` : `/meeting/waiting`)
    } catch (error) {
      console.error("Error joining meeting:", error)
    } finally {
      setLoading(false)
    }
  }

  const scheduleMeeting = async () => {
    const fullDate = combineDateTime()
    if (!value || !fullDate) return
    setScheduledAt(fullDate)

    try {
      setLoading(true)
      const res = await fetch("/api/meetings/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value,
          description,
          scheduledAt: fullDate,
        }),
      })

      const data = await res.json()
      if (!data.success) {
        return
      }

      setMeetingCode(data.room.code)
      setSuccessDialog(true)
    } catch (error) {
      console.error("Error scheduling meeting:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMainClick = () => {
    if (buttonText === "Start Meeting") createMeeting()
    else if (buttonText === "Join Meeting") joinMeeting()
    else if (buttonText === "Schedule Meeting") scheduleMeeting()
    else handleClick?.()

    // if (buttonText !== "Schedule Meeting") onClose()
  }

  return (
    <>
      {/* Main Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-[520px] bg-neutral-900 text-white px-6 py-8 border-none">
          <h1 className={cn("text-2xl font-bold", className)}>{title}</h1>

          <Input
            placeholder="Enter meeting name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          {buttonText === "Schedule Meeting" && (
            <>
              <Textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* ShadCN calendar and time input */}
              <div className="flex gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date-picker" className="px-1">
                    Date
                  </Label>
                  <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker"
                        className="w-40 justify-between font-normal bg-neutral-800 text-white border border-neutral-700"
                      >
                        {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-neutral-900 border border-neutral-700 text-white">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setSelectedDate(date)
                          setDatePickerOpen(false)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="time-picker" className="px-1">
                    Time
                  </Label>
                  <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="bg-neutral-800 text-white border border-neutral-700"
                  />
                </div>
              </div>
            </>
          )}

          <Button
            className="bg-blue-600 hover:bg-blue-700 mt-6"
            onClick={handleMainClick}
            disabled={loading || !value}
          >
            {loading ? "Loading..." : buttonText || "Join Meeting"}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={successDialog} onOpenChange={setSuccessDialog}>
        <DialogContent className="max-w-md text-white bg-neutral-900">
          <DialogHeader>
            <DialogTitle className="text-green-400 text-xl">
              🎉 Meeting Scheduled
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-300 mt-2">
            Your meeting has been successfully scheduled!
          </p>
          <div className="bg-neutral-800 rounded-md px-4 py-3 mt-4 flex items-center justify-between">
            <code className="text-lg font-mono">{meetingCode}</code>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(meetingCode)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="ml-2 flex gap-1"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-green-400" /> Copied
                </>
              ) : (
                <>
                  <Copy size={16} /> Copy
                </>
              )}
            </Button>
          </div>
          <DialogFooter className="mt-6">
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={() => {
                setSuccessDialog(false)
                router.refresh()
              }}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MeetingModal
