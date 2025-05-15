interface StatCardProps {
  value: string;
  label: string;
}

const StatCard = ({ value, label }: StatCardProps) => {
  return (
    <div>
      <h3 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-2">{value}</h3>
      <p className="text-neutral-700">{label}</p>
    </div>
  );
};

export default StatCard;
