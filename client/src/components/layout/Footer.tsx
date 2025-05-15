import Logo from "@/components/atoms/Logo";
import SocialIcon from "@/components/atoms/SocialIcon";
import { trackEvent } from "@/lib/analytics";

const Footer = () => {
  const handleSocialClick = (platform: string) => {
    trackEvent("User Interaction", "trackSocialClick", platform);
  };
  
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-primary font-heading font-bold text-xl">VM</span>
              </div>
              <span className="text-white font-heading font-bold text-xl">VascularMed</span>
            </div>
            <p className="text-neutral-400 mb-6 max-w-md">
              Proveemos soluciones biomédicas de calidad, centrándonos en las necesidades reales de médicos y pacientes, con un enfoque humano e integral.
            </p>
            <div className="flex space-x-4">
              <SocialIcon 
                type="language" 
                onClick={() => handleSocialClick("Website")} 
                ariaLabel="Website" 
                className="text-neutral-400 hover:text-white transition-colors" 
              />
              <SocialIcon 
                type="linkedin" 
                onClick={() => handleSocialClick("LinkedIn")} 
                ariaLabel="LinkedIn" 
                className="text-neutral-400 hover:text-white transition-colors" 
              />
              <SocialIcon 
                type="whatsapp" 
                onClick={() => handleSocialClick("WhatsApp")} 
                ariaLabel="WhatsApp" 
                className="text-neutral-400 hover:text-white transition-colors" 
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-heading font-semibold text-lg mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-neutral-400 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="text-neutral-400 hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#productos" className="text-neutral-400 hover:text-white transition-colors">Productos</a></li>
              <li><a href="#contacto" className="text-neutral-400 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-heading font-semibold text-lg mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li><a href="#productos" className="text-neutral-400 hover:text-white transition-colors">Cardiología Intervencionista</a></li>
              <li><a href="#nosotros" className="text-neutral-400 hover:text-white transition-colors">Soporte Clínico</a></li>
              <li><a href="#nosotros" className="text-neutral-400 hover:text-white transition-colors">Capacitación Profesional</a></li>
              <li><a href="#contacto" className="text-neutral-400 hover:text-white transition-colors">Asesoramiento Técnico</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-heading font-semibold text-lg mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="material-icons text-neutral-400 mr-2 mt-1">location_on</span>
                <span className="text-neutral-400">Necochea 8961, Santa Fe, Argentina</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-neutral-400 mr-2 mt-1">email</span>
                <a href="mailto:cotizaciones@vascularmed.com.ar" className="text-neutral-400 hover:text-white transition-colors">
                  cotizaciones@vascularmed.com.ar
                </a>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-neutral-400 mr-2 mt-1">phone</span>
                <a href="tel:+5493425661897" className="text-neutral-400 hover:text-white transition-colors">
                  +54 9 3425 66-1897
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} VascularMed. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Términos y condiciones</a>
              <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Política de privacidad</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
