"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Users,
  School,
  RefreshCcw,
  Timer,
  TrendingUp,
  BookOpen,
  Download,
  PhoneCall,
} from "lucide-react";

type Stats = {
  mts: number;
  ma: number;
  smk: number;
  total: number;
  today: number;
  closeAt: string;
  updatedAt: string;
};

function formatID(dt: string) {
  try {
    return new Date(dt).toLocaleString("id-ID");
  } catch {
    return "-";
  }
}

function Card({
  title,
  value,
  icon,
  sub,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-[0_16px_60px_rgba(15,23,42,0.08)] p-5 hover:-translate-y-0.5 transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-slate-700">{title}</div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">
            {value}
          </div>
          {sub ? (
            <div className="mt-1 text-xs text-slate-500">{sub}</div>
          ) : null}
        </div>
        <div className="h-11 w-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}

function Bar({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const w = max <= 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span>{label}</span>
        <span className="font-semibold text-slate-900">{value}</span>
      </div>
      <div className="mt-2 h-2.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-700"
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}

function useCountdown(closeAt: string | null) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!closeAt) return { done: false, text: "-" };
  const diff = new Date(closeAt).getTime() - now;
  if (diff <= 0) return { done: true, text: "PPDB ditutup" };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  return {
    done: false,
    text: `${days} hari ${hours} jam ${mins} menit ${secs} detik`,
  };
}

function ActionButton({
  title,
  subtitle,
  icon,
  href,
  variant = "primary",
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href: string;
  variant?: "primary" | "outline" | "dark";
}) {
  return (
    <a
      href={href}
      className={[
        "group rounded-2xl border px-4 py-4 flex items-start gap-3 transition",
        variant === "primary" &&
          "bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700",
        variant === "outline" &&
          "bg-white border-slate-200 text-slate-900 hover:bg-slate-50",
        variant === "dark" &&
          "bg-slate-900 border-slate-900 text-white hover:bg-slate-800",
      ].join(" ")}
    >
      <div
        className={[
          "h-11 w-11 rounded-2xl flex items-center justify-center",
          variant === "primary" && "bg-white/15",
          variant === "outline" && "bg-emerald-50 text-emerald-700",
          variant === "dark" && "bg-white/10",
        ].join(" ")}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <div className="font-extrabold leading-tight">{title}</div>
        <div
          className={[
            "mt-1 text-xs",
            variant === "outline" ? "text-slate-600" : "text-white/80",
          ].join(" ")}
        >
          {subtitle}
        </div>

        <div
          className={[
            "mt-3 inline-flex items-center gap-2 text-xs font-bold opacity-90 group-hover:opacity-100 transition",
            variant === "outline" ? "text-emerald-700" : "text-white",
          ].join(" ")}
        >
          Buka{" "}
          <span className="translate-x-0 group-hover:translate-x-0.5 transition">
            →
          </span>
        </div>
      </div>
    </a>
  );
}

export default function PPDBStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async (manual = false) => {
    try {
      if (manual) setRefreshing(true);
      setLoading(true);
      const res = await fetch("/api/ppdb/stats", { cache: "no-store" });
      const data = (await res.json()) as Stats;
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const t = setInterval(() => fetchStats(), 5000);
    return () => clearInterval(t);
  }, []);

  const updatedText = useMemo(
    () => (stats?.updatedAt ? formatID(stats.updatedAt) : "-"),
    [stats?.updatedAt]
  );

  const closeText = useMemo(
    () => (stats?.closeAt ? formatID(stats.closeAt) : "-"),
    [stats?.closeAt]
  );

  const countdown = useCountdown(stats?.closeAt ?? null);

  const max = useMemo(
    () => Math.max(stats?.mts ?? 0, stats?.ma ?? 0, stats?.smk ?? 0, 1),
    [stats?.mts, stats?.ma, stats?.smk]
  );

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_16px_60px_rgba(15,23,42,0.10)] overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-emerald-50 via-white to-sky-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-sm text-slate-500">Mini Dashboard</div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Statistik Pendaftar
              </h2>
              <div className="mt-2 text-sm text-slate-600">
                Update terakhir: <b className="text-slate-900">{updatedText}</b>
              </div>
            </div>

            <button
              onClick={() => fetchStats(true)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-50 transition"
            >
              <RefreshCcw
                className={refreshing ? "animate-spin" : ""}
                size={16}
              />
              Refresh
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading && !stats ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-28 rounded-3xl bg-slate-100 animate-pulse" />
              <div className="h-28 rounded-3xl bg-slate-100 animate-pulse" />
              <div className="h-28 rounded-3xl bg-slate-100 animate-pulse" />
              <div className="h-28 rounded-3xl bg-slate-100 animate-pulse" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <Card
                title="Pendaftar MTS"
                value={stats?.mts ?? 0}
                icon={<School size={18} />}
                sub="Madrasah Tsanawiyah"
              />
              <Card
                title="Pendaftar MA"
                value={stats?.ma ?? 0}
                icon={<School size={18} />}
                sub="Madrasah Aliyah"
              />
              <Card
                title="Pendaftar SMK"
                value={stats?.smk ?? 0}
                icon={<School size={18} />}
                sub="Sekolah Menengah Kejuruan"
              />
              <Card
                title="Total Pendaftar"
                value={stats?.total ?? 0}
                icon={<Users size={18} />}
                sub="Jumlah keseluruhan pendaftar"
              />
            </div>
          )}
        </div>
      </div>

      {/* CTA PANEL ✅ */}
      <div className="grid gap-4 md:grid-cols-3">
        <ActionButton
          title="Panduan PPDB"
          subtitle="Lihat alur, syarat, dan ketentuan pendaftaran"
          href="#panduan"
          icon={<BookOpen size={18} />}
          variant="outline"
        />
        <ActionButton
          title="Download Brosur"
          subtitle="Unduh brosur resmi PPDB (PDF)"
          href="/brosur-ppdb.pdf"
          icon={<Download size={18} />}
          variant="primary"
        />
        <ActionButton
          title="Kontak Admin"
          subtitle="Chat admin via WhatsApp untuk bantuan"
          href="https://wa.me/6280000000000"
          icon={<PhoneCall size={18} />}
          variant="dark"
        />
      </div>

      {/* 3 fitur tambahan */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Grafik bar */}
        <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_16px_60px_rgba(15,23,42,0.10)] p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900">
              Grafik Pendaftar per Jenjang
            </h3>
            <TrendingUp className="text-slate-500" size={18} />
          </div>

          <div className="mt-5 space-y-4">
            <Bar label="MTS" value={stats?.mts ?? 0} max={max} />
            <Bar label="MA" value={stats?.ma ?? 0} max={max} />
            <Bar label="SMK" value={stats?.smk ?? 0} max={max} />
          </div>

          <div className="mt-6 text-xs text-slate-500">
            * Grafik ini update otomatis mengikuti data terbaru.
          </div>
        </div>

        {/* Today + Countdown */}
        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_16px_60px_rgba(15,23,42,0.10)] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900">
                Pendaftar Hari Ini
              </h3>
              <Users className="text-slate-500" size={18} />
            </div>

            <div className="mt-4 text-4xl font-extrabold text-emerald-700">
              {stats?.today ?? 0}
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Jumlah pendaftar yang masuk hari ini.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_16px_60px_rgba(15,23,42,0.10)] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900">
                Countdown Penutupan
              </h3>
              <Timer className="text-slate-500" size={18} />
            </div>

            <div className="mt-4 text-sm text-slate-600">
              Ditutup pada:
              <div className="mt-1 font-semibold text-slate-900">
                {closeText}
              </div>
            </div>

            <div
              className={[
                "mt-4 rounded-2xl border px-4 py-3 text-sm font-bold",
                countdown.done
                  ? "border-rose-200 bg-rose-50 text-rose-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800",
              ].join(" ")}
            >
              {countdown.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
