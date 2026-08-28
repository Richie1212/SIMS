"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface InlineAddButtonProps {
  label: string;
  onAdd: (value: string) => void;
}

export default function InlineAddButton({ label, onAdd }: InlineAddButtonProps) {
  const [adding, setAdding] = useState(false);
  const [value, setValue] = useState("");

  function confirm() {
    const trimmed = value.trim();
    if (trimmed) onAdd(trimmed);
    setValue("");
    setAdding(false);
  }

  if (adding) {
    return (
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={confirm}
        onKeyDown={(e) => e.key === "Enter" && confirm()}
        placeholder={`New ${label.toLowerCase()} name`}
        className="h-9 w-full rounded-[10px] border border-(--color-border) px-3 text-sm outline-none focus:border-(--color-brand)"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setAdding(true)}
      className="flex h-9 w-full items-center gap-2 rounded-[10px] border border-(--color-border) px-3 text-sm font-semibold text-(--color-brand) transition hover:bg-(--color-brand-tint)"
    >
      <Plus size={18} />
      New {label.toLowerCase()}
    </button>
  );
}