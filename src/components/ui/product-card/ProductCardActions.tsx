import { ShoppingBag, MessageCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ProductCardActionsProps {
  onAddCart: () => void;
  onOrderNow: () => void;
}

const ProductCardActions = ({ onAddCart, onOrderNow }: ProductCardActionsProps) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddCart();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2.5 mt-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onOrderNow();
          }}
          className="flex-1 bg-brand-primary text-white py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.1em] hover:shadow-lg hover:shadow-brand-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2 border border-brand-primary/10"
        >
          Order Now
          <MessageCircle size={14} fill="currentColor" />
        </button>
        
        <button 
          onClick={handleAddCart}
          className={`relative flex items-center justify-center h-[46px] sm:w-12 rounded-2xl border transition-all active:scale-90 shadow-lg gap-2 sm:gap-0 px-4 sm:px-0 overflow-hidden ${
            isAdded 
              ? 'bg-green-500 text-white border-green-600 shadow-green-500/20' 
              : 'bg-yellow-400 text-zinc-950 border-yellow-500/20 hover:bg-yellow-500 shadow-yellow-400/20'
          }`}
          title="Add to Cart"
        >
          <AnimatePresence mode="wait">
            {isAdded ? (
              <motion.div
                key="check"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Check size={18} strokeWidth={3} />
              </motion.div>
            ) : (
              <motion.div
                key="bag"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <ShoppingBag size={18} strokeWidth={2.5} />
                <span className="sm:hidden font-black text-[11px] uppercase tracking-[0.1em]">Add To Bag</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Flying Animation Element */}
          <AnimatePresence>
            {isAdded && (
              <motion.div
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{ 
                  x: window.innerWidth < 768 ? 0 : -300, 
                  y: window.innerWidth < 768 ? 400 : 400, 
                  scale: 0.2, 
                  opacity: 0,
                  rotate: 360
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute pointer-events-none z-50 text-brand-primary"
              >
                <ShoppingBag size={24} fill="currentColor" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
};

export default ProductCardActions;
