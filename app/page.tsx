import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Benefits from "../components/Benefits";
import FAQ from "../components/FAQ";
import About from "../components/About";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <FAQ />
      <About />
      <CallToAction />
      <Footer />
    </main>
  );
}
