import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { trackEvent } from "@/lib/analytics";

const HeroSection = () => {
  const { ref: trustIndicatorsRef, inView: trustIndicatorsInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const handleCTAClick = () => {
    trackEvent("User Interaction", "trackHeroCTA", "Ver Productos");
  };
  
  return (
    <section id="inicio" className="relative pt-28 md:pt-32 pb-16 md:pb-24">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Equipo médico profesional" 
          className="w-full h-full object-cover"
          width="1920"
          height="1080"
        />
        <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
            Soluciones biomédicas <span className="text-accent">de calidad</span> para profesionales de la salud
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white text-opacity-90">
            En VascularMed nos centramos en las necesidades reales de médicos y pacientes, ofreciendo dispositivos innovadores para cardiología intervencionista.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="#productos" 
              className="bg-accent text-white py-3 px-8 rounded-full font-heading font-semibold text-lg hover:bg-accent-light transition-colors inline-flex items-center justify-center min-h-[60px]"
              onClick={handleCTAClick}
            >
              Ver Productos
              <span className="material-icons ml-2">arrow_forward</span>
            </a>
            <a 
              href="#contacto" 
              className="bg-white text-primary py-3 px-8 rounded-full font-heading font-semibold text-lg hover:bg-neutral-100 transition-colors inline-flex items-center justify-center min-h-[60px]"
            >
              Contactarnos
            </a>
          </div>
        </div>
      </div>
      
      {/* Trust Indicators */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-12 md:mt-16">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div ref={trustIndicatorsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <div className={`flex items-center space-x-4 fade-in ${trustIndicatorsInView ? 'visible' : ''}`}>
              <div className="bg-primary bg-opacity-10 rounded-full p-3">
                <span className="material-icons text-white text-2xl">medical_services</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-neutral-900">Experiencia Médica</h3>
                <p className="text-neutral-600 text-sm">10+ años de trayectoria profesional</p>
              </div>
            </div>
            
            <div className={`flex items-center space-x-4 fade-in ${trustIndicatorsInView ? 'visible' : ''}`} style={{transitionDelay: '0.2s'}}>
              <div className="bg-primary bg-opacity-10 rounded-full p-3">
                <span className="material-icons text-white text-2xl">verified</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-neutral-900">Calidad Certificada</h3>
                <p className="text-neutral-600 text-sm">Dispositivos con estándares internacionales</p>
              </div>
            </div>
            
            <div className={`flex items-center space-x-4 fade-in ${trustIndicatorsInView ? 'visible' : ''}`} style={{transitionDelay: '0.4s'}}>
              <div className="bg-primary bg-opacity-10 rounded-full p-3">
                <span className="material-icons text-white text-2xl">support_agent</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-neutral-900">Soporte Clínico</h3>
                <p className="text-neutral-600 text-sm">Atención personalizada y especializada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
