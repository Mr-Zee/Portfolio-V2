import React, { useMemo, useState } from "react";
import Section from "../components/Section.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { categories, projects } from "../data/projects.js";

const cx = (...cls) => cls.filter(Boolean).join(" ");

export default function Work() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects.filter((p) => p.category !== "Photography");
    return projects.filter((p) => p.category === active);
  }, [active]);

  return (
    <div>
      <Section
        kicker="Work"
        title="Projects"
        desc="Filter by type: Website UI, Dashboard, App Screens, Software/Web."
        right={
          <div className="flex flex-wrap gap-2">
            {categories.filter((c) => c !== "Photography").map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cx(
                  "rounded-full border px-3 py-1 text-xs transition",
                  active === c
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
          Tip: Keep 6–10 strong projects. Add a short case study for your best ones.
        </div>
      </Section>
    </div>
  );
}
