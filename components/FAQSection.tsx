"use client";

import Image from "next/image";
import { useState } from "react";

type FAQ = { q: string; a: string };

const faqs: FAQ[] = [
  {
    q: "Apa syarat pendaftaran santri baru?",
    a: "Syarat pendaftaran meliputi fotokopi Kartu Keluarga, Akta Kelahiran, Ijazah/Surat Keterangan Lulus, pas foto terbaru, serta mengisi formulir pendaftaran. Detail lengkap dapat dilihat pada halaman PPDB atau hubungi admin.",
  },
  {
    q: "Apakah tersedia asrama untuk santri?",
    a: "Ya, tersedia asrama putra dan putri dengan pengawasan pembina. Fasilitas disesuaikan untuk kenyamanan dan keamanan santri.",
  },
  {
    q: "Bagaimana sistem biaya pendidikan?",
    a: "Biaya pendidikan menyesuaikan jenjang dan program. Untuk rincian biaya pendaftaran, SPP, dan asrama, silakan hubungi admin atau lihat halaman PPDB.",
  },
  {
    q: "Kapan PPDB dibuka?",
    a: "PPDB biasanya dibuka dalam beberapa gelombang setiap tahun. Jadwal resmi diumumkan melalui website dan media sosial pesantren.",
  },
  {
    q: "Apakah ada program beasiswa?",
    a: "Ada. Beasiswa tersedia untuk santri berprestasi dan santri dari keluarga kurang mampu sesuai ketentuan yang berlaku.",
  },
];

function ThinkingSantriFallback() {
  // SVG sederhana: santri + bubble tanda tanya (ringan & aman)
  return (
    <svg
      viewBox="0 0 260 260"
      className="w-full h-full"
      role="img"
      aria-label="Ilustrasi santri sedang berpikir"
    >
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="rgba(16,185,129,0.35)" />
          <stop offset="1" stopColor="rgba(59,130,246,0.18)" />
        </linearGradient>
      </defs>

      {/* glow */}
      <circle cx="140" cy="130" r="110" fill="url(#g)" opacity="0.7" />
      <circle cx="165" cy="95" r="10" fill="rgba(16,185,129,0.55)" />
      <circle cx="190" cy="70" r="6" fill="rgba(16,185,129,0.45)" />
      <text x="198" y="66" fontSize="22" fill="rgba(15,23,42,0.65)">
        ?
      </text>

      {/* head */}
      <circle cx="120" cy="110" r="34" fill="rgba(255,255,255,0.95)" />
      {/* cap */}
      <path d="M90 98c10-18 50-18 60 0v10H90z" fill="rgba(15,23,42,0.88)" />
      {/* face */}
      <circle cx="110" cy="112" r="3" fill="rgba(15,23,42,0.8)" />
      <circle cx="130" cy="112" r="3" fill="rgba(15,23,42,0.8)" />
      <path
        d="M112 126c8 6 18 6 26 0"
        stroke="rgba(15,23,42,0.55)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* body */}
      <path
        d="M85 205c6-42 24-62 35-68 12 7 38 7 50 0 12 10 30 30 36 68"
        fill="rgba(15,23,42,0.9)"
      />
      <path
        d="M110 140c10 6 30 6 40 0v18c-12 8-28 8-40 0z"
        fill="rgba(255,255,255,0.9)"
      />

      {/* hand thinking */}
      <path
        d="M150 175c14 2 18 10 20 18"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M105 175c8 10 10 20 6 30"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden py-24">
      {/* background terang + modern */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-slate-50" />
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.35)_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* blobs */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />

      <div className="container-page relative z-10">
        {/* header */}
        <div className="text-center mb-14">
          <p className="text-emerald-700 text-sm mb-2">أسئلة شائعة</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto text-sm">
            Pertanyaan yang sering diajukan seputar pendaftaran dan kegiatan di
            Pesantren Sultan Hasanuddin.
          </p>
        </div>

        {/* layout: accordion center + character */}
        <div className="mx-auto max-w-6xl grid lg:grid-cols-12 gap-10 items-center">
          {/* Accordion */}
          <div className="lg:col-span-7">
            <div className="mx-auto max-w-3xl space-y-4">
              {faqs.map((item, idx) => {
                const isOpen = open === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-semibold text-slate-900">
                        {item.q}
                      </span>

                      <span
                        className={[
                          "flex h-8 w-8 items-center justify-center rounded-full border text-slate-900 transition-all duration-300",
                          isOpen
                            ? "rotate-45 bg-emerald-600 border-emerald-600 text-white shadow"
                            : "bg-white border-slate-200",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>

                    <div
                      className={[
                        "grid transition-all duration-300 ease-out",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Character (santri thinking) */}
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-sm">
              <div className="relative rounded-2xl border border-slate-200 bg-white/60 backdrop-blur-md shadow-sm overflow-hidden">
                {/* shimmer ringan */}
                <div className="pointer-events-none absolute inset-0 faq-shimmer" />

                <div className="p-6">
                  <div className="text-sm font-bold text-slate-900">
                    Ada yang ingin ditanyakan?
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Klik pertanyaan di samping. Kalau masih bingung, chat admin
                    ya.
                  </div>

                  <div className="mt-6 relative h-[260px]">
                    {/* image santri (kalau ada), fallback svg kalau tidak */}
                    <div className="absolute inset-0 animate-think">
                      {/* Jika kamu punya file ini, taruh di public/images/faq-santri.png */}
                      <Image
                        src="/images/faq-santri.png"
                        alt="Santri sedang berpikir"
                        fill
                        className="object-contain"
                        onError={(e) => {
                          // kalau file tidak ada, sembunyikan img
                          (e.currentTarget as any).style.display = "none";
                        }}
                      />
                      {/* fallback svg akan selalu ada di belakang */}
                      <ThinkingSantriFallback />
                    </div>
                  </div>
                </div>

                {/* CTA kecil */}
                <a
                  href="https://wa.me/6280000000000"
                  className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 transition"
                >
                  Chat Admin
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
