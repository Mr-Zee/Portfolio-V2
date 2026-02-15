import React from "react";

export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-200">
      {children}
    </span>
  );
}
