import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ open, items, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;

  const src = items?.[index]?.src || items?.[index] || "";

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative mx-auto flex h-full max-w-6xl items-center justify-center px-4">
        <button
          className="absolute right-4 top-4 rounded-2xl border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10"
          onClick={onPrev}
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-soft">
          <img
            src={src}
            alt="Preview"
            className="max-h-[80vh] w-full object-contain"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml;utf8," +
                encodeURIComponent(
                  `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'><rect width='100%' height='100%' fill='#111'/><text x='50%' y='50%' fill='#777' font-family='Arial' font-size='24' text-anchor='middle'>Missing image: ${src}</text></svg>`
                );
            }}
          />
        </div>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10"
          onClick={onNext}
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
