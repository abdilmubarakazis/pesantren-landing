"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type StatBox = {
  label: string;
  value: number;
  sub: { label: string; value: number }[];
};

function formatNumber(n: number) {
  return n.toLocaleString("id-ID");
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(startWhen: boolean, target: number, durationMs = 1200) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!startWhen) return;
    if (startedRef.current) return; // sekali saja
    startedRef.current = true;

    const start = performance.now();
    const from = 0;
    const to = target;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = easeOutCubic(t);
      const current = Math.round(from + (to - from) * eased);
      setVal(current);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [startWhen, target, durationMs]);

  return val;
}

type Particle = {
  id: number;
  size: number;
  x: number;
  y: number;
  blur: number;
  duration: number;
  delay: number;
  opacity: number;
};

export default function JoinStats() {
  const data: StatBox[] = useMemo(
    () => [
      {
        label: "SANTRI PUTRA",
        value: 1000,
        sub: [
          { label: "MTs.", value: 1000 },
          { label: "MA", value: 500 },
          { label: "SMK", value: 500 },
        ],
      },
      {
        label: "SANTRI PUTRI",
        value: 1000,
        sub: [
          { label: "MTs.", value: 1000 },
          { label: "MA", value: 500 },
          { label: "SMK", value: 500 },
        ],
      },
    ],
    []
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [visible, setVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  // Floating particles (generated once)
  const particles: Particle[] = useMemo(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < 14; i++) {
      const size = 10 + Math.round(Math.random() * 34);
      arr.push({
        id: i,
        size,
        x: Math.round(Math.random() * 100),
        y: Math.round(Math.random() * 100),
        blur: 6 + Math.round(Math.random() * 14),
        duration: 10 + Math.round(Math.random() * 14),
        delay: Math.round(Math.random() * 6),
        opacity: 0.15 + Math.random() * 0.2,
      });
    }
    return arr;
  }, []);

  // trigger counter saat section terlihat
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // parallax background halus
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      const mid = rect.top + rect.height / 2;
      const t = (mid - vh / 2) / (vh / 2);
      const clamped = Math.max(-1, Math.min(1, t));

      setParallaxY(-clamped * 22);
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // counts
  const putraTotal = useCountUp(visible, data[0].value, 1400);
  const putriTotal = useCountUp(visible, data[1].value, 1400);

  const putraMTs = useCountUp(visible, data[0].sub[0].value, 1200);
  const putraMA = useCountUp(visible, data[0].sub[1].value, 1200);
  const putraSMK = useCountUp(visible, data[0].sub[2].value, 1200);

  const putriMTs = useCountUp(visible, data[1].sub[0].value, 1200);
  const putriMA = useCountUp(visible, data[1].sub[1].value, 1200);
  const putriSMK = useCountUp(visible, data[1].sub[2].value, 1200);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16">
      {/* ===== Background foto kegiatan + parallax ===== */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${parallaxY}px)` }}
        aria-hidden
      >
        <Image
          src="/images/backgroundjoin.png"
          alt="Kegiatan Santri"
          fill
          className="object-cover"
          priority={false}
        />

        {/* overlay modern: foto tetap jelas tapi teks aman */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/40 to-slate-950/55" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* glow */}
        <div className="absolute -left-28 top-10 h-80 w-80 rounded-full bg-emerald-400/18 blur-3xl" />
        <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-cyan-300/14 blur-3xl" />

        {/* floating particles layer */}
        <div className="absolute inset-0">
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-full bg-white/70 mix-blend-overlay"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
                filter: `blur(${p.blur}px)`,
                opacity: p.opacity,
                transform: "translate(-50%, -50%)",
                animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* subtle noise feel (cheap but effective) */}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="container-page relative z-10">
        {/* Card utama */}
        <div className="relative mx-auto max-w-5xl rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
          {/* ✨ glass shimmer */}
          <div className="pointer-events-none absolute inset-0 shimmer-mask" />

          {/* Header */}
          <div className="bg-slate-950/55 text-white text-center px-6 py-6">
            <h3 className="text-lg md:text-xl font-extrabold">
              Bergabunglah dengan Kami
            </h3>
            <p className="text-white/80 text-sm mt-1">
              Jadilah bagian dari generasi yang beradab &amp; berilmu
            </p>
          </div>

          {/* Body */}
          <div className="grid md:grid-cols-2">
            {/* PUTRA */}
            <div className="px-6 py-10 border-b md:border-b-0 md:border-r border-white/10">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-emerald-300 drop-shadow">
                  {formatNumber(putraTotal)}
                </div>
                <div className="mt-1 text-white font-bold tracking-wide">
                  SANTRI PUTRA
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <MiniStat value={putraMTs} label="MTs." />
                <MiniStat value={putraMA} label="MA" />
                <MiniStat value={putraSMK} label="SMK" />
              </div>
            </div>

            {/* PUTRI */}
            <div className="px-6 py-10">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-emerald-300 drop-shadow">
                  {formatNumber(putriTotal)}
                </div>
                <div className="mt-1 text-white font-bold tracking-wide">
                  SANTRI PUTRI
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <MiniStat value={putriMTs} label="MTs." />
                <MiniStat value={putriMA} label="MA" />
                <MiniStat value={putriSMK} label="SMK" />
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#ppdb"
            className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 transition"
          >
            Daftar Segera
          </a>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm px-3 py-4 text-center">
      <div className="text-white font-extrabold">{formatNumber(value)}</div>
      <div className="text-white/80 text-xs mt-0.5">{label}</div>
    </div>
  );
}
