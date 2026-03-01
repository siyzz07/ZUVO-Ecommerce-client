import { motion } from 'framer-motion';
import { useCartStore } from '../../store/useStore';
import ProductCardImage from './product-card/ProductCardImage';
import ProductCardInfo from './product-card/ProductCardInfo';
import ProductCardActions from './product-card/ProductCardActions';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  onClick?: () => void;
}

const ProductCard = (props: ProductCardProps) => {
  const { id, name, price, originalPrice, images, category, onClick } = props;
  const addItem = useCartStore((state) => state.addItem);

  const handleAddCart = () => {
    // Add to cart uses the first image for the icon/preview
    addItem({ id, name, price, image: images[0], qty: 1 });
  };

  const handleOrderNow = () => {
    const message = `Hi ZUVO! I want to order: ${name} (₹${price}). Is it available?`;
    window.open(`https://wa.me/911234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      onClick={onClick}
      className="group relative flex flex-col bg-white dark:bg-zinc-900/50 rounded-[2rem] border border-zinc-100 dark:border-white/5 overflow-hidden shadow-premium hover:shadow-luxury transition-all duration-500 cursor-pointer"
    >
      {/* 1. Image Section - Shows first image as thumbnail */}
      <ProductCardImage image={images[0]} name={name} category={category} />

      {/* 2. Content Section */}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <ProductCardInfo name={name} price={price} originalPrice={originalPrice} />
        
        {/* 3. Actions Section */}
        <ProductCardActions onAddCart={handleAddCart} onOrderNow={handleOrderNow} />
      </div>

      {/* Premium Hover Overlay Effect */}
      <div className="absolute inset-0 pointer-events-none border-2 border-brand-primary/0 group-hover:border-brand-primary/10 rounded-[2rem] transition-colors duration-500" />
    </motion.div>
  );
};

export default ProductCard;
