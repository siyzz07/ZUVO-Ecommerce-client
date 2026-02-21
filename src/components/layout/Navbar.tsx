import { Moon, Sun, Search, User } from 'lucide-react';
import { useThemeStore } from '../../store/useStore';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-100 dark:border-white/5 px-4 md:px-12 py-3 flex justify-between items-center transition-all duration-300">
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <div className="w-9 h-9 bg-brand-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
           <span className="text-lg font-black tracking-tighter">Z</span>
        </div>
        <h1 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter uppercase ml-0.5">
          ZOVO<span className="text-brand-primary">.</span>
        </h1>
      </motion.div>

      {/* Standard Desktop Search */}
      <div className="hidden md:flex items-center flex-1 max-w-lg mx-12">
        <div className="relative w-full group">
          <input 
            type="text" 
            placeholder="Search premium accessories..." 
            className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-xl py-2 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-primary/10 transition-all outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-primary transition-colors" size={16} />
        </div>
      </div>

      <div className="flex items-center gap-1.5 md:gap-3">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 active:scale-90"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="hidden md:flex items-center gap-3">
          <button className="text-xs font-bold text-zinc-500 hover:text-brand-primary uppercase tracking-widest px-4 py-2 transition-colors">Sign In</button>
          <button className="bg-brand-primary text-white px-6 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-brand-primary/10">
            Join Now
          </button>
        </div>

        {/* Mobile Profile Icon */}
        <button className="md:hidden p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 active:scale-90">
          <User size={18} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
