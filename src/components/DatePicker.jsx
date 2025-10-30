"use client";

import { useState } from "react";

import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date) {
  if (!date) {
    return false;
  }

  return !isNaN(date.getTime());
}

const DatePicker = ({ defaultValue, onChange }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(defaultValue);
  const [month, setMonth] = useState(date);
  const [value, setValue] = useState(formatDate(date));

  const handleSelect = (newDate) => {
    setDate(newDate);
    setValue(formatDate(newDate));
    setOpen(false);
    if (onChange) onChange(newDate); // 🔥 Gửi dữ liệu lên component cha
  };

  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value || ""}
          placeholder="Ví dụ: January 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const date = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(date)) {
              setDate(date);
              setMonth(date);
              if (onChange) onChange(date);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Pick a date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="bg-white z-50 w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              month={month}
              onMonthChange={setMonth}
              onSelect={handleSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DatePicker;
