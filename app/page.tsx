import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import Testimoni from "@/components/Testimoni";
import JoinStats from "@/components/JoinStats";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import AuthCard from "@/components/AuthStack";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* TOP / HERO */}
      <section id="top">
        <HeroSlider />
      </section>

      {/* PROFIL */}
      <section id="profil">
        <Testimoni />
      </section>

      {/* EKSKUL */}
      <section id="ekskul">
        <JoinStats />
      </section>

      {/* FAQ */}
      <section id="faq">
        <FAQSection />
      </section>

      {/* FOOTER */}
      <section id="footer">
        <Footer />
      </section>
    </main>
  );
}
