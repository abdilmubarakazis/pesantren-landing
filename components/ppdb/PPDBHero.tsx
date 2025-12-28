"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function PPDBHero() {
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Parallax glow */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${y * 0.14}px)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.12),transparent_55%)]" />
      </div>

      {/* soft blobs */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-sky-400/15 blur-3xl" />

      <div className="relative pt-24 md:pt-28 pb-28">
        <div className="container-page">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs text-slate-700 backdrop-blur-md shadow-sm">
              <Sparkles size={14} className="text-emerald-600" />
              PPDB Online Pesantren Sultan Hasanuddin
            </div>

            <h1 className="mt-6 text-3xl md:text-5xl font-extrabold leading-tight text-slate-900">
              Pantau statistik pendaftar{" "}
              <span className="text-emerald-600">realtime</span>, lalu login
              untuk daftar.
            </h1>

            <p className="mt-4 text-slate-600 md:text-lg">
              Halaman ini menampilkan ringkasan pendaftar per jenjang, update
              berkala, serta countdown penutupan PPDB.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
