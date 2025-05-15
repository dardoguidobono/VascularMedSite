import { useState, useEffect, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import TestimonialCard from "@/components/molecules/TestimonialCard";
import StatCard from "@/components/molecules/StatCard";

// Testimonial data
const testimonials = [
  {
    id: 1,
    text: "La calidad de los productos de VascularMed es excepcional. El soporte técnico y la atención personalizada han hecho una gran diferencia en mi práctica diaria.",
    name: "Dr. Martín Rodríguez",
    title: "Cardiólogo Intervencionista",
    rating: 5
  },
  {
    id: 2,
    text: "Los dispositivos de VascularMed se han convertido en parte esencial de nuestro trabajo diario. Su equipo siempre está disponible para resolver cualquier duda técnica.",
    name: "Dra. Laura Méndez",
    title: "Directora Unidad Cardiovascular",
    rating: 5
  },
  {
    id: 3,
    text: "La capacitación y el soporte clínico que ofrece VascularMed marcan una diferencia significativa. Su enfoque humano y profesional es exactamente lo que nuestro centro necesitaba.",
    name: "Dr. Carlos Sánchez",
    title: "Jefe de Cardiología",
    rating: 4.5
  }
];

// Stats data
const stats = [
  { id: 1, value: "98%", label: "Tasa de satisfacción" },
  { id: 2, value: "200+", label: "Profesionales confían en nosotros" },
  { id: 3, value: "50+", label: "Centros médicos" },
  { id: 4, value: "10+", label: "Años de experiencia" }
];

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const { ref: headingRef, inView: headingInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { ref: testimonialsRef, inView: testimonialsInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { ref: statsRef, inView: statsInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Update slides per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const maxIndex = Math.max(0, testimonials.length - slidesPerView);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, maxIndex)));
  };
  
  const updateSliderPosition = () => {
    if (sliderRef.current) {
      const slideWidth = 100 / slidesPerView;
      sliderRef.current.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    }
  };
  
  useEffect(() => {
    updateSliderPosition();
  }, [currentSlide, slidesPerView]);
  
  return (
    <section className="py-16 md:py-24 bg-primary bg-opacity-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className={`text-center mb-12 md:mb-16 fade-in ${headingInView ? 'visible' : ''}`}>
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">Lo Que Dicen Nuestros Clientes</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto text-lg">Profesionales de la salud que confían en nuestros productos y servicios.</p>
        </div>
        
        <div ref={testimonialsRef} className="testimonial-carousel relative">
          <div className="overflow-hidden">
            <div 
              ref={sliderRef} 
              className="testimonial-slider flex transition-transform duration-500"
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className={`testimonial-slide w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4 fade-in ${testimonialsInView ? 'visible' : ''}`}
                  style={{transitionDelay: `${index * 0.2}s`}}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button 
                key={index}
                type="button" 
                className={`testimonial-dot w-3 h-3 rounded-full bg-primary ${index === currentSlide ? 'bg-opacity-100' : 'bg-opacity-30'}`} 
                aria-label={`Testimonio ${index + 1}`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
          
          <button 
            type="button" 
            className="absolute top-1/2 -translate-y-1/2 left-0 md:left-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 focus:outline-none" 
            aria-label="Testimonio anterior"
            onClick={() => goToSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
          >
            <span className="material-icons">chevron_left</span>
          </button>
          
          <button 
            type="button" 
            className="absolute top-1/2 -translate-y-1/2 right-0 md:right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 focus:outline-none" 
            aria-label="Testimonio siguiente"
            onClick={() => goToSlide(currentSlide + 1)}
            disabled={currentSlide === maxIndex}
          >
            <span className="material-icons">chevron_right</span>
          </button>
        </div>
        
        <div ref={statsRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className={`fade-in ${statsInView ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <StatCard value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
