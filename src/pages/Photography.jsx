import React, { useMemo, useState } from "react";
import Section from "../components/Section.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { photos } from "../data/photos.js";

export default function Photography() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const items = useMemo(() => photos.map((p) => ({ src: p.src })), []);

  return (
    <div>
      <Section
        kicker="Photography"
        title="Gallery"
        desc="Keep it curated. 12–24 strong photos works best."
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {photos.map((p, i) => (
            <button
              key={p.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 text-left"
              onClick={() => {
                setIdx(i);
                setOpen(true);
              }}
            >
              <img
                src={p.src}
                alt={p.alt || p.title}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml;utf8," +
                    encodeURIComponent(
                      `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'><rect width='100%' height='100%' fill='#111'/><text x='50%' y='50%' fill='#777' font-family='Arial' font-size='24' text-anchor='middle'>Missing image: ${p.src}</text></svg>`
                    );
                }}
              />
              <div className="p-4">
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="mt-1 text-xs text-zinc-400">Click to view</div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Lightbox
        open={open}
        items={items}
        index={idx}
        onClose={() => setOpen(false)}
        onPrev={() => setIdx((v) => (v - 1 + items.length) % items.length)}
        onNext={() => setIdx((v) => (v + 1) % items.length)}
      />
    </div>
  );
}
