"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type TItem = {
  quote: string;
  name: string;
  year: string;
  avatar: string;
};

export default function Testimoni() {
  const baseItems: TItem[] = useMemo(
    () => [
      {
        quote:
          "Pesantren Sultan Hasanuddin telah membentuk karakter dan kepribadian saya. Pengalaman belajar di sini sangat berharga dan menjadi bekal hidup saya.",
        name: "Ahmad Fauzan",
        year: "Alumni 2020",
        avatar: "/images/alumni-1.jpg",
      },
      {
        quote:
          "Alhamdulillah, berkat didikan dari para ustadz dan ustadzah, saya bisa melanjutkan kuliah di universitas ternama dengan beasiswa penuh.",
        name: "Siti Aisyah",
        year: "Alumni 2019",
        avatar: "/images/alumni-2.jpg",
      },
      {
        quote:
          "Lingkungan yang Islami dan kurikulum yang seimbang antara ilmu agama dan umum membuat saya siap menghadapi dunia luar.",
        name: "Muhammad Rizki",
        year: "Alumni 2021",
        avatar: "/images/alumni-3.jpg",
      },
      {
        quote:
          "Pesantren ini tidak hanya mengajarkan ilmu, tapi juga mengajarkan adab dan akhlak yang baik. Terima kasih Pesantren Sultan Hasanuddin.",
        name: "Fatimah Azzahra",
        year: "Alumni 2018",
        avatar: "/images/alumni-4.jpg",
      },
    ],
    []
  );

  // duplikasi untuk loop
  const items = useMemo(() => [...baseItems, ...baseItems], [baseItems]);

  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const rafAutoRef = useRef<number | null>(null);
  const rafParallaxRef = useRef<number | null>(null);

  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  // parallax bg
  const [parallaxY, setParallaxY] = useState(0);

  // auto motion state (stored in refs to avoid re-render)
  const xRef = useRef(0); // current translateX
  const vxRef = useRef(0); // smoothing velocity-ish
  const targetSpeedRef = useRef(52); // px/sec (feel free to tune)

  // ===== visible once =====
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ===== super smooth auto loop via translate3d =====
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (!visible) return;

    // Reset pos
    xRef.current = 0;
    vxRef.current = 0;
    track.style.transform = "translate3d(0px,0,0)";

    let last = performance.now();

    const tick = (now: number) => {
      rafAutoRef.current = requestAnimationFrame(tick);

      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // speed ramp (smoother start/stop)
      const targetSpeed = paused ? 0 : targetSpeedRef.current;
      // simple smoothing
      vxRef.current +=
        (targetSpeed - vxRef.current) * (1 - Math.pow(0.001, dt));

      // move left (negative)
      xRef.current -= vxRef.current * dt;

      const halfWidth = track.scrollWidth / 2; // because items duplicated
      if (halfWidth > 0 && Math.abs(xRef.current) >= halfWidth) {
        // wrap without jump
        xRef.current += halfWidth;
      }

      track.style.transform = `translate3d(${xRef.current.toFixed(2)}px,0,0)`;
    };

    rafAutoRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafAutoRef.current != null) cancelAnimationFrame(rafAutoRef.current);
    };
  }, [visible, paused]);

  // ===== optional: user drag by native scroll (mobile) =====
  // We keep viewport scrollable; but the track itself is translated.
  // Pausing on touch/hover already helps UX.

  // ===== parallax =====
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      const mid = rect.top + rect.height / 2;
      const t = (mid - vh / 2) / (vh / 2);
      const clamped = Math.max(-1, Math.min(1, t));

      setParallaxY(-clamped * 18);
      rafParallaxRef.current = null;
    };

    const onScroll = () => {
      if (rafParallaxRef.current != null) return;
      rafParallaxRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafParallaxRef.current != null)
        cancelAnimationFrame(rafParallaxRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="alumni"
      className="relative overflow-hidden py-20"
    >
      {/* bg */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${parallaxY}px)` }}
        aria-hidden
      >
        <div className="absolute -top-24 left-0 right-0 h-40 rounded-b-[100%] bg-emerald-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(2,6,23,0.06)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl" />
      </div>

      <div className="container-page relative z-10">
        <div className="text-center">
          <p className="text-sm text-emerald-700 mb-2">شهادات الخريجين</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Testimoni Alumni
          </h2>
          <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
            Dengarkan pengalaman dan cerita dari para alumni yang telah sukses
            setelah menyelesaikan pendidikan di Pesantren Sultan Hasanuddin.
          </p>
        </div>

        <div className="relative mt-12">
          {/* fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

          {/* viewport */}
          <div
            ref={viewportRef}
            className="overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {/* track (moving) */}
            <div
              ref={trackRef}
              className="flex gap-6 pb-6 will-change-transform"
              style={{
                transform: "translate3d(0px,0,0)",
              }}
            >
              {items.map((t, idx) => (
                <article
                  key={idx}
                  className={[
                    "flex-shrink-0",
                    "w-[85%] sm:w-[60%] lg:w-[360px] min-w-[280px]",
                    "rounded-2xl border border-slate-200 bg-white/85 backdrop-blur",
                    "shadow-sm hover:shadow-md transition-all p-6",
                    visible
                      ? "animate-testimonial-in"
                      : "opacity-0 translate-y-6",
                  ].join(" ")}
                  style={{
                    animationDelay: `${(idx % baseItems.length) * 120}ms`,
                  }}
                >
                  <div className="text-emerald-300 text-4xl leading-none font-serif">
                    “
                  </div>
                  <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                    {t.quote}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="leading-tight">
                      <div className="text-sm font-bold text-slate-900">
                        {t.name}
                      </div>
                      <div className="text-xs text-slate-500">{t.year}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 h-1.5 w-full bg-emerald-700/90 rounded-full" />
      </div>
    </section>
  );
}
