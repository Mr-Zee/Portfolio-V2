import React from "react";
import { profile } from "../content/profile.js";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-400 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-medium text-zinc-200">{profile.name}</div>
            <div className="text-xs text-zinc-500">{profile.tagline}</div>
          </div>
          <div className="flex flex-wrap gap-3 text-xs">
            <a className="hover:text-white" href={profile.links?.linkedin || "#"} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="hover:text-white" href={profile.links?.behance || "#"} target="_blank" rel="noreferrer">Behance</a>
            <a className="hover:text-white" href={profile.links?.dribbble || "#"} target="_blank" rel="noreferrer">Dribbble</a>
            <a className="hover:text-white" href={profile.links?.github || "#"} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <div className="mt-6 text-xs text-zinc-600">
          © {new Date().getFullYear()} {profile.name}. Built with React + Tailwind.
        </div>
      </div>
    </footer>
  );
}
