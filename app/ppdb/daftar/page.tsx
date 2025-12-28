import PPDBWizard from "@/components/ppdb/PPDBWizard";

export default function PPDBDaftarPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="container-page py-10 md:py-14">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
            Formulir Pendaftaran
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Multi-Step
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Form PPDB Pesantren Sultan Hasanuddin
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">
            Lengkapi data pendaftaran dengan benar. Pastikan NIK dan Nomor HP
            sesuai, karena akan digunakan untuk verifikasi.
          </p>
        </div>

        <PPDBWizard />
      </div>
    </section>
  );
}
