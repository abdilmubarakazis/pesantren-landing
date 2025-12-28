import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">
      {/* HERO IMAGE */}
      <div className="relative h-[260px] sm:h-[320px] md:h-[420px] w-full">
        <Image
          src="/images/hero.jpg"
          alt="Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/35 to-transparent" />
      </div>

      <div className="container-page px-4 md:px-0">
        {/* HERO CONTENT */}
        <div className="-mt-24 sm:-mt-32 md:-mt-44 grid gap-6 md:grid-cols-12">
          {/* LEFT CARD */}
          <div className="md:col-span-7 rounded-xl bg-white/95 shadow-lg border p-5 sm:p-6">
            <div className="text-xl sm:text-2xl font-semibold text-slate-900">
              Pesantren <span className="text-emerald-600">Nama</span>
            </div>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Membangun generasi beradab, berilmu, dan berakhlak.
            </p>

            {/* BUTTONS */}
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#profil"
                className="rounded-md bg-emerald-600 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Lihat Profil
              </a>
              <a
                href="#ppdb"
                className="rounded-md border border-emerald-600 px-4 sm:px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                PPDB
              </a>
              <a
                href="https://wa.me/6280000000000"
                className="rounded-md bg-slate-900 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                WhatsApp
              </a>
            </div>

            {/* STATS */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-emerald-50 p-3">
                <div className="text-lg font-bold text-emerald-700">24+</div>
                <div className="text-xs text-slate-600">Program</div>
              </div>
              <div className="rounded-lg bg-emerald-50 p-3">
                <div className="text-lg font-bold text-emerald-700">10+</div>
                <div className="text-xs text-slate-600">Tahun</div>
              </div>
              <div className="rounded-lg bg-emerald-50 p-3 col-span-2 sm:col-span-1">
                <div className="text-lg font-bold text-emerald-700">1000+</div>
                <div className="text-xs text-slate-600">Santri</div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="md:col-span-5">
            <div className="rounded-xl overflow-hidden shadow-lg border bg-white">
              <div className="p-4 font-semibold text-slate-900">
                Pimpinan & Tokoh
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 pt-0">
                <div className="rounded-lg overflow-hidden border">
                  <Image
                    src="/images/tokoh-1.jpg"
                    alt="Tokoh 1"
                    width={400}
                    height={400}
                    className="h-28 sm:h-36 md:h-44 w-full object-cover"
                  />
                </div>

                <div className="rounded-lg overflow-hidden border">
                  <Image
                    src="/images/tokoh-2.jpg"
                    alt="Tokoh 2"
                    width={400}
                    height={400}
                    className="h-28 sm:h-36 md:h-44 w-full object-cover"
                  />
                </div>

                <div className="rounded-lg overflow-hidden border col-span-2">
                  <Image
                    src="/images/tokoh-3.jpg"
                    alt="Tokoh 3"
                    width={800}
                    height={400}
                    className="h-24 sm:h-32 md:h-40 w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-10" />
      </div>
    </section>
  );
}
