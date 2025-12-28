"use client";

import { useEffect, useState } from "react";
import PPDBPrint from "@/components/ppdb/PPDBPrint";

export default function PPDBFinalPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const raw = localStorage.getItem("ppdb_submission");
    if (raw) setData(JSON.parse(raw));
  }, []);

  // ✅ kalau belum ada data, jangan loading terus
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-700 p-6 text-center">
        <h2 className="text-2xl font-extrabold">Data belum tersedia</h2>
        <p className="mt-2 text-slate-600 max-w-md">
          Kamu belum mengisi formulir pendaftaran. Silakan isi dulu melalui
          halaman PPDB.
        </p>

        <a
          href="/ppdb"
          className="mt-6 rounded-full bg-emerald-600 px-6 py-3 text-sm font-extrabold text-white hover:bg-emerald-700 transition"
        >
          Kembali ke PPDB
        </a>
      </div>
    );
  }

  const doPrint = () => window.print();

  return (
    <section className="min-h-screen bg-slate-50">
      {/* ✅ non print */}
      <div id="no-print" className="container-page py-10">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-lg p-7">
          <div className="text-3xl font-extrabold text-slate-900">
            Pendaftaran Berhasil ✅
          </div>
          <p className="mt-2 text-slate-600">
            Klik tombol cetak untuk mencetak formulir resmi pendaftaran.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={doPrint}
              className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-extrabold text-white hover:bg-emerald-700 transition"
            >
              Cetak Formulir
            </button>

            <a
              href="/ppdb"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
            >
              Kembali ke PPDB
            </a>
          </div>
        </div>
      </div>

      {/* ✅ print area */}
      <div className="py-10">
        <PPDBPrint data={data.data} upload={data.upload} />
      </div>
    </section>
  );
}
