import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Section from "../components/Section.jsx";
import Badge from "../components/Badge.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ThreeHero from "../components/ThreeHero.jsx";
import { profile } from "../content/profile.js";
import { projects } from "../data/projects.js";

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <div>
<section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
  <div className="relative min-h-[calc(100vh-72px)] overflow-hidden border-b border-white/10 bg-white/5">
    {profile.threeHero ? <ThreeHero /> : null}


    {/* Content stays centered + readable */}
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full"
      >
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/40 px-3 py-1 text-xs text-zinc-300">
            {profile.location} • Available for UI/UX + Frontend
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            {profile.tagline}
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
            {profile.about?.[0]}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/work"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
            >
              View Work <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contact <Mail className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {profile.skills.slice(0, 10).map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>



      <div className="mt-10">
        <Section
          kicker="Selected"
          title="Featured Work"
          desc="A few highlights across UI, dashboards, app screens, and builds."
          right={
            <Link className="text-sm text-zinc-300 hover:text-white" to="/work">
              See all →
            </Link>
          }
        >
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </Section>

        <Section
          kicker="Photography"
          title="Frames & Moments"
          desc="A separate gallery for your photography series."
          right={
            <Link className="text-sm text-zinc-300 hover:text-white" to="/photography">
              Open gallery →
            </Link>
          }
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
            Add your photos in <span className="text-white">public/works/photos</span> and update{" "}
            <span className="text-white">src/data/photos.js</span>.
          </div>
        </Section>
      </div>
    </div>
  );
}
