interface Testimonial {
  id: number;
  text: string;
  name: string;
  title: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const { text, name, title, rating } = testimonial;
  
  // Generate star rating
  const generateStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`star-${i}`} className="material-icons">star</span>
      );
    }
    
    // Half star if needed
    if (hasHalfStar) {
      stars.push(
        <span key="half-star" className="material-icons">star_half</span>
      );
    }
    
    // Empty stars to fill to 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="material-icons">star_border</span>
      );
    }
    
    return stars;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center space-x-1 text-yellow-400 mb-4">
        {generateStars()}
      </div>
      <p className="text-neutral-700 mb-6 italic flex-grow">"{text}"</p>
      <div className="flex items-center mt-auto">
        <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center mr-4">
          <span className="material-icons text-neutral-500">person</span>
        </div>
        <div>
          <h4 className="font-heading font-medium text-neutral-900">{name}</h4>
          <p className="text-neutral-500 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
