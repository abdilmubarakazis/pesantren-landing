"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle2,
  User,
  Users,
  GraduationCap,
  Sparkles,
  UploadCloud,
  FileText,
  Image as ImgIcon,
  X,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";

/* ===================== TYPES ===================== */
type UploadState = {
  photo?: File | null;
  kk?: File | null;
  akte?: File | null;
  ijazah?: File | null;
  rapor?: File | null;
};

type FormData = {
  fullName: string;
  nik: string;
  gender: "Laki-laki" | "Perempuan" | "";
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

  level: "MTS" | "MA" | "SMK" | "";
  originSchool: string;
  achievements: string;
  hobby: string;
  dream: string;
  diseaseHistory: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const initialData: FormData = {
  fullName: "",
  nik: "",
  gender: "",
  birthPlace: "",
  birthDate: "",
  address: "",
  phone: "",

  fatherName: "",
  fatherJob: "",
  fatherPhone: "",

  motherName: "",
  motherJob: "",
  motherPhone: "",

  guardianName: "",
  guardianPhone: "",
  guardianRelation: "",

  level: "",
  originSchool: "",
  achievements: "",
  hobby: "",
  dream: "",
  diseaseHistory: "",
};

const initialUpload: UploadState = {
  photo: null,
  kk: null,
  akte: null,
  ijazah: null,
  rapor: null,
};

const ease =
  "transition-all duration-500 [transition-timing-function:cubic-bezier(.16,1,.3,1)]";

/* ===================== HELPERS ===================== */
function isPhoneValid(v: string) {
  const cleaned = v.replace(/\s/g, "");
  return cleaned.length >= 10 && /^[0-9+]+$/.test(cleaned);
}

function isNikValid(v: string) {
  const cleaned = v.replace(/\s/g, "");
  return /^\d{16}$/.test(cleaned);
}

function formatDate(d: string) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function fileLabel(f?: File | null) {
  if (!f) return "Belum diupload";
  return `${f.name} (${Math.round(f.size / 1024)} KB)`;
}

/* ===================== UI ATOMS ===================== */
function Field({
  label,
  children,
  error,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-extrabold text-slate-900">{label}</label>
        {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
      </div>

      <div className="mt-2">{children}</div>

      {error ? (
        <div className="mt-2 text-xs font-semibold text-rose-600">{error}</div>
      ) : null}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={[
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-[15px] md:text-[16px] outline-none transition",
        "shadow-[0_8px_30px_rgba(15,23,42,0.06)]",
        "focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300",
        "hover:border-slate-300",
        disabled ? "opacity-60 cursor-not-allowed" : "",
      ].join(" ")}
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  disabled,
  rows = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      disabled={disabled}
      className={[
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-[15px] md:text-[16px] outline-none transition",
        "shadow-[0_8px_30px_rgba(15,23,42,0.06)]",
        "focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300",
        "hover:border-slate-300",
        disabled ? "opacity-60 cursor-not-allowed" : "",
      ].join(" ")}
    />
  );
}

function Select({
  value,
  onChange,
  disabled,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={[
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-[15px] md:text-[16px] outline-none transition",
        "shadow-[0_8px_30px_rgba(15,23,42,0.06)]",
        "focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300",
        "hover:border-slate-300",
        disabled ? "opacity-60 cursor-not-allowed" : "",
      ].join(" ")}
    >
      {children}
    </select>
  );
}

/* ===================== UPLOAD CARD ===================== */
function UploadCard({
  title,
  desc,
  accept,
  file,
  onPick,
  onClear,
  required,
}: {
  title: string;
  desc: string;
  accept: string;
  file: File | null | undefined;
  onPick: (f: File | null) => void;
  onClear: () => void;
  required?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] p-5">
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <FileText className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="font-extrabold text-slate-900">{title}</div>
            {required ? (
              <span className="text-[10px] font-extrabold text-rose-600 rounded-full bg-rose-50 border border-rose-200 px-2 py-0.5">
                WAJIB
              </span>
            ) : (
              <span className="text-[10px] font-extrabold text-slate-500 rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5">
                OPSIONAL
              </span>
            )}
          </div>

          <div className="text-sm text-slate-600 mt-1">{desc}</div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-extrabold text-white hover:bg-emerald-700 transition">
              Upload
              <input
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => onPick(e.target.files?.[0] ?? null)}
              />
            </label>

            {file ? (
              <button
                type="button"
                onClick={onClear}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-700 hover:bg-slate-50 transition"
              >
                <X className="h-4 w-4" />
                Hapus
              </button>
            ) : null}
          </div>

          <div className="mt-3 text-xs text-slate-600">
            <span className="font-extrabold text-slate-900">Status:</span>{" "}
            {fileLabel(file)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== MAIN ===================== */
export default function PPDBWizard() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<"next" | "back">("next");

  const [data, setData] = useState<FormData>(initialData);
  const [upload, setUpload] = useState<UploadState>(initialUpload);

  const [errors, setErrors] = useState<Errors>({});
  const [uploadErr, setUploadErr] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const steps = useMemo(
    () => [
      {
        title: "Data Diri",
        subtitle: "Informasi santri yang akan mendaftar",
        icon: <User className="h-4 w-4" />,
      },
      {
        title: "Orang Tua / Wali",
        subtitle: "Data keluarga & kontak yang bisa dihubungi",
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: "Akademik & Profil",
        subtitle: "Jenjang, asal sekolah, dan informasi tambahan",
        icon: <GraduationCap className="h-4 w-4" />,
      },
      {
        title: "Upload Berkas",
        subtitle: "Unggah foto santri dan dokumen wajib",
        icon: <UploadCloud className="h-4 w-4" />,
      },
      {
        title: "Finalisasi",
        subtitle: "Review data & berkas sebelum dikunci",
        icon: <CheckCircle2 className="h-4 w-4" />,
      },
    ],
    []
  );

  const setVal = <K extends keyof FormData>(key: K, v: FormData[K]) => {
    setData((p) => ({ ...p, [key]: v }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const setUp = <K extends keyof UploadState>(key: K, v: UploadState[K]) => {
    setUpload((p) => ({ ...p, [key]: v }));
    setUploadErr((p) => ({ ...p, [key]: "" }));
  };

  /* ===================== VALIDATE ===================== */
  const validateStep = (s: number) => {
    const e: Errors = {};

    if (s === 0) {
      if (!data.fullName.trim()) e.fullName = "Nama lengkap wajib diisi.";
      if (!isNikValid(data.nik)) e.nik = "NIK harus 16 digit angka.";
      if (!data.gender) e.gender = "Pilih jenis kelamin.";
      if (!data.birthPlace.trim()) e.birthPlace = "Tempat lahir wajib diisi.";
      if (!data.birthDate) e.birthDate = "Tanggal lahir wajib diisi.";
      if (!data.address.trim()) e.address = "Alamat wajib diisi.";
      if (!isPhoneValid(data.phone)) e.phone = "Nomor HP tidak valid.";
    }

    if (s === 1) {
      if (!data.fatherName.trim()) e.fatherName = "Nama ayah wajib diisi.";
      if (!data.fatherJob.trim()) e.fatherJob = "Pekerjaan ayah wajib diisi.";
      if (!isPhoneValid(data.fatherPhone))
        e.fatherPhone = "Nomor HP ayah tidak valid.";

      if (!data.motherName.trim()) e.motherName = "Nama ibu wajib diisi.";
      if (!data.motherJob.trim()) e.motherJob = "Pekerjaan ibu wajib diisi.";
      if (!isPhoneValid(data.motherPhone))
        e.motherPhone = "Nomor HP ibu tidak valid.";
    }

    if (s === 2) {
      if (!data.level) e.level = "Pilih jenjang (MTS/MA/SMK).";
      if (!data.originSchool.trim())
        e.originSchool = "Asal sekolah wajib diisi.";
      if (!data.hobby.trim()) e.hobby = "Hobi wajib diisi.";
      if (!data.dream.trim()) e.dream = "Cita-cita wajib diisi.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateUpload = () => {
    const e: any = {};
    if (!upload.photo) e.photo = "Foto santri wajib diupload.";
    if (!upload.kk) e.kk = "KK wajib diupload.";
    if (!upload.akte) e.akte = "Akte wajib diupload.";
    if (!upload.ijazah) e.ijazah = "Ijazah wajib diupload.";
    setUploadErr(e);
    return Object.keys(e).length === 0;
  };

  /* ===================== NAV ===================== */
  const next = () => {
    if (step <= 2) {
      if (!validateStep(step)) return;
    }
    if (step === 3) {
      if (!validateUpload()) return;
    }

    setDir("next");
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => {
    setDir("back");
    setStep((s) => Math.max(s - 1, 0));
  };

  /* ===================== FINAL SUBMIT ===================== */
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const finalize = async () => {
    const ok1 = validateStep(0);
    const ok2 = validateStep(1);
    const ok3 = validateStep(2);
    const ok4 = validateUpload();

    if (!ok1 || !ok2 || !ok3 || !ok4) {
      setStep(0);
      return;
    }

    setLoading(true);

    try {
      // ✅ ubah foto ke base64 agar bisa stringify
      const photoBase64 = upload.photo
        ? await fileToBase64(upload.photo)
        : null;

      const submission = {
        data: {
          ...data,
          createdAt: new Date().toISOString(),
          regNumber: `PPDB-${Date.now().toString().slice(-6)}`,
        },
        upload: {
          photo: photoBase64,
          kk: upload.kk ? upload.kk.name : null,
          akte: upload.akte ? upload.akte.name : null,
          ijazah: upload.ijazah ? upload.ijazah.name : null,
          rapor: upload.rapor ? upload.rapor.name : null,
        },
      };

      // ✅ test stringify dulu
      const json = JSON.stringify(submission);

      if (typeof window !== "undefined") {
        localStorage.setItem("ppdb_submission", json);
      }

      router.push("/ppdb/final");
    } catch (err) {
      console.error("FINALIZE ERROR:", err);
      alert("Terjadi error saat menyimpan data formulir, cek console.");
    } finally {
      setLoading(false);
    }
  };

  /* ===================== UI ===================== */
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white/90 backdrop-blur shadow-[0_22px_90px_rgba(15,23,42,0.10)] overflow-hidden">
      {/* HEADER */}
      <div className="p-6 md:p-7 border-b border-slate-200 bg-gradient-to-r from-emerald-50 via-white to-sky-50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-700 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Form Wizard PPDB
            </div>
            <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-slate-900">
              {steps[step].title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              {steps[step].subtitle}
            </p>
          </div>

          {/* desktop stepper */}
          <div className="hidden md:flex items-center gap-2">
            {steps.map((s, i) => {
              const active = i === step;
              const done = i < step;
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => {
                    if (i <= step) setStep(i);
                  }}
                  className={[
                    "flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-extrabold transition",
                    active
                      ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                      : done
                      ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      : "border-slate-200 bg-white/60 text-slate-400 cursor-not-allowed",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "h-7 w-7 rounded-full flex items-center justify-center",
                      active
                        ? "bg-emerald-600 text-white"
                        : done
                        ? "bg-slate-900 text-white"
                        : "bg-slate-200 text-slate-500",
                    ].join(" ")}
                  >
                    {done ? "✓" : i + 1}
                  </span>
                  {s.icon}
                </button>
              );
            })}
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mt-5 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-700"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* BODY */}
      <div className="p-6 md:p-8">
        <div>
          {/* ANIMATED STEP */}
          <div
            key={step}
            className={[
              "transition-all duration-500",
              dir === "next"
                ? "animate-[stepNext_.55s_cubic-bezier(.16,1,.3,1)]"
                : "animate-[stepBack_.55s_cubic-bezier(.16,1,.3,1)]",
            ].join(" ")}
          >
            {/* STEP 1 */}
            {step === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Nama Lengkap" error={errors.fullName}>
                  <Input
                    value={data.fullName}
                    onChange={(v) => setVal("fullName", v)}
                    placeholder="Nama lengkap sesuai KK"
                    disabled={loading}
                  />
                </Field>

                <Field label="NIK" hint="16 digit" error={errors.nik}>
                  <Input
                    value={data.nik}
                    onChange={(v) => setVal("nik", v.replace(/\D/g, ""))}
                    placeholder="Contoh: 3201xxxxxxxxxxxx"
                    disabled={loading}
                  />
                </Field>

                <Field label="Jenis Kelamin" error={errors.gender}>
                  <Select
                    value={data.gender}
                    onChange={(v) => setVal("gender", v as any)}
                    disabled={loading}
                  >
                    <option value="">Pilih</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </Select>
                </Field>

                <Field label="Nomor HP" error={errors.phone}>
                  <Input
                    value={data.phone}
                    onChange={(v) => setVal("phone", v)}
                    placeholder="08xxxxxxxxxx"
                    disabled={loading}
                  />
                </Field>

                <Field label="Tempat Lahir" error={errors.birthPlace}>
                  <Input
                    value={data.birthPlace}
                    onChange={(v) => setVal("birthPlace", v)}
                    placeholder="Contoh: Makassar"
                    disabled={loading}
                  />
                </Field>

                <Field label="Tanggal Lahir" error={errors.birthDate}>
                  <Input
                    value={data.birthDate}
                    onChange={(v) => setVal("birthDate", v)}
                    type="date"
                    disabled={loading}
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field label="Alamat Lengkap" error={errors.address}>
                    <Textarea
                      value={data.address}
                      onChange={(v) => setVal("address", v)}
                      placeholder="Alamat lengkap sesuai domisili"
                      disabled={loading}
                      rows={4}
                    />
                  </Field>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <div className="text-sm font-extrabold text-slate-900">
                    Data Ayah
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    Isi data orang tua dengan benar.
                  </p>
                </div>

                <Field label="Nama Ayah" error={errors.fatherName}>
                  <Input
                    value={data.fatherName}
                    onChange={(v) => setVal("fatherName", v)}
                    placeholder="Nama ayah"
                    disabled={loading}
                  />
                </Field>

                <Field label="Pekerjaan Ayah" error={errors.fatherJob}>
                  <Input
                    value={data.fatherJob}
                    onChange={(v) => setVal("fatherJob", v)}
                    placeholder="Pekerjaan ayah"
                    disabled={loading}
                  />
                </Field>

                <Field label="No HP Ayah" error={errors.fatherPhone}>
                  <Input
                    value={data.fatherPhone}
                    onChange={(v) => setVal("fatherPhone", v)}
                    placeholder="08xxxxxxxxxx"
                    disabled={loading}
                  />
                </Field>

                <div className="hidden md:block" />

                <div className="md:col-span-2 mt-2">
                  <div className="text-sm font-extrabold text-slate-900">
                    Data Ibu
                  </div>
                </div>

                <Field label="Nama Ibu" error={errors.motherName}>
                  <Input
                    value={data.motherName}
                    onChange={(v) => setVal("motherName", v)}
                    placeholder="Nama ibu"
                    disabled={loading}
                  />
                </Field>

                <Field label="Pekerjaan Ibu" error={errors.motherJob}>
                  <Input
                    value={data.motherJob}
                    onChange={(v) => setVal("motherJob", v)}
                    placeholder="Pekerjaan ibu"
                    disabled={loading}
                  />
                </Field>

                <Field label="No HP Ibu" error={errors.motherPhone}>
                  <Input
                    value={data.motherPhone}
                    onChange={(v) => setVal("motherPhone", v)}
                    placeholder="08xxxxxxxxxx"
                    disabled={loading}
                  />
                </Field>

                <div className="hidden md:block" />

                <div className="md:col-span-2 mt-2">
                  <div className="text-sm font-extrabold text-slate-900">
                    Data Wali (Opsional)
                  </div>
                </div>

                <Field label="Nama Wali">
                  <Input
                    value={data.guardianName}
                    onChange={(v) => setVal("guardianName", v)}
                    placeholder="Nama wali (optional)"
                    disabled={loading}
                  />
                </Field>

                <Field label="Hubungan Wali">
                  <Input
                    value={data.guardianRelation}
                    onChange={(v) => setVal("guardianRelation", v)}
                    placeholder="Contoh: Paman / Kakek"
                    disabled={loading}
                  />
                </Field>

                <Field label="No HP Wali">
                  <Input
                    value={data.guardianPhone}
                    onChange={(v) => setVal("guardianPhone", v)}
                    placeholder="08xxxxxxxxxx"
                    disabled={loading}
                  />
                </Field>
              </div>
            )}

            {/* STEP 3 */}
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Jenjang" error={errors.level}>
                  <Select
                    value={data.level}
                    onChange={(v) => setVal("level", v as any)}
                    disabled={loading}
                  >
                    <option value="">Pilih Jenjang</option>
                    <option value="MTS">MTS</option>
                    <option value="MA">MA</option>
                    <option value="SMK">SMK</option>
                  </Select>
                </Field>

                <Field label="Asal Sekolah" error={errors.originSchool}>
                  <Input
                    value={data.originSchool}
                    onChange={(v) => setVal("originSchool", v)}
                    placeholder="Nama sekolah asal"
                    disabled={loading}
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field label="Prestasi (Opsional)">
                    <Textarea
                      value={data.achievements}
                      onChange={(v) => setVal("achievements", v)}
                      placeholder="Contoh: Juara 1 MTQ tingkat kabupaten..."
                      disabled={loading}
                      rows={3}
                    />
                  </Field>
                </div>

                <Field label="Hobi" error={errors.hobby}>
                  <Input
                    value={data.hobby}
                    onChange={(v) => setVal("hobby", v)}
                    placeholder="Contoh: Membaca, Futsal"
                    disabled={loading}
                  />
                </Field>

                <Field label="Cita-cita" error={errors.dream}>
                  <Input
                    value={data.dream}
                    onChange={(v) => setVal("dream", v)}
                    placeholder="Contoh: Dokter"
                    disabled={loading}
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field label="Riwayat Penyakit (Opsional)">
                    <Textarea
                      value={data.diseaseHistory}
                      onChange={(v) => setVal("diseaseHistory", v)}
                      placeholder="Contoh: Asma, alergi makanan..."
                      disabled={loading}
                      rows={3}
                    />
                  </Field>
                </div>
              </div>
            )}

            {/* STEP 4 UPLOAD */}
            {step === 3 && (
              <div className="space-y-6">
                {/* PHOTO */}
                <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)]">
                  <div className="flex items-start md:items-center justify-between gap-3 flex-col md:flex-row">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-2xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center shadow-sm">
                          <ImgIcon className="h-4 w-4" />
                        </div>
                        <div className="text-sm font-extrabold text-slate-900">
                          Foto Santri
                        </div>
                        <span className="text-[10px] font-extrabold text-rose-600 rounded-full bg-rose-50 border border-rose-200 px-2 py-0.5">
                          WAJIB
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        Format JPG/PNG, disarankan 3x4.
                      </div>

                      {uploadErr.photo ? (
                        <div className="mt-2 text-xs font-semibold text-rose-600">
                          {uploadErr.photo}
                        </div>
                      ) : null}
                    </div>

                    <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-extrabold text-white hover:bg-emerald-700 transition">
                      Upload Foto
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) =>
                          setUp("photo", e.target.files?.[0] ?? null)
                        }
                      />
                    </label>
                  </div>

                  {upload.photo ? (
                    <div className="mt-5 flex items-center gap-4">
                      <div className="h-20 w-20 rounded-2xl border border-slate-200 bg-white overflow-hidden">
                        <img
                          src={URL.createObjectURL(upload.photo)}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-slate-900 truncate">
                          {upload.photo.name}
                        </div>
                        <div className="text-xs text-slate-600">
                          {(upload.photo.size / 1024).toFixed(0)} KB
                        </div>
                        <button
                          type="button"
                          onClick={() => setUp("photo", null)}
                          className="mt-2 text-xs font-extrabold text-rose-600 hover:text-rose-700"
                        >
                          Hapus Foto
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
                      <UploadCloud className="h-5 w-5 text-slate-400" />
                      Belum ada foto diupload.
                    </div>
                  )}
                </div>

                {/* DOCS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <UploadCard
                      title="Kartu Keluarga (KK)"
                      desc="Upload KK dalam format PDF/JPG."
                      accept=".pdf,.jpg,.jpeg,.png"
                      file={upload.kk}
                      required
                      onPick={(f) => setUp("kk", f)}
                      onClear={() => setUp("kk", null)}
                    />
                    {uploadErr.kk ? (
                      <div className="mt-2 text-xs font-semibold text-rose-600">
                        {uploadErr.kk}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <UploadCard
                      title="Akte Kelahiran"
                      desc="Upload akte dalam format PDF/JPG."
                      accept=".pdf,.jpg,.jpeg,.png"
                      file={upload.akte}
                      required
                      onPick={(f) => setUp("akte", f)}
                      onClear={() => setUp("akte", null)}
                    />
                    {uploadErr.akte ? (
                      <div className="mt-2 text-xs font-semibold text-rose-600">
                        {uploadErr.akte}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <UploadCard
                      title="Ijazah"
                      desc="Upload ijazah dalam format PDF/JPG."
                      accept=".pdf,.jpg,.jpeg,.png"
                      file={upload.ijazah}
                      required
                      onPick={(f) => setUp("ijazah", f)}
                      onClear={() => setUp("ijazah", null)}
                    />
                    {uploadErr.ijazah ? (
                      <div className="mt-2 text-xs font-semibold text-rose-600">
                        {uploadErr.ijazah}
                      </div>
                    ) : null}
                  </div>

                  <UploadCard
                    title="Rapor (Opsional)"
                    desc="Upload rapor jika tersedia."
                    accept=".pdf,.jpg,.jpeg,.png"
                    file={upload.rapor}
                    onPick={(f) => setUp("rapor", f)}
                    onClear={() => setUp("rapor", null)}
                  />
                </div>
              </div>
            )}

            {/* STEP 5 REVIEW */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-lg font-extrabold text-slate-900">
                        Review Data
                      </div>
                      <p className="mt-1 text-sm text-slate-600">
                        Pastikan semua data benar sebelum finalisasi.
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-xs font-extrabold text-slate-500">
                      <Eye className="h-4 w-4" />
                      Preview
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="font-extrabold text-slate-900">
                        Data Diri
                      </div>
                      <div className="mt-3 space-y-1 text-slate-700">
                        <div>
                          <b>Nama:</b> {data.fullName || "-"}
                        </div>
                        <div>
                          <b>NIK:</b> {data.nik || "-"}
                        </div>
                        <div>
                          <b>JK:</b> {data.gender || "-"}
                        </div>
                        <div>
                          <b>TTL:</b> {data.birthPlace || "-"},{" "}
                          {formatDate(data.birthDate)}
                        </div>
                        <div>
                          <b>HP:</b> {data.phone || "-"}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="font-extrabold text-slate-900">
                        Akademik
                      </div>
                      <div className="mt-3 space-y-1 text-slate-700">
                        <div>
                          <b>Jenjang:</b> {data.level || "-"}
                        </div>
                        <div>
                          <b>Asal Sekolah:</b> {data.originSchool || "-"}
                        </div>
                        <div>
                          <b>Hobi:</b> {data.hobby || "-"}
                        </div>
                        <div>
                          <b>Cita-cita:</b> {data.dream || "-"}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="font-extrabold text-slate-900">
                        Alamat
                      </div>
                      <div className="mt-2 text-slate-700">
                        {data.address || "-"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload Summary */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] p-6">
                  <div className="text-lg font-extrabold text-slate-900">
                    Review Berkas
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    Pastikan dokumen sudah lengkap.
                  </p>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <b>Foto:</b> {fileLabel(upload.photo)}
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <b>KK:</b> {fileLabel(upload.kk)}
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <b>Akte:</b> {fileLabel(upload.akte)}
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <b>Ijazah:</b> {fileLabel(upload.ijazah)}
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
                      <b>Rapor:</b> {fileLabel(upload.rapor)}
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
                  <div className="text-sm font-extrabold text-amber-800">
                    ⚠️ Catatan Finalisasi
                  </div>
                  <p className="mt-2 text-sm text-amber-800/90 leading-relaxed">
                    Setelah finalisasi, data akan terkunci dan formulir
                    pendaftaran akan bisa dicetak. Pastikan semua data & berkas
                    sudah benar.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-between">
            <button
              type="button"
              onClick={back}
              disabled={step === 0 || loading}
              className={[
                "inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-extrabold transition",
                step === 0 || loading
                  ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                  : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
              ].join(" ")}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={next}
                disabled={loading}
                className={[
                  "inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 text-white px-7 py-3.5 text-sm font-extrabold transition",
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-emerald-700",
                ].join(" ")}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={finalize}
                disabled={loading}
                className={[
                  "inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-7 py-3.5 text-sm font-extrabold transition",
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-slate-800",
                ].join(" ")}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Finalisasi...
                  </>
                ) : (
                  <>
                    Finalisasi & Cetak
                    <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ANIMATION KEYFRAMES */}
      <style jsx>{`
        @keyframes stepNext {
          from {
            opacity: 0;
            transform: translateX(16px) translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateX(0px) translateY(0px);
          }
        }
        @keyframes stepBack {
          from {
            opacity: 0;
            transform: translateX(-16px) translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateX(0px) translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}
