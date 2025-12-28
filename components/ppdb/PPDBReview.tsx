"use client";

export default function PPDBReview({ data }: { data: any }) {
  const Item = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 py-3">
      <div className="text-sm font-bold text-slate-700">{label}</div>
      <div className="text-sm text-slate-900 text-right max-w-[60%]">
        {value || "-"}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] p-6">
        <div className="text-lg font-extrabold text-slate-900">
          Review Data Pendaftaran
        </div>
        <p className="mt-1 text-sm text-slate-600">
          Pastikan semua data sudah benar sebelum finalisasi.
        </p>

        <div className="mt-5">
          <Item label="Nama Lengkap" value={data.fullName} />
          <Item label="NIK" value={data.nik} />
          <Item label="Jenis Kelamin" value={data.gender} />
          <Item label="TTL" value={`${data.birthPlace}, ${data.birthDate}`} />
          <Item label="Alamat" value={data.address} />
          <Item label="No HP" value={data.phone} />
          <Item label="Jenjang" value={data.level} />
          <Item label="Asal Sekolah" value={data.originSchool} />
          <Item label="Prestasi" value={data.achievements} />
          <Item label="Hobi" value={data.hobby} />
          <Item label="Cita-cita" value={data.dream} />
          <Item label="Riwayat Penyakit" value={data.diseaseHistory} />
        </div>
      </div>

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
        <div className="text-sm font-extrabold text-amber-800">
          ⚠️ Catatan Finalisasi
        </div>
        <p className="mt-2 text-sm text-amber-800/90 leading-relaxed">
          Setelah finalisasi, data akan terkunci dan formulir pendaftaran akan
          bisa dicetak. Pastikan semua berkas sudah sesuai.
        </p>
      </div>
    </div>
  );
}
