import { LangProvider } from "@/components/LangProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SoilAnalysis from "@/components/SoilAnalysis";
import CropRecommendation from "@/components/CropRecommendation";
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main>
          <Hero />
          <About />
          <SoilAnalysis />
          <CropRecommendation />
          <HowItWorks />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}

export default App;
