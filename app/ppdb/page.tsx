import PPDBHero from "@/components/ppdb/PPDBHero";
import AuthStack from "@/components/AuthStack";
import PPDBStats from "@/components/ppdb/PPDBStats";

export default function PPDBPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* DECORATION BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-40 -right-28 h-[480px] w-[480px] rounded-full bg-sky-200/40 blur-3xl" />
      </div>

      <div className="relative container-page py-10 md:py-14">
        {/* HEADER */}
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
            PPDB Online
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Realtime Dashboard
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Pendaftaran Santri Baru
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">
            Pantau statistik pendaftar secara realtime dan akses login untuk
            melanjutkan proses pendaftaran serta upload berkas.
          </p>
        </div>

        {/* GRID 50:50 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: MINI DASHBOARD */}
          <div className="lg:col-span-6 space-y-6">
            <PPDBStats />
          </div>

          {/* RIGHT: AUTH + STICKY */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="rounded-[32px] border border-slate-200 bg-white/90 backdrop-blur shadow-[0_18px_80px_rgba(15,23,42,0.10)] p-6 md:p-7">
              <div className="mb-5">
                <div className="text-sm font-semibold text-slate-500">
                  Akses PPDB
                </div>

                <h2 className="mt-1 text-3xl md:text-4xl font-extrabold text-slate-900">
                  Login / Register
                </h2>

                <p className="mt-2 text-sm md:text-[15px] text-slate-600 leading-relaxed">
                  Masuk untuk melanjutkan pendaftaran dan upload berkas. Jika
                  belum punya akun, silakan registrasi.
                </p>
              </div>

              <AuthStack />
            </div>

            {/* FOOT NOTE */}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur px-4 py-3 text-xs text-slate-600">
              <b className="text-slate-900">Catatan:</b> Jika ada kendala
              login/registrasi, silakan hubungi admin melalui menu{" "}
              <b>Kontak Admin</b>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
