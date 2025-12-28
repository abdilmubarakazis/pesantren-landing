"use client";

import Image from "next/image";

type UploadState = {
  photo?: string | null; // ✅ base64 image preview
  kk?: string | null;
  akte?: string | null;
  ijazah?: string | null;
  rapor?: string | null;
};

type FormData = {
  fullName: string;
  nik: string;
  gender: string;
  birthPlace: string;
  birthDate: string;
  address: string;
  phone: string;

  fatherName: string;
  fatherJob: string;
  fatherPhone: string;

  motherName: string;
  motherJob: string;
  motherPhone: string;

  guardianName: string;
  guardianPhone: string;
  guardianRelation: string;

  level: string;
  originSchool: string;
  achievements: string;
  hobby: string;
  dream: string;
  diseaseHistory: string;

  createdAt?: string; // tanggal daftar
  regNumber?: string; // nomor pendaftaran
};

export default function PPDBPrint({
  data,
  upload,
}: {
  data: FormData;
  upload: UploadState;
}) {
  const date = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

  return (
    <div id="print-area" className="print-a4 bg-white text-black">
      {/* ============ KOP SURAT ============ */}
      <div className="border-b-2 border-black pb-2">
        <div className="relative h-[120px] w-full">
          <Image
            src="/images/kop-ppdb.png"
            alt="Kop Surat"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* ============ TITLE ============ */}
      <div className="mt-4 text-center">
        <div className="text-[18px] font-bold uppercase tracking-wide">
          Formulir Pendaftaran Santri Baru
        </div>
        <div className="text-[13px] font-medium mt-1">
          Tahun Ajaran 2025 / 2026
        </div>
      </div>

      {/* ============ META ============ */}
      <div className="mt-4 flex items-start justify-between gap-6">
        <div className="text-[12px] space-y-1">
          <div>
            <b>No. Pendaftaran:</b> {data.regNumber || "—"}
          </div>
          <div>
            <b>Tanggal Daftar:</b> {date}
          </div>
          <div>
            <b>Jenjang:</b> {data.level || "—"}
          </div>
        </div>

        {/* FOTO */}
        <div className="w-[110px]">
          <div className="border border-black h-[140px] w-[110px] flex items-center justify-center overflow-hidden">
            {upload.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={upload.photo}
                alt="Foto Santri"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-[10px] text-gray-500 text-center px-2">
                Foto 3x4
              </span>
            )}
          </div>
          <div className="text-[9px] text-center mt-1">Tempel pas foto 3x4</div>
        </div>
      </div>

      {/* ============ SECTION 1: DATA DIRI ============ */}
      <div className="mt-6">
        <div className="section-title">A. Data Diri</div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12px] mt-3">
          <Field label="Nama Lengkap" value={data.fullName} />
          <Field label="NIK" value={data.nik} />

          <Field label="Jenis Kelamin" value={data.gender} />
          <Field
            label="Tempat, Tanggal Lahir"
            value={`${data.birthPlace}, ${data.birthDate}`}
          />

          <Field label="Nomor HP" value={data.phone} />
          <Field label="Alamat" value={data.address} full />
        </div>
      </div>

      {/* ============ SECTION 2: ORANG TUA ============ */}
      <div className="mt-6">
        <div className="section-title">B. Data Orang Tua / Wali</div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12px] mt-3">
          <Field label="Nama Ayah" value={data.fatherName} />
          <Field label="Pekerjaan Ayah" value={data.fatherJob} />
          <Field label="No HP Ayah" value={data.fatherPhone} />

          <div />

          <Field label="Nama Ibu" value={data.motherName} />
          <Field label="Pekerjaan Ibu" value={data.motherJob} />
          <Field label="No HP Ibu" value={data.motherPhone} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[12px]">
          <Field label="Nama Wali (Opsional)" value={data.guardianName} />
          <Field label="Hubungan Wali" value={data.guardianRelation} />
          <Field label="No HP Wali" value={data.guardianPhone} />
        </div>
      </div>

      {/* ============ SECTION 3: AKADEMIK ============ */}
      <div className="mt-6">
        <div className="section-title">C. Akademik & Profil</div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12px] mt-3">
          <Field label="Jenjang" value={data.level} />
          <Field label="Asal Sekolah" value={data.originSchool} />

          <Field label="Prestasi" value={data.achievements} full />
          <Field label="Riwayat Penyakit" value={data.diseaseHistory} full />

          <Field label="Hobi" value={data.hobby} />
          <Field label="Cita-cita" value={data.dream} />
        </div>
      </div>

      {/* ============ SECTION 4: BERKAS ============ */}
      <div className="mt-6">
        <div className="section-title">D. Kelengkapan Berkas</div>

        <div className="mt-3 text-[12px]">
          <div className="grid grid-cols-2 gap-y-1">
            <Checklist label="Kartu Keluarga (KK)" checked={!!upload.kk} />
            <Checklist label="Akte Kelahiran" checked={!!upload.akte} />
            <Checklist label="Ijazah" checked={!!upload.ijazah} />
            <Checklist label="Rapor (Opsional)" checked={!!upload.rapor} />
          </div>
        </div>
      </div>

      {/* ============ SIGNATURE ============ */}
      <div className="mt-10 flex justify-between text-[12px]">
        <div className="w-[45%] text-center">
          <div>Orang Tua / Wali</div>
          <div className="mt-20 font-bold">( __________________ )</div>
        </div>

        <div className="w-[45%] text-center">
          <div>Panitia PPDB</div>
          <div className="mt-20 font-bold">( __________________ )</div>
        </div>
      </div>

      {/* ============ NOTE ============ */}
      <div className="mt-6 text-[10px] text-gray-700 leading-relaxed">
        <b>Catatan:</b> Formulir ini wajib dibawa saat daftar ulang beserta
        dokumen asli untuk verifikasi.
      </div>
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */
function Field({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <div className="flex">
        <div className="w-[150px] font-bold">{label}</div>
        <div className="flex-1 border-b border-black pb-[2px]">
          {value || "—"}
        </div>
      </div>
    </div>
  );
}

function Checklist({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-[14px] w-[14px] border border-black flex items-center justify-center">
        {checked ? "✓" : ""}
      </div>
      <div>{label}</div>
    </div>
  );
}
