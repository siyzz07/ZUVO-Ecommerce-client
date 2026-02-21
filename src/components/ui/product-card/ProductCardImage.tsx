import { motion } from 'framer-motion';

interface ProductCardImageProps {
  image: string;
  name: string;
  category: string;
}

const ProductCardImage = ({ image, name, category }: ProductCardImageProps) => {
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-950">
      <motion.img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.1em] text-zinc-900 dark:text-zinc-50 rounded-xl border border-white/20 shadow-sm">
          {category}
        </span>
      </div>
      
      {/* Quick Status */}
      <div className="absolute top-4 right-4 z-10">
        <div className="w-2.5 h-2.5 bg-brand-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(26,77,46,0.5)]" />
      </div>
    </div>
  );
};

export default ProductCardImage;
