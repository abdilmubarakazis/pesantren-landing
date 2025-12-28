"use client";

import { useRef } from "react";
import { UploadCloud, Image as ImgIcon, FileText, X } from "lucide-react";

type UploadState = {
  photo?: File | null;
  kk?: File | null;
  akte?: File | null;
  ijazah?: File | null;
  rapor?: File | null;
};

export default function PPDBUpload({
  value,
  onChange,
}: {
  value: UploadState;
  onChange: (v: UploadState) => void;
}) {
  const photoRef = useRef<HTMLInputElement | null>(null);

  const pick = (key: keyof UploadState, file: File | null) => {
    onChange({ ...value, [key]: file });
  };

  const FileCard = ({
    label,
    desc,
    icon,
    file,
    onPick,
    onClear,
    accept = ".pdf,.jpg,.jpeg,.png",
  }: {
    label: string;
    desc: string;
    icon: React.ReactNode;
    file: File | null | undefined;
    onPick: (f: File | null) => void;
    onClear: () => void;
    accept?: string;
  }) => (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] p-5">
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-extrabold text-slate-900">{label}</div>
          <div className="text-sm text-slate-600">{desc}</div>

          <div className="mt-4 flex items-center gap-2">
            <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 transition">
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
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                <X className="h-4 w-4" />
                Hapus
              </button>
            ) : null}
          </div>

          {file ? (
            <div className="mt-3 text-xs text-slate-600">
              <span className="font-bold text-slate-900">File:</span>{" "}
              {file.name}
            </div>
          ) : (
            <div className="mt-3 text-xs text-slate-500">
              Belum ada file dipilih.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* PHOTO */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold text-slate-900">
              Foto Santri
            </div>
            <div className="text-sm text-slate-600">
              Format JPG/PNG, disarankan 3x4.
            </div>
          </div>
          <button
            type="button"
            onClick={() => photoRef.current?.click()}
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-extrabold text-white hover:bg-emerald-700 transition"
          >
            Upload Foto
          </button>
          <input
            ref={photoRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => pick("photo", e.target.files?.[0] ?? null)}
          />
        </div>

        {value.photo ? (
          <div className="mt-5 flex items-center gap-4">
            <div className="h-20 w-20 rounded-2xl border border-slate-200 bg-white flex items-center justify-center overflow-hidden">
              {/* Preview */}
              <img
                src={URL.createObjectURL(value.photo)}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="text-sm font-extrabold text-slate-900 truncate">
                {value.photo.name}
              </div>
              <div className="text-xs text-slate-600">
                {(value.photo.size / 1024).toFixed(0)} KB
              </div>
              <button
                type="button"
                onClick={() => pick("photo", null)}
                className="mt-2 text-xs font-bold text-rose-600 hover:text-rose-700"
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

      {/* DOCUMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FileCard
          label="Kartu Keluarga (KK)"
          desc="Upload KK dalam format PDF/JPG."
          icon={<FileText className="h-5 w-5" />}
          file={value.kk}
          onPick={(f) => pick("kk", f)}
          onClear={() => pick("kk", null)}
        />

        <FileCard
          label="Akte Kelahiran"
          desc="Upload akte dalam format PDF/JPG."
          icon={<FileText className="h-5 w-5" />}
          file={value.akte}
          onPick={(f) => pick("akte", f)}
          onClear={() => pick("akte", null)}
        />

        <FileCard
          label="Ijazah"
          desc="Upload ijazah dalam format PDF/JPG."
          icon={<FileText className="h-5 w-5" />}
          file={value.ijazah}
          onPick={(f) => pick("ijazah", f)}
          onClear={() => pick("ijazah", null)}
        />

        <FileCard
          label="Rapor (Opsional)"
          desc="Upload rapor jika tersedia."
          icon={<FileText className="h-5 w-5" />}
          file={value.rapor}
          onPick={(f) => pick("rapor", f)}
          onClear={() => pick("rapor", null)}
        />
      </div>
    </div>
  );
}
