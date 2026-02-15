import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-grain">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 md:px-8">
        {/* subtle page title strip */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xs text-zinc-400">
            {pathname === "/" ? "Home" : pathname.replace("/", "").replaceAll("/", " / ")}
          </div>
          <div className="hidden text-xs text-zinc-500 md:block">
            Modern • Minimal • Case-study ready
          </div>
        </div>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
