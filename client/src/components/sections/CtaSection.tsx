import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { trackEvent } from "@/lib/analytics";

const CtaSection = () => {
  const { ref, inView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const handleCtaClick = () => {
    trackEvent("User Interaction", "trackCTASection", "Solicitar una consulta");
  };
  
  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-primary-gradient"></div>
      
      {/* Abstract medical pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white transform translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`max-w-3xl mx-auto text-center text-white fade-in ${inView ? 'visible' : ''}`}>
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl mb-6">¿Necesita soluciones biomédicas de calidad?</h2>
          <p className="text-white text-opacity-90 text-lg mb-8">
            Contáctese con nuestro equipo de especialistas para recibir asesoramiento personalizado y descubrir cómo nuestros productos pueden mejorar su práctica clínica.
          </p>
          <a 
            href="#contacto" 
            className="bg-white text-primary py-3 px-8 rounded-full font-heading font-semibold text-lg hover:bg-neutral-100 transition-colors inline-flex items-center justify-center min-h-[60px]"
            onClick={handleCtaClick}
          >
            Solicitar una consulta
            <span className="material-icons ml-2">headset_mic</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
