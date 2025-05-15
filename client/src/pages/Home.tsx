import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaSection from "@/components/sections/CtaSection";
import ContactSection from "@/components/sections/ContactSection";
import BackToTop from "@/components/atoms/BackToTop";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

const Home = () => {
  useEffect(() => {
    // Track page view
    trackPageView();
    
    // Set page metadata
    document.title = "VascularMed | Soluciones Biomédicas de Calidad";
  }, []);
  
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <TestimonialsSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Home;
