interface SocialIconProps {
  type: string;
  onClick?: () => void;
  className?: string;
  ariaLabel: string;
  bgColor?: string;
}

const SocialIcon = ({ type, onClick, className = "", ariaLabel, bgColor }: SocialIconProps) => {
  const baseClasses = bgColor ? 
    `${bgColor} hover:bg-primary hover:text-white text-neutral-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors` : 
    className;
  
  return (
    <div>
    <a 
      href="#" 
      className={baseClasses} 
      aria-label={ariaLabel} 
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
    >
      <span className="material-icons text-xl">{type}</span>
    </a>
    </div>
  );
};

export default SocialIcon;
