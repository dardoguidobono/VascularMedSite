import { trackEvent } from "@/lib/analytics";

const WhatsAppFloat = () => {
  const handleClick = () => {
    trackEvent("User Interaction", "trackWhatsAppFloat", "WhatsApp Float Button");
  };

  return (
    <a
      href="https://wa.me/5493425661897"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 w-16 h-16 flex items-center justify-center rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <span className="material-icons text-2xl">chat</span>
    </a>
  );
};

export default WhatsAppFloat;