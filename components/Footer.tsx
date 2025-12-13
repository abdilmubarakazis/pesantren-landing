import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";

const quickLinksLeft = [
  { label: "Home", href: "#" },
  { label: "Ekskul", href: "#ekskul" },
  { label: "BUMP", href: "#bump" },
  { label: "Alumni", href: "#alumni" },
  { label: "FAQ", href: "#faq" },
];

const quickLinksRight = [
  { label: "Profile", href: "#profil" },
  { label: "Prestasi", href: "#prestasi" },
  { label: "Kabar Sulhas", href: "#kabar" },
  { label: "PPDB", href: "#ppdb" },
  { label: "Kontak", href: "#kontak" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* LEFT */}
          <div className="lg:col-span-5">
            <div className="flex items-start gap-4">
              {/* Logo bulat */}
              <div className="h-20 w-14 rounded-full bg-backdrop-blur-xs-500 overflow-hidden flex items-center justify-center">
                <Image
                  src="/images/logopesantren.png"
                  alt="Logo"
                  width={80}
                  height={80}
                />
              </div>

              <div>
                <div className="text-xl font-bold leading-tight">
                  Pesantren Sultan <br /> Hasanuddin
                </div>
                <div className="text-sm text-white/70">
                  Pondok Pesantren Modern
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-6 text-white/80">
              Membentuk generasi Qurani yang berakhlak mulia, berwawasan luas,
              dan siap menghadapi tantangan zaman dengan ilmu dan iman.
            </p>

            <div className="mt-6 space-y-3 text-sm text-white/85">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-amber-400" />
                <div>
                  Jl. Poros Limbung, Kalebajeng, Kec. Bajeng, Kabupaten Gowa,
                  Sulawesi Selatan 92152
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-amber-400" />
                <div>(0411) 123-4567</div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-amber-400" />
                <div>info@sultanhasanuddin.sch.id</div>
              </div>
            </div>
          </div>

          {/* MIDDLE */}
          <div className="lg:col-span-4">
            <div className="text-lg font-bold">Tautan Cepat</div>

            <div className="mt-5 grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-white/80">
              <ul className="space-y-2">
                {quickLinksLeft.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>

              <ul className="space-y-2">
                {quickLinksRight.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <div className="text-lg font-bold">Ikuti Kami</div>

              <div className="mt-4 flex items-center gap-3">
                <SocialCircle
                  href="#"
                  label="Facebook"
                  icon={<Facebook className="h-5 w-5" />}
                />
                <SocialCircle
                  href="#"
                  label="Instagram"
                  icon={<Instagram className="h-5 w-5" />}
                />
                <SocialCircle
                  href="#"
                  label="YouTube"
                  icon={<Youtube className="h-5 w-5" />}
                />
                <SocialCircle
                  href="#"
                  label="Twitter"
                  icon={<Twitter className="h-5 w-5" />}
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-3">
            <div className="text-lg font-bold">Lokasi Kami</div>

            <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <iframe
                title="Maps Pesantren Sultan Hasanuddin"
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Pesantren%20Sultan%20Hasanuddin%20Gowa%20Sulawesi%20Selatan&z=15&output=embed"
              />
            </div>
          </div>
        </div>

        {/* bottom line */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-white/60">
            © {new Date().getFullYear()} Pesantren Sultan Hasanuddin. All rights
            reserved.
          </div>

          <div className="text-xs text-white/60 md:text-right">
            {/* بسم الله الرحمن الرحيم */}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialCircle({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center border border-white/10 hover:bg-white/15 transition"
    >
      {icon}
    </a>
  );
}
