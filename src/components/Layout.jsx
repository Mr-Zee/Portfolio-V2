import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-grain">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
