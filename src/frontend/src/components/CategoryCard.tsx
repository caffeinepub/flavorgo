interface CategoryCardProps {
  name: string;
  emoji: string;
  color: string;
  onClick?: () => void;
}

export default function CategoryCard({
  name,
  emoji,
  color,
  onClick,
}: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${color} rounded-xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform cursor-pointer border border-transparent hover:border-primary/20 shadow-xs w-full`}
      data-ocid="category.button"
    >
      <span className="text-3xl">{emoji}</span>
      <span className="text-sm font-semibold text-foreground">{name}</span>
    </button>
  );
}
