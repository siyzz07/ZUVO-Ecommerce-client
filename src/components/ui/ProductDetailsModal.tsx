import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, MessageCircle, Star, ShieldCheck, Truck, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Product } from '../../types';
import { useCartStore } from '../../store/useStore';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal = ({ product, isOpen, onClose }: ProductDetailsModalProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    setActiveImageIdx(0);
  }, [product, isOpen]);

  if (!product) return null;

  const handleWhatsAppOrder = () => {
    const message = `Hi ZUVO! I'm interested in buying: ${product.name} (₹${product.price}). Is it in stock?`;
    window.open(`https://wa.me/911234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-[101] bg-white dark:bg-zinc-950 rounded-t-[2.5rem] shadow-2xl max-h-[92vh] overflow-y-auto no-scrollbar"
          >
            <div className="w-12 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full mx-auto mt-4 mb-2" />

            <div className="max-w-7xl mx-auto px-6 pb-10">
              <div className="flex justify-end sticky top-4 z-20">
                <button 
                  onClick={onClose}
                  className="w-10 h-10 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-10 mt-2">
                {/* Image Gallery Section */}
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 group">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeImageIdx}
                        src={product.images[activeImageIdx]} 
                        alt={product.name} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    
                    {product.images.length > 1 && (
                      <>
                        <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronLeft size={24} />
                        </button>
                        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}

                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-3 overflow-x-auto no-scrollbar">
                    {product.images.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImageIdx === idx ? 'border-brand-primary scale-105' : 'border-transparent opacity-50'}`}
                      >
                        <img src={img} className="w-full h-full object-cover" alt="" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-black text-yellow-600 dark:text-yellow-400">4.9</span>
                    </div>
                    <span className="text-zinc-400 text-sm font-bold">(128 Reviews)</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 dark:text-white mb-4 uppercase">
                    {product.name}
                  </h2>

                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-4xl font-black text-brand-primary tracking-tighter">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-zinc-400 line-through font-bold">₹{product.originalPrice}</span>
                    )}
                    <span className="ml-2 px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-black rounded-lg uppercase">In Stock</span>
                  </div>

                  <div className="space-y-6 mb-10">
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                      Experience premium quality with our latest {product.name.toLowerCase()}. Engineered for performance and designed for the modern user, this product sets a new standard in the {product.category} category.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: ShieldCheck, label: '1 Year Warranty' },
                        { icon: Truck, label: 'Free Delivery' },
                        { icon: Zap, label: 'Fast Charging' },
                        { icon: MessageCircle, label: 'Expert Support' }
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-white/5">
                          <feature.icon size={18} className="text-brand-primary" />
                          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{feature.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <button 
                      onClick={handleWhatsAppOrder}
                      className="flex-[2] bg-brand-primary text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-brand-primary/20 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                      Order on WhatsApp
                      <MessageCircle size={18} fill="currentColor" />
                    </button>
                    
                    <button 
                      onClick={() => {
                        addItem({ ...product, image: product.images[0], qty: 1 });
                        onClose();
                      }}
                      className="flex-1 bg-yellow-400 text-zinc-950 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-yellow-400/20 hover:bg-yellow-500 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                      Add To Bag
                      <ShoppingBag size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailsModal;
