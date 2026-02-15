import React from "react";

export default function Section({ kicker, title, desc, children, right }) {
  return (
    <section className="mb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          {kicker ? (
            <div className="mb-2 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              {kicker}
            </div>
          ) : null}
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          {desc ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">{desc}</p> : null}
        </div>
        {right ? <div className="md:ml-6">{right}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
