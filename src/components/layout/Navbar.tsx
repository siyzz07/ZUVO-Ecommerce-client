import { Moon, Sun, Search, X } from 'lucide-react';
import { useThemeStore, useSearchStore, useShopStore } from '../../store/useStore';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { query, setQuery, clearQuery } = useSearchStore();
  const shopName = useShopStore((s) => s.settings?.shopName || 'Store');
  const initial = shopName.charAt(0).toUpperCase();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-100 dark:border-white/5 px-4 md:px-12 py-3 flex justify-between items-center transition-all duration-300">
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <div className="w-9 h-9 bg-brand-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
           <span className="text-lg font-black tracking-tighter">{initial}</span>
        </div>
        <h1 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter uppercase ml-0.5">
          {shopName}<span className="text-brand-primary">.</span>
        </h1>
      </motion.div>

      {/* Search — visible on all screens */}
      <div className="flex items-center flex-1 max-w-lg mx-4 md:mx-12">
        <div className="relative w-full group">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..." 
            className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-xl py-2 pl-11 pr-10 text-sm font-medium focus:ring-2 focus:ring-brand-primary/10 transition-all outline-none dark:text-white"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-primary transition-colors" size={16} />
          {query && (
            <button
              onClick={clearQuery}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <X size={14} className="text-zinc-400" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 md:gap-3">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 active:scale-90"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
