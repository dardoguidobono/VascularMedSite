import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import ProductCard from "@/components/molecules/ProductCard";
import { trackEvent } from "@/lib/analytics";

// Product data
const products = [
  {
    id: 1,
    name: "Catéteres Guía Premium",
    category: "CARDIOLOGÍA",
    description: "Diseñados para proporcionar un soporte excepcional y navegabilidad superior en los procedimientos de intervención coronaria.",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 2,
    name: "Sistema de Diagnóstico Avanzado",
    category: "DIAGNÓSTICO",
    description: "Equipos de última generación para diagnóstico preciso en cardiología intervencionista con resultados inmediatos.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 3,
    name: "Stents de Nueva Generación",
    category: "INTERVENCIÓN",
    description: "Stents biocompatibles con tecnología avanzada para mejorar los resultados clínicos y reducir las complicaciones.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  }
];

const ProductsSection = () => {
  const { ref: headingRef, inView: headingInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { ref: productGridRef, inView: productGridInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { ref: ctaRef, inView: ctaInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const handleCtaClick = () => {
    trackEvent("User Interaction", "trackProductsCTA", "Solicitar catálogo completo");
  };
  
  return (
    <section id="productos" className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className={`text-center mb-12 md:mb-16 fade-in ${headingInView ? 'visible' : ''}`}>
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">Nuestros Productos</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto text-lg">Ofrecemos soluciones innovadoras de cardiología intervencionista con la más alta calidad y respaldo científico.</p>
        </div>
        
        <div ref={productGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className={`fade-in ${productGridInView ? 'visible' : ''}`} 
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div ref={ctaRef} className={`text-center mt-12 fade-in ${ctaInView ? 'visible' : ''}`}>
          <a 
            href="#contacto" 
            className="bg-primary text-white py-3 px-8 rounded-full font-heading font-semibold text-lg hover:bg-primary-dark transition-colors inline-flex items-center justify-center min-h-[60px]"
            onClick={handleCtaClick}
          >
            Solicitar catálogo completo
            <span className="material-icons ml-2">menu_book</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
