import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const CartModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { items, removeItem, updateQty, getTotal, clearCart } = useCartStore();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          className="relative w-full max-w-lg bg-white dark:bg-zinc-950 rounded-t-[2.5rem] md:rounded-[2.5rem] max-h-[85vh] overflow-hidden flex flex-col shadow-luxury"
        >
          <div className="p-6 border-b border-zinc-100 dark:border-white/5 flex justify-between items-center">
            <h2 className="text-2xl font-black tracking-tighter uppercase px-2">Your Bag</h2>
            <button onClick={onClose} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-2xl transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center opacity-40">
                 <ShoppingBag size={48} strokeWidth={1} />
                 <p className="mt-4 font-bold uppercase tracking-widest text-xs">Bag is Empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-white/5">
                    <img src={item.image} className="w-20 h-20 object-cover rounded-2xl" alt={item.name} />
                    <div className="flex-grow">
                      <h3 className="font-bold text-sm">{item.name}</h3>
                      <p className="text-brand-primary font-black text-lg">₹{item.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex bg-white dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-white/5 p-1">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 py-1 font-bold">-</button>
                          <span className="px-3 py-1 font-black text-xs self-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 py-1 font-bold">+</button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-white/5">
            <div className="flex justify-between items-center mb-6 px-2">
              <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Total Amount</span>
              <span className="text-3xl font-black tracking-tighter">₹{getTotal()}</span>
            </div>
            
            <div className="flex gap-3">
              <button onClick={clearCart} className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800 transition-all">
                <Trash2 size={24} className="text-zinc-400" />
              </button>
              <button className="flex-1 bg-brand-primary text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Order via WhatsApp
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CartModal;
