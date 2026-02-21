const Footer = () => {
    return (
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-2xl font-black italic tracking-tighter">OZACO</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">Premium Mobile Accessories Hub</p>
          </div>
          <div className="flex gap-8 text-sm font-bold text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:text-primary-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-500 transition-colors">About</a>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2024 OZACO Hub</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
