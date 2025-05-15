import { useState, useEffect } from "react";
import { Link } from "wouter";
import Logo from "@/components/atoms/Logo";
import { trackEvent } from "@/lib/analytics";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };
  
  const handleCtaClick = () => {
    trackEvent("User Interaction", "trackCTA", "Solicitar Cotización");
  };
  
  return (
    <header className={`fixed w-full bg-white bg-opacity-95 z-50 transition-all duration-300 
      ${isScrolled ? "shadow-md py-2" : "py-3 md:py-4"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#inicio" className="flex items-center space-x-2" aria-label="VascularMed Home">
            <Logo />
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="font-heading font-medium text-neutral-800 hover:text-primary transition-colors">
              Inicio
            </a>
            <a href="#nosotros" className="font-heading font-medium text-neutral-800 hover:text-primary transition-colors">
              Nosotros
            </a>
            <a href="#productos" className="font-heading font-medium text-neutral-800 hover:text-primary transition-colors">
              Productos
            </a>
            <a href="#contacto" className="font-heading font-medium text-neutral-800 hover:text-primary transition-colors">
              Contacto
            </a>
            <a 
              href="#contacto" 
              className="bg-accent text-white py-2 px-6 rounded-full font-heading font-semibold text-sm hover:bg-accent-dark transition-colors"
              onClick={handleCtaClick}
            >
              Solicitar Cotización
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            type="button" 
            className="md:hidden text-neutral-800" 
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="material-icons">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden bg-white fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button type="button" className="text-neutral-800" aria-label="Close menu" onClick={closeMenu}>
            <span className="material-icons">close</span>
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-6 pt-10">
          <a 
            href="#inicio" 
            className="font-heading font-medium text-xl text-neutral-800 hover:text-primary transition-colors"
            onClick={closeMenu}
          >
            Inicio
          </a>
          <a 
            href="#nosotros" 
            className="font-heading font-medium text-xl text-neutral-800 hover:text-primary transition-colors"
            onClick={closeMenu}
          >
            Nosotros
          </a>
          <a 
            href="#productos" 
            className="font-heading font-medium text-xl text-neutral-800 hover:text-primary transition-colors"
            onClick={closeMenu}
          >
            Productos
          </a>
          <a 
            href="#contacto" 
            className="font-heading font-medium text-xl text-neutral-800 hover:text-primary transition-colors"
            onClick={closeMenu}
          >
            Contacto
          </a>
          <a 
            href="#contacto" 
            className="mt-8 bg-accent text-white py-3 px-8 rounded-full font-heading font-semibold text-base hover:bg-accent-dark transition-colors"
            onClick={() => {
              closeMenu();
              handleCtaClick();
            }}
          >
            Solicitar Cotización
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
