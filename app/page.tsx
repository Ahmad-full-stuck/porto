import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Trust from "@/components/Trust";
import Demo from "@/components/Demo";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Trust />
        <Demo />
        <Testimonials />
        <Pricing />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
