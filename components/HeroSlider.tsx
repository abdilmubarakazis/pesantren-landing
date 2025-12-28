"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  bg: string;
  titleArab: string;
  title: string;
  subtitle: string;
  tokohImg?: string;
  tokohClass?: string; // atur posisi tokoh per slide
  buttons: {
    label: string;
    href: string;
    variant: "primary" | "outline" | "dark";
  }[];
};

const AUTO_MS = 6000;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.11 17.53c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.2-1.36-.81-.72-1.36-1.6-1.52-1.87-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.52-.45-.45-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.12 2.81c.14.18 1.93 2.95 4.68 4.13.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z"
      />
      <path
        fill="currentColor"
        d="M26.66 5.34A13.22 13.22 0 0 0 16 1.06C8.93 1.06 3.18 6.81 3.18 13.88c0 2.26.59 4.47 1.72 6.42L3 30.94l10.86-1.84a12.77 12.77 0 0 0 2.14.18c7.07 0 12.82-5.75 12.82-12.82 0-3.43-1.34-6.65-3.16-9.12zM16 27.2c-.68 0-1.36-.06-2.02-.18l-.72-.13-6.44 1.09 1.07-6.28-.15-.65a10.63 10.63 0 0 1-1.08-4.69C6.66 8.41 10.53 4.54 16 4.54c2.91 0 5.64 1.13 7.7 3.19a10.78 10.78 0 0 1 3.19 7.68c0 5.47-4.43 11.79-10.89 11.79z"
      />
    </svg>
  );
}

export default function HeroSlider() {
  const slides: Slide[] = useMemo(
    () => [
      {
        bg: "/images/drone.jpg",
        titleArab: "أهلاً وسهلاً",
        title: "Jayalah Dikau Abadilah Namamu",
        subtitle: "Pesantren Sultan Hasanuddin",
        tokohImg: "/images/foto1.png",
        tokohClass:
          "translate-y-6 sm:translate-y-10 md:translate-y-6 scale-[1.5] sm:scale-[1.8] md:scale-[1.4]",
        buttons: [
          {
            label: "Video Profile Pesantren",
            href: "#profil",
            variant: "dark",
          },
          {
            label: "Struktur Pesantren",
            href: "#struktur",
            variant: "outline",
          },
          { label: "Download Brosur", href: "#brosur", variant: "primary" },
        ],
      },
      {
        bg: "/images/slide-2.jpg",
        titleArab: "مرحبا بكم",
        title: "Mencetak Generasi Qurani",
        subtitle: "Berakhlak, Berilmu, Berdaya Saing",
        tokohImg: "/images/tokoh-slide-2.png",
        tokohClass:
          "translate-y-6 sm:translate-y-10 md:translate-y-6 scale-[1.2] sm:scale-[1.4] md:scale-[1.1]",
        buttons: [
          { label: "Lihat Program", href: "#program", variant: "primary" },
          { label: "Prestasi Santri", href: "#prestasi", variant: "outline" },
          {
            label: "Hubungi Admin",
            href: "https://wa.me/6280000000000",
            variant: "dark",
          },
        ],
      },
      {
        bg: "/images/slide-3.jpg",
        titleArab: "السلام عليكم",
        title: "PPDB Pesantren Sultan Hasanuddin",
        subtitle: "Daftar sekarang, kuota terbatas",
        tokohImg: "/images/tokoh-slide-3.png",
        tokohClass:
          "translate-y-6 sm:translate-y-10 md:translate-y-6 scale-[1.2] sm:scale-[1.4] md:scale-[1.1]",
        buttons: [
          { label: "Info PPDB", href: "#ppdb", variant: "primary" },
          { label: "Syarat & Alur", href: "#faq", variant: "outline" },
          {
            label: "WhatsApp",
            href: "https://wa.me/6280000000000",
            variant: "dark",
          },
        ],
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => setAnimKey((k) => k + 1), [active]);
  useEffect(() => setProgressKey((k) => k + 1), [active]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const go = (idx: number) => setActive((idx + slides.length) % slides.length);
  const next = () => setActive((a) => (a + 1) % slides.length);
  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length);

  const startAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, AUTO_MS);
  };

  const stopAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startAuto();
    return () => stopAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  // ===== SWIPE (mobile) =====
  const touchStartX = useRef<number | null>(null);
  const touchLastX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const SWIPE_THRESHOLD = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    const x = e.touches[0]?.clientX ?? null;
    touchStartX.current = x;
    touchLastX.current = x;
    isDragging.current = true;

    setPaused(true);
    stopAuto();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchLastX.current = e.touches[0]?.clientX ?? touchLastX.current;
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const start = touchStartX.current;
    const end = touchLastX.current;

    touchStartX.current = null;
    touchLastX.current = null;

    if (start != null && end != null) {
      const delta = end - start;
      if (Math.abs(delta) >= SWIPE_THRESHOLD) {
        if (delta < 0) next();
        else prev();
      }
    }

    setPaused(false);
    startAuto();
    setProgressKey((k) => k + 1);
  };

  const s = slides[active];

  return (
    <section className="relative">
      {/* spacer navbar fixed */}
      <div className="h-14" />

      {/* WA fixed */}
      <a
        href="https://wa.me/6280000000000"
        className="fixed bottom-5 right-5 z-[60] h-12 w-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:bg-emerald-600 transition"
        aria-label="Chat WhatsApp"
        title="Chat WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      <div
        className="relative overflow-hidden border-b touch-pan-y"
        onMouseEnter={() => {
          setPaused(true);
          stopAuto();
        }}
        onMouseLeave={() => {
          setPaused(false);
          startAuto();
          setProgressKey((k) => k + 1);
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Background crossfade */}
        <div className="relative min-h-[420px] sm:min-h-[460px] md:min-h-[520px]">
          {slides.map((slide, i) => (
            <div
              key={slide.bg}
              className={[
                "absolute inset-0 transition-opacity duration-700",
                i === active ? "opacity-100" : "opacity-0",
              ].join(" ")}
            >
              <Image
                src={slide.bg}
                alt={`Hero background ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-emerald-600" />

          {/* Content */}
          <div className="container-page absolute inset-0 z-10 flex items-center px-4 md:px-0 py-10 md:py-0">
            <div className="grid w-full grid-cols-12 gap-4 items-center">
              {/* Tokoh */}
              <div className="col-span-12 md:col-span-4 flex justify-center md:justify-start order-1 md:order-none mb-2 md:mb-0">
                {s.tokohImg ? (
                  <div
                    className={[
                      "relative w-[120px] h-[140px] sm:w-[170px] sm:h-[200px] md:w-[240px] md:h-[280px]",
                      "transition-transform duration-500",
                      s.tokohClass ?? "",
                    ].join(" ")}
                  >
                    <Image
                      src={s.tokohImg}
                      alt="Tokoh"
                      fill
                      className="object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)]"
                    />
                  </div>
                ) : null}
              </div>

              {/* Teks + animasi */}
              <div
                key={animKey}
                className="col-span-12 md:col-span-8 text-center md:text-left order-2 md:order-none"
              >
                <div className="text-white/90 text-sm mb-1 animate-hero-up">
                  {s.titleArab}
                </div>

                <h1 className="mx-auto md:mx-0 max-w-xl text-white text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight animate-hero-up [animation-delay:80ms]">
                  {s.title}
                </h1>

                <p className="mx-auto md:mx-0 max-w-xl mt-2 text-white/85 text-sm sm:text-base animate-hero-up [animation-delay:160ms]">
                  {s.subtitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start animate-hero-up [animation-delay:240ms]">
                  {s.buttons.map((b, i) => (
                    <a
                      key={i}
                      href={b.href}
                      className={[
                        "rounded-full px-4 py-2 text-[11px] sm:text-sm font-bold whitespace-nowrap transition",
                        b.variant === "primary" &&
                          "bg-emerald-600 text-white hover:bg-emerald-700",
                        b.variant === "outline" &&
                          "bg-white/10 text-white border border-white/35 hover:bg-white/20",
                        b.variant === "dark" &&
                          "bg-slate-900/90 text-white hover:bg-slate-900",
                      ].join(" ")}
                    >
                      {b.label}
                    </a>
                  ))}
                </div>

                <div className="mt-5 flex flex-col items-center md:items-start gap-3 animate-hero-up [animation-delay:320ms]">
                  {/* arrows + dots */}
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <button
                      onClick={() => {
                        prev();
                        setProgressKey((k) => k + 1);
                      }}
                      className="h-9 w-9 rounded-full bg-white/10 border border-white/25 text-white hover:bg-white/20"
                      aria-label="Prev slide"
                      type="button"
                    >
                      ‹
                    </button>

                    <div className="flex items-center gap-2">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            go(i);
                            setProgressKey((k) => k + 1);
                          }}
                          className={[
                            "h-2.5 rounded-full transition-all",
                            i === active
                              ? "w-8 bg-white"
                              : "w-2.5 bg-white/45 hover:bg-white/70",
                          ].join(" ")}
                          aria-label={`Go to slide ${i + 1}`}
                          type="button"
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        next();
                        setProgressKey((k) => k + 1);
                      }}
                      className="h-9 w-9 rounded-full bg-white/10 border border-white/25 text-white hover:bg-white/20"
                      aria-label="Next slide"
                      type="button"
                    >
                      ›
                    </button>
                  </div>

                  {/* progress bar */}
                  <div className="w-56 sm:w-64 h-1.5 rounded-full bg-white/25 overflow-hidden">
                    <div
                      key={progressKey}
                      className="h-full bg-emerald-400 animate-progress"
                      style={{
                        animationDuration: `${AUTO_MS}ms`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ✅ overlay button DIHAPUS biar CTA bisa diklik */}
        </div>
      </div>
    </section>
  );
}
