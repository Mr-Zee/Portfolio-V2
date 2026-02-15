import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Moon, Sun, ArrowUpRight } from "lucide-react";
import { profile } from "../content/profile.js";

const cx = (...cls) => cls.filter(Boolean).join(" ");

export default function Navbar() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    // We keep a dark-first palette, but this lets you extend later
    localStorage.setItem("theme", theme);
  }, [theme]);

  const items = useMemo(
    () => [
      { to: "/", label: "Home" },
      { to: "/work", label: "Work" },
      { to: "/photography", label: "Photography" },
      { to: "/contact", label: "Contact" }
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <NavLink to="/" className="group flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-white/8 shadow-soft ring-1 ring-white/10 grid place-items-center">
            <span className="text-sm font-semibold tracking-tight">{profile.name?.[0] || "P"}</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">{profile.name}</div>
            <div className="text-xs text-zinc-400">{profile.role}</div>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                cx(
                  "rounded-2xl px-3 py-2 text-sm transition",
                  isActive ? "bg-white/10 text-white" : "text-zinc-300 hover:bg-white/5 hover:text-white"
                )
              }
            >
              {it.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.links?.github || "#"}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-2xl border border-white/10 px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 md:flex"
            title="GitHub"
          >
            GitHub <ArrowUpRight className="h-4 w-4 opacity-70" />
          </a>

          <button
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            className="rounded-2xl border border-white/10 p-2 text-zinc-300 hover:bg-white/5"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* mobile menu */}
          <div className="md:hidden">
            <select
              className="rounded-2xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-200"
              value={location.pathname}
              onChange={(e) => (window.location.href = e.target.value)}
              aria-label="Navigate"
            >
              {items.map((it) => (
                <option key={it.to} value={it.to}>
                  {it.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
