import { useState, useEffect } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <button 
      id="backToTop" 
      className={`fixed bottom-6 right-6 bg-primary text-white rounded-full p-3 shadow-lg z-40
        transform transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      aria-label="Volver arriba"
      onClick={scrollToTop}
    >
      <span className="material-icons">keyboard_arrow_up</span>
    </button>
  );
};

export default BackToTop;
