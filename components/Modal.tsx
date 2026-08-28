"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[20px] bg-(--color-surface) shadow-[0px_16px_32px_-12px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-(--color-text-muted) hover:text-(--color-text-primary)"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}