import { trackEvent } from "@/lib/analytics";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, category, description, image } = product;
  
  const handleRequestInfo = () => {
    trackEvent("User Interaction", "trackProductInterest", name);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
      <div className="img-loading-container h-48">
        <img 
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
          loading="lazy"
          width="600"
          height="400"
          onLoad={(e) => e.currentTarget.classList.add('img-loaded')}
        />
      </div>
      <div className="p-6">
        <span className="inline-block py-1 px-2 rounded bg-primary-light bg-opacity-10 text-primary text-xs font-medium tracking-widest mb-2">
          {category}
        </span>
        <h3 className="font-heading font-semibold text-xl text-neutral-900 mb-2">{name}</h3>
        <p className="text-neutral-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <a 
            href="#contacto" 
            className="text-primary font-medium hover:text-primary-dark transition-colors inline-flex items-center"
            onClick={handleRequestInfo}
          >
            Solicitar información
            <span className="material-icons text-sm ml-1">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
