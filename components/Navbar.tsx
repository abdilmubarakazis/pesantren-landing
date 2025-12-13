"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

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
      { label: "PPDB", href: "#ppdb", id: "ppdb" },
    ],
    []
  );

  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("top");
  const headerRef = useRef<HTMLElement | null>(null);

  // scroll blur effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section observer
  useEffect(() => {
    const ids = items.map((i) => i.id).filter((id) => id !== "top");
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // pilih yang paling "visible"
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
        // kalau di paling atas
        if (window.scrollY < 80) setActiveId("top");
      },
      {
        root: null,
        threshold: [0.15, 0.3, 0.5, 0.75],
      }
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
    e.preventDefault();
    // update url tanpa reload
    if (href === "#") history.pushState(null, "", "#");
    else history.pushState(null, "", href);

    setActiveId(id);
    scrollToHash(href);
  };

  return (
    <header
      ref={(el) => {
        // hack kecil biar ref typed sebagai HTMLElement
        headerRef.current = el as unknown as HTMLElement;
      }}
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all",
        scrolled
          ? "bg-white/75 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-white/25 backdrop-blur-sm",
      ].join(" ")}
    >
      <div className="container-page h-14 flex items-center justify-between">
        <Link
          href="#"
          onClick={(e) => onNavClick(e as any, "#", "top")}
          className="flex items-center gap-3"
        >
          <Image
            src="/images/logopesantren.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded"
          />
          <div className="leading-tight">
            <div className="text-sm font-bold text-slate-900">
              Pesantren Sultan Hasanuddin
            </div>
            <div className="text-[11px] text-slate-600">
              Pondok Pesantren Modern
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-xs font-semibold">
          {items.map((n) => {
            const isActive =
              activeId === n.id || (n.id === "top" && activeId === "top");
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
                {/* underline indicator */}
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

        <a
          href="#ppdb"
          onClick={(e) => onNavClick(e, "#ppdb", "ppdb")}
          className="rounded-md bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
        >
          PPDB
        </a>
      </div>
    </header>
  );
}
