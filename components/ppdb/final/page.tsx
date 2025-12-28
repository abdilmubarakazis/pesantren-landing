export default function PPDBFinalPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="container-page py-12">
        <div className="rounded-[34px] border border-slate-200 bg-white shadow-[0_18px_80px_rgba(15,23,42,0.08)] p-7 md:p-9">
          <div className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Pendaftaran Berhasil ✅
          </div>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Silakan cetak formulir pendaftaran. Setelah itu, kamu akan melihat
            jadwal daftar ulang dan dokumen yang wajib dibawa.
          </p>

          {/* PRINT BUTTON */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => window.print()}
              className="rounded-full bg-emerald-600 text-white px-6 py-3 text-sm font-extrabold hover:bg-emerald-700 transition"
            >
              Cetak Formulir
            </button>

            <a
              href="/ppdb"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
            >
              Kembali ke Dashboard
            </a>
          </div>

          {/* AFTER PRINT INFO */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Schedule */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-lg font-extrabold text-slate-900">
                Jadwal Daftar Ulang
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Wajib hadir ke pesantren sesuai jadwal berikut:
              </p>

              <ul className="mt-4 space-y-2 text-sm text-slate-800">
                <li>
                  📅 <b>Tanggal:</b> 10 - 12 Januari 2026
                </li>
                <li>
                  🕘 <b>Jam:</b> 08.00 - 14.00 WITA
                </li>
                <li>
                  📍 <b>Lokasi:</b> Kantor PPDB Pesantren Sultan Hasanuddin
                </li>
              </ul>
            </div>

            {/* Documents */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-lg font-extrabold text-slate-900">
                Berkas yang Harus Dibawa
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Berikut dokumen yang wajib dibawa saat daftar ulang:
              </p>

              <ul className="mt-4 space-y-2 text-sm text-slate-800">
                <li>✅ Formulir pendaftaran (hasil cetak)</li>
                <li>✅ Fotokopi KK (2 lembar)</li>
                <li>✅ Fotokopi Akte kelahiran (2 lembar)</li>
                <li>✅ Fotokopi Ijazah terakhir (2 lembar)</li>
                <li>✅ Pas Foto 3x4 (4 lembar)</li>
                <li>✅ Rapor terakhir (jika diminta)</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
            <div className="text-sm font-extrabold text-emerald-800">
              ✅ Tips:
            </div>
            <p className="mt-2 text-sm text-emerald-800/90">
              Pastikan datang tepat waktu dan membawa dokumen asli untuk
              verifikasi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
