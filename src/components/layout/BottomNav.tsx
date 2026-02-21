import { Home, Search, ShoppingBag, UserPlus } from 'lucide-react';
import { useCartStore } from '../../store/useStore';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CartModal from '../ui/CartModal';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'cart', icon: ShoppingBag, label: 'Cart' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'contact', icon: UserPlus, label: 'Save' },
];

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, isAnimating } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.qty, 0);

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:OZACO Mobile Hub
N:Hub;OZACO;Mobile;;
TEL;TYPE=CELL:+911234567890
EMAIL;TYPE=WORK:support@ozaco.com
ORG:OZACO Mobile Hub
TITLE:Premium Gadget Store
ADR;TYPE=WORK:;;123 Premium Street, Hub Lane;Gadget City;State;India
URL:https://ozaco.com
END:VCARD`;
    
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'OZACO_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTabClick = (id: string) => {
    if (id === 'cart') {
      setIsCartOpen(true);
    } else if (id === 'contact') {
      handleSaveContact();
    } else {
      setActiveTab(id);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/10 dark:from-black/40 to-transparent -top-10 pointer-events-none" />
        
        <div className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl border-t border-zinc-100 dark:border-white/5 px-2 pb-safe pt-2">
          <div className="flex justify-between items-center relative gap-1 max-w-md mx-auto">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              const isCartItem = item.id === 'cart';
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative flex-1 flex flex-col items-center justify-center py-2 transition-colors duration-300 z-10 ${
                    isActive ? 'text-brand-primary dark:text-brand-secondary' : 'text-zinc-400 dark:text-zinc-500'
                  }`}
                >
                  <motion.div 
                    animate={isCartItem && isAnimating ? { 
                      scale: [1, 1.4, 1],
                      rotate: [0, -10, 10, -10, 10, 0]
                    } : {}}
                    className="relative"
                  >
                    <Icon 
                      size={20} 
                      strokeWidth={isActive ? 2.5 : 2} 
                      className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} 
                    />
                    {isCartItem && cartCount > 0 && (
                      <motion.span 
                        key={cartCount}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute -top-1.5 -right-2 bg-brand-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-zinc-950"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </motion.div>
                  
                  <span className={`text-[10px] font-bold mt-1 tracking-tight transition-all duration-300 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 h-0'
                  }`}>
                    {item.label}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-zinc-100 dark:bg-white/5 rounded-xl -z-10 mx-1 my-1"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Floating Cart - Bottom Left */}
      <div className="hidden md:block fixed bottom-8 left-8 z-50">
        <motion.button 
          onClick={() => setIsCartOpen(true)}
          animate={isAnimating ? { 
            scale: [1, 1.2, 1],
            y: [0, -20, 0],
            rotate: [0, -10, 10, -10, 10, 0]
          } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-16 h-16 bg-brand-primary text-white rounded-2xl shadow-luxury flex items-center justify-center relative hover:scale-110 active:scale-95 transition-all group border border-white/20"
        >
          <ShoppingBag size={28} />
          {cartCount > 0 && (
            <AnimatePresence mode="wait">
              <motion.span 
                key={cartCount}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-2 -right-2 bg-yellow-400 text-zinc-950 text-[10px] font-black px-2 py-1 rounded-full border-2 border-white dark:border-zinc-950 shadow-lg"
              >
                {cartCount}
              </motion.span>
            </AnimatePresence>
          )}
        </motion.button>
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default BottomNav;
