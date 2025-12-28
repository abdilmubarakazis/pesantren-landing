"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { label: string; href: string; id: string };

export default function Navbar() {
  const items: NavItem[] = useMemo(
    () => [
      { label: "Home", href: "#", id: "top" },
      { label: "Profil", href: "#profil", id: "profil" },
      { label: "Ekskul", href: "#ekskul", id: "ekskul" },
      { label: "Prestasi", href: "#prestasi", id: "prestasi" },
      { label: "BUMP", href: "#bump", id: "bump" },
      { label: "Kabar Sulhas", href: "#kabar", id: "kabar" },
      { label: "Alumni", href: "#alumni", id: "alumni" },

      // ✅ PPDB langsung halaman
      { label: "PPDB", href: "/ppdb", id: "ppdb" },
    ],
    []
  );

  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("top");
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);

  // scroll blur effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section observer (hanya untuk hash section)
  useEffect(() => {
    const ids = items
      .map((i) => i.id)
      .filter((id) => id !== "top" && id !== "ppdb"); // ✅ exclude ppdb karena halaman beda

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
        if (window.scrollY < 80) setActiveId("top");
      },
      { root: null, threshold: [0.15, 0.3, 0.5, 0.75] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  const scrollToHash = (hash: string) => {
    if (!hash || hash === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const headerH = headerRef.current?.offsetHeight ?? 56;
    const y = el.getBoundingClientRect().top + window.scrollY - headerH - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const onNavClick = (e: React.MouseEvent, href: string, id: string) => {
    // ✅ kalau ini link halaman (contoh /ppdb), biarkan Next.js handle
    if (href.startsWith("/")) {
      setMobileOpen(false);
      return;
    }

    // ✅ kalau hash section, smooth scroll
    e.preventDefault();
    if (href === "#") history.pushState(null, "", "#");
    else history.pushState(null, "", href);

    setActiveId(id);
    scrollToHash(href);
    setMobileOpen(false);
  };

  return (
    <header
      ref={(el) => {
        headerRef.current = el as unknown as HTMLElement;
      }}
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all",
        scrolled
          ? "bg-white/75 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-white/25 backdrop-blur-sm",
      ].join(" ")}
    >
      <div className="container-page h-14 flex items-center justify-between px-3 md:px-0">
        {/* LOGO + TITLE */}
        <Link
          href="#"
          onClick={(e) => onNavClick(e as any, "#", "top")}
          className="flex items-center gap-3 min-w-0"
        >
          <Image
            src="/images/logopesantren.png"
            alt="Logo"
            width={42}
            height={42}
            className="rounded flex-shrink-0"
          />
          <div className="leading-tight min-w-0">
            <div className="text-sm font-bold text-slate-900 truncate">
              Pesantren Sultan Hasanuddin
            </div>
            <div className="text-[11px] text-slate-600 truncate">
              Pondok Pesantren Modern
            </div>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-semibold">
          {items
            .filter((i) => !i.href.startsWith("/")) // ✅ hide /ppdb dari menu utama
            .map((n) => {
              const isActive = activeId === n.id;
              return (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={(e) => onNavClick(e, n.href, n.id)}
                  className={[
                    "relative px-1 py-1 transition-colors",
                    isActive
                      ? "text-emerald-700"
                      : "text-slate-800 hover:text-emerald-700",
                  ].join(" ")}
                >
                  {n.label}
                  <span
                    className={[
                      "absolute left-0 -bottom-1 h-[2px] w-full rounded-full transition-opacity",
                      isActive
                        ? "opacity-100 bg-emerald-600"
                        : "opacity-0 bg-emerald-600",
                    ].join(" ")}
                  />
                </a>
              );
            })}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2">
          {/* ✅ PPDB Button Desktop */}
          <Link
            href="/ppdb"
            className="hidden md:inline-flex rounded-md bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
          >
            PPDB
          </Link>

          {/* Hamburger Mobile */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-100"
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md">
          <div className="container-page px-3 py-3 flex flex-col gap-2">
            {items.map((n) => {
              const isActive = activeId === n.id;

              // ✅ PPDB (halaman /ppdb) pakai Link
              if (n.href.startsWith("/")) {
                return (
                  <Link
                    key={n.label}
                    href={n.href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                      "bg-emerald-600 text-white hover:bg-emerald-700",
                    ].join(" ")}
                  >
                    {n.label}
                  </Link>
                );
              }

              // ✅ Section hash pakai anchor
              return (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={(e) => onNavClick(e, n.href, n.id)}
                  className={[
                    "rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-800 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {n.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
