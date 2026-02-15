import React from "react";
import Section from "../components/Section.jsx";
import { Mail, ArrowUpRight } from "lucide-react";
import { profile } from "../content/profile.js";

export default function Contact() {
  return (
    <div>
      <Section
        kicker="Contact"
        title="Let’s build something clean"
        desc="Share a quick note about what you need — UI/UX, dashboards, websites, or frontend build."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm font-semibold">Email</div>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
            >
              <Mail className="h-4 w-4" /> {profile.email}
            </a>

            <div className="mt-6 text-sm font-semibold">Links</div>
            <div className="mt-2 grid gap-2 text-sm text-zinc-300">
              <a className="inline-flex items-center gap-2 hover:text-white" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight className="h-4 w-4 opacity-70" />
              </a>
              <a className="inline-flex items-center gap-2 hover:text-white" href={profile.links.github} target="_blank" rel="noreferrer">
                GitHub <ArrowUpRight className="h-4 w-4 opacity-70" />
              </a>
              <a className="inline-flex items-center gap-2 hover:text-white" href={profile.links.behance} target="_blank" rel="noreferrer">
                Behance <ArrowUpRight className="h-4 w-4 opacity-70" />
              </a>
              <a className="inline-flex items-center gap-2 hover:text-white" href={profile.links.dribbble} target="_blank" rel="noreferrer">
                Dribbble <ArrowUpRight className="h-4 w-4 opacity-70" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
            <div className="font-semibold text-white">Quick checklist</div>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Project type (Website / Dashboard / App)</li>
              <li>Timeline + priority</li>
              <li>Reference links (if any)</li>
              <li>Deliverables (Figma / React build / both)</li>
            </ul>
            <div className="mt-6 text-xs text-zinc-500">
              Tip: Add a short “Services” section here if you’re pitching freelance work.
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
