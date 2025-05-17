import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const AboutSection = () => {
  const { ref: headingRef, inView: headingInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { ref: contentRef, inView: contentInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { ref: imageRef, inView: imageInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <section id="nosotros" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className={`text-center mb-12 md:mb-16 fade-in ${headingInView ? 'visible' : ''}`}>
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">Sobre VascularMed</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto text-lg">Somos un equipo de profesionales dedicados a mejorar la atención médica a través de soluciones biomédicas innovadoras y centradas en el paciente.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div ref={contentRef} className={`order-2 lg:order-1 fade-in ${contentInView ? 'visible' : ''}`}>
            <h3 className="font-heading font-semibold text-xl md:text-2xl text-primary mb-4">Nuestra Misión</h3>
            <p className="text-neutral-700 mb-6">
              "Proveer soluciones biomédicas de calidad, centrándonos en las necesidades reales de médicos y pacientes, con un enfoque humano e integral."
            </p>
            
            <h3 className="font-heading font-semibold text-xl md:text-2xl text-primary mb-4">Nuestra Visión</h3>
            <p className="text-neutral-700 mb-6">
              "Ser referentes en la distribución de dispositivos biomédicos, caracterizándonos por la confianza, precisión y calidad en cada interacción."
            </p>
            
            <div className="mt-8">
              <h4 className="font-heading font-semibold text-lg text-neutral-800 mb-4">Nuestros Valores</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="material-icons text-primary mt-0.5">check_circle</span>
                  <div>
                    <h5 className="font-heading font-medium text-neutral-800">Innovación con propósito</h5>
                    <p className="text-neutral-600 text-sm">Tecnología que resuelve necesidades reales</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="material-icons text-primary mt-0.5">check_circle</span>
                  <div>
                    <h5 className="font-heading font-medium text-neutral-800">Excelencia científica</h5>
                    <p className="text-neutral-600 text-sm">Rigor y precisión en cada solución</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="material-icons text-primary mt-0.5">check_circle</span>
                  <div>
                    <h5 className="font-heading font-medium text-neutral-800">Humanización</h5>
                    <p className="text-neutral-600 text-sm">Tecnología centrada en el paciente</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="material-icons text-primary mt-0.5">check_circle</span>
                  <div>
                    <h5 className="font-heading font-medium text-neutral-800">Integridad</h5>
                    <p className="text-neutral-600 text-sm">Transparencia y ética en cada acción</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="material-icons text-primary mt-0.5">check_circle</span>
                  <div>
                    <h5 className="font-heading font-medium text-neutral-800">Trabajo en equipo</h5>
                    <p className="text-neutral-600 text-sm">Colaboración para mejores resultados</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="material-icons text-primary mt-0.5">check_circle</span>
                  <div>
                    <h5 className="font-heading font-medium text-neutral-800">Sostenibilidad</h5>
                    <p className="text-neutral-600 text-sm">Compromiso con el futuro de la salud</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div ref={imageRef} className={`order-1 lg:order-2 fade-in ${imageInView ? 'visible' : ''}`}>
            <img 
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Médicos trabajando en sala de hemodinamia" 
              className="rounded-lg shadow-lg w-full h-auto"
              loading="lazy"
              width="800"
              height="600"
            />
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-neutral-50 p-5 rounded-lg shadow-sm text-center">
                <h5 className="font-heading font-bold text-3xl text-primary mb-2">+ 10</h5>
                <p className="text-neutral-700 text-sm">Años de experiencia en el sector</p>
              </div>
              <div className="bg-neutral-50 p-5 rounded-lg shadow-sm text-center">
                <h5 className="font-heading font-bold text-3xl text-primary mb-2">+ 100</h5>
                <p className="text-neutral-700 text-sm">Médicos confían en nuestras soluciones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
