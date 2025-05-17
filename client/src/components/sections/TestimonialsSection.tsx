import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

// Lista de instituciones que confían en VascularMed
const partners = [
  "OSDE", 
  "IAPOS", 
  "PAMI", 
  "Jerarquicos", 
  "IOSFA", 
  "ICV San Geronimo", 
  "Udic Terapéutica Endovasvular Percutanea", 
  "Sanatorio La Entrerriana", 
  "Clínica Modelo SA"
];

const TestimonialsSection = () => {
  const { ref: headingRef, inView: headingInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { ref: partnersRef, inView: partnersInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <section className="py-16 md:py-24 bg-primary bg-opacity-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className={`text-center mb-12 md:mb-16 fade-in ${headingInView ? 'visible' : ''}`}>
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">Confían en Nosotros</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto text-lg">Instituciones y centros médicos que respaldan nuestra calidad y servicio.</p>
        </div>
        
        <div ref={partnersRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg shadow-md p-6 flex items-center justify-center fade-in ${partnersInView ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <span className="material-icons text-white text-2xl">business</span>
                </div>
                <h4 className="font-heading font-semibold text-neutral-900 text-lg">{partner}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
