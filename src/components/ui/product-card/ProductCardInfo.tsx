import { Star } from 'lucide-react';

interface ProductCardInfoProps {
  name: string;
  price: number;
  originalPrice?: number;
}

const ProductCardInfo = ({ name, price, originalPrice }: ProductCardInfoProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 opacity-50">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={8} className={`${i < 4 ? 'fill-brand-secondary text-brand-secondary' : 'text-zinc-300 dark:text-zinc-700'}`} />
        ))}
        <span className="text-[10px] font-bold ml-1">4.8</span>
      </div>

      <h4 className="font-display font-black text-sm md:text-base leading-tight line-clamp-2 h-10 md:h-12 text-zinc-800 dark:text-zinc-100 group-hover:text-brand-primary transition-colors">
        {name}
      </h4>
      
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-xl md:text-2xl font-black text-brand-primary tracking-tighter">
          ₹{price.toLocaleString()}
        </span>
        {originalPrice && (
          <span className="text-xs text-zinc-400 line-through font-bold opacity-60">
            ₹{originalPrice.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCardInfo;
