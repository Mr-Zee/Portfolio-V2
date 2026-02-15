import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Section from "../components/Section.jsx";
import Badge from "../components/Badge.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { projects } from "../data/projects.js";

export default function Project() {
  const { id } = useParams();
  const project = useMemo(() => projects.find((p) => p.id === id), [id]);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  if (!project) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        Project not found. <Link className="underline" to="/work">Back</Link>
      </div>
    );
  }

  const images = (project.images || []).map((src) => ({ src }));

  return (
    <div>
      <div className="mb-6">
        <Link to="/work" className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Work
        </Link>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-soft md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs text-zinc-400">{project.category} • {project.year || "—"}</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{project.title}</h1>
            {project.summary ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">{project.summary}</p> : null}

            {project.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((t) => <Badge key={t}>{t}</Badge>)}
              </div>
            ) : null}
          </div>

          <div className="flex gap-2">
            {project.links?.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Live <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
            {project.links?.repo ? (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Repo <Github className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {(project.images || [project.cover]).map((src, i) => (
            <button
              key={src + i}
              className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 text-left"
              onClick={() => {
                setIdx(i);
                setOpen(true);
              }}
            >
              <img
                src={src}
                alt={project.title}
                className="h-60 w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml;utf8," +
                    encodeURIComponent(
                      `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'><rect width='100%' height='100%' fill='#111'/><text x='50%' y='50%' fill='#777' font-family='Arial' font-size='24' text-anchor='middle'>Missing image: ${src}</text></svg>`
                    );
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {project.caseStudy ? (
        <div className="mt-10">
          <Section kicker="Case Study" title="Problem → Approach → Outcome" desc="A quick narrative to show your thinking.">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs text-zinc-400">Problem</div>
                <div className="mt-2 text-sm text-zinc-200">{project.caseStudy.problem}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:col-span-1">
                <div className="text-xs text-zinc-400">Approach</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-zinc-200">
                  {project.caseStudy.approach.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs text-zinc-400">Outcome</div>
                <div className="mt-2 text-sm text-zinc-200">{project.caseStudy.outcome}</div>
              </div>
            </div>
          </Section>
        </div>
      ) : null}

      <Lightbox
        open={open}
        items={images.length ? images : [{ src: project.cover }]}
        index={idx}
        onClose={() => setOpen(false)}
        onPrev={() => setIdx((v) => (v - 1 + (images.length || 1)) % (images.length || 1))}
        onNext={() => setIdx((v) => (v + 1) % (images.length || 1))}
      />
    </div>
  );
}
