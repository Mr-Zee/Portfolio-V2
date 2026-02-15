import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Badge from "./Badge.jsx";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/work/${project.id}`}
      className="group rounded-3xl border border-white/10 bg-white/5 p-3 shadow-soft transition hover:bg-white/8"
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
        <img
          src={project.cover}
          alt={project.title}
          className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          onError={(e) => {
            e.currentTarget.src =
              "data:image/svg+xml;utf8," +
              encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'><rect width='100%' height='100%' fill='#111'/><text x='50%' y='50%' fill='#777' font-family='Arial' font-size='28' text-anchor='middle'>Add image: ${project.cover}</text></svg>`
              );
          }}
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">{project.title}</div>
          <div className="mt-1 text-xs text-zinc-400">
            {project.category} • {project.year || "—"}
          </div>
        </div>
        <ArrowUpRight className="mt-0.5 h-4 w-4 opacity-60 transition group-hover:opacity-100" />
      </div>

      {project.summary ? <div className="mt-3 text-sm text-zinc-300">{project.summary}</div> : null}

      {project.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
