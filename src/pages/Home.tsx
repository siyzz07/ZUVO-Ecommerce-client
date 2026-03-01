import { motion, AnimatePresence } from 'framer-motion';
import { 
    Phone, MapPin, MessageCircle, Instagram, Twitter, Facebook, 
    LayoutGrid, Image as ImageIcon, Info, FileText, Share2, 
    ShieldCheck, UserPlus, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import ProductsSection from '../components/home/sections/ProductsSection';
import ContactSection from '../components/home/sections/ContactSection';
import ServiceSection from '../components/home/sections/ServiceSection';
import GallerySection from '../components/home/sections/GallerySection';
import AboutSection from '../components/home/sections/AboutSection';
import TermsSection from '../components/home/sections/TermsSection';
import SocialSection from '../components/home/sections/SocialSection';
import { Product } from '../types';
import { useSearchStore } from '../store/useStore';

const categories = [
  { name: 'Products', icon: LayoutGrid },
  { name: 'Contact', icon: Phone },
  { name: 'Service', icon: ShieldCheck },
  { name: 'Gallery', icon: ImageIcon },
  { name: 'About Us', icon: Info },
  { name: 'Terms', icon: FileText },
  { name: 'Social', icon: Share2 },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('Products');
  const [products, setProducts] = useState<Product[]>([]);
  const [shopSettings, setShopSettings] = useState<any>(null);
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0);
  const { query: searchQuery } = useSearchStore();

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q);
  });

  // Auto-switch to Products tab when search query is active
  useEffect(() => {
    if (searchQuery.trim() && selectedCategory !== 'Products') {
      setSelectedCategory('Products');
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchShopSettings();
    fetchProducts();
  }, []);

  const fetchShopSettings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/shop');
      if (response.ok) {
        const data = await response.json();
        setShopSettings(data);
      }
    } catch (error) {
      console.error('Error fetching shop settings:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (response.ok) {
        const data = await response.json();
        const mappedProducts = Array.isArray(data) ? data.map((p: any) => ({
            ...p,
            id: p._id
        })) : [];
        setProducts(mappedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${shopSettings?.shopName || 'ZUVO Mobile Hub'}
N:Hub;${shopSettings?.shopName?.split(' ')[0] || 'ZUVO'};Mobile;;
TEL;TYPE=CELL:${shopSettings?.phone || '+911234567890'}
EMAIL;TYPE=WORK:${shopSettings?.email || 'support@zuvo.com'}
ORG:${shopSettings?.shopName || 'ZUVO Mobile Hub'}
ADR;TYPE=WORK:;;${shopSettings?.address || '123 Premium Street, Hub Lane;Gadget City;;India'}
END:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ZUVO_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const nextCover = () => {
    if (!shopSettings?.coverPhotos?.length) return;
    setCurrentCoverIndex((prev) => (prev + 1) % shopSettings.coverPhotos.length);
  };
// test
  const prevCover = () => {
    if (!shopSettings?.coverPhotos?.length) return;
    setCurrentCoverIndex((prev) => (prev - 1 + shopSettings.coverPhotos.length) % shopSettings.coverPhotos.length);
  };

  useEffect(() => {
    if (shopSettings?.coverPhotos?.length > 1) {
        const interval = setInterval(nextCover, 5000);
        return () => clearInterval(interval);
    }
  }, [shopSettings]);

  const renderSection = () => {
    switch (selectedCategory) {
      case 'Products': return <ProductsSection products={filteredProducts} />;
      case 'Contact': return <ContactSection shopSettings={shopSettings} />;
      case 'Service': return <ServiceSection />;
      case 'Gallery': return <GallerySection />;
      case 'About Us': return <AboutSection />;
      case 'Terms': return <TermsSection />;
      case 'Social': return <SocialSection />;
      default: return <ProductsSection products={filteredProducts} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Cover and Profile Section */}
      <section className="relative overflow-hidden">
        <div className="h-40 md:h-80 w-full relative">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentCoverIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              src={shopSettings?.coverPhotos?.[currentCoverIndex] || "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1600&auto=format&fit=crop"} 
              className="w-full h-full object-cover" 
              alt="Cover" 
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          
          {shopSettings?.coverPhotos?.length > 1 && (
            <>
                <button onClick={prevCover} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-all z-20"><ChevronLeft size={20} /></button>
                <button onClick={nextCover} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-all z-20"><ChevronRight size={20} /></button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                    {shopSettings.coverPhotos.map((_: any, i: number) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentCoverIndex ? 'w-6 bg-brand-primary' : 'w-1.5 bg-white/40'}`} />
                    ))}
                </div>
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-5 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-5 -mt-16 md:-mt-20 z-10 relative">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="w-32 h-32 md:w-44 md:h-44 rounded-3xl md:rounded-[2.5rem] border-[4px] border-white dark:border-zinc-950 overflow-hidden shadow-luxury bg-white"
            >
              <img 
                src={shopSettings?.profilePic || "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400&auto=format&fit=crop"} 
                className="w-full h-full object-cover" 
                alt="Profile" 
              />
            </motion.div>
            
            <div className="flex-1 text-center md:text-left pb-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">{shopSettings?.shopName || 'ZUVO Mobile'}</h1>
                <span className="px-2.5 py-0.5 bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase rounded-md">Official</span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 font-semibold text-sm md:text-base leading-snug max-w-lg mx-auto md:mx-0">
                {shopSettings?.description || 'Premium Mobile Accessories Hub. High performance gadgets for the modern lifestyle.'}
              </p>
              
              <div className="flex justify-center md:justify-start gap-5 mt-5">
                 <div className="flex flex-col items-center md:items-start">
                   <span className="text-lg font-bold text-zinc-900 dark:text-white">{products.length}+</span>
                   <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Products</span>
                 </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto mt-8 md:mt-10">
               <a 
                 href={`tel:${shopSettings?.phone || ''}`}
                 className="w-full md:w-auto flex items-center justify-center gap-2.5 bg-brand-primary text-white px-8 py-3 rounded-2xl shadow-xl shadow-brand-primary/20 hover:opacity-95 transition-all font-black text-sm uppercase tracking-tighter"
               >
                 <Phone size={18} fill="currentColor" />
                 Call Support
               </a>
               
                <div className="flex gap-2 w-full md:w-auto">
                 <a 
                   href={`https://wa.me/${shopSettings?.phone?.replace(/[^0-9]/g, '') || ''}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex-1 md:w-13 md:h-13 flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all py-3 md:py-0" 
                   title="Chat"
                 >
                   <MessageCircle size={20} className="text-brand-primary" />
                   <span className="md:hidden font-bold text-[10px] uppercase tracking-widest leading-none text-zinc-900 dark:text-white">Chat</span>
                 </a>
                 
                 <button 
                   onClick={handleSaveContact}
                   className="flex-1 md:w-13 md:h-13 flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all py-3 md:py-0"
                   title="Save Contact"
                 >
                   <UserPlus size={20} className="text-brand-primary" />
                   <span className="md:hidden font-bold text-[10px] uppercase tracking-widest leading-none text-zinc-900 dark:text-white">Save</span>
                 </button>

                 <a 
                   href={`https://www.google.com/maps?q=${shopSettings?.location?.lat || 0},${shopSettings?.location?.lng || 0}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex-1 md:w-13 md:h-13 flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all py-3 md:py-0" 
                   title="Store Location"
                 >
                   <MapPin size={20} className="text-brand-primary" />
                   <span className="md:hidden font-bold text-[10px] uppercase tracking-widest leading-none text-zinc-900 dark:text-white">Map</span>
                 </a>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="px-5 pb-24 max-w-7xl mx-auto mt-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
           <div>
             <div className="flex items-center gap-2 mb-1">
               <div className="w-8 h-1 bg-brand-primary rounded-full" />
               <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">{selectedCategory}</h3>
             </div>
             <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest opacity-60">
               {selectedCategory === 'Products' 
                 ? (searchQuery.trim() ? `Showing results for "${searchQuery}"` : 'High-performance gadgets') 
                 : `Explore our ${selectedCategory.toLowerCase()}`}
             </p>
           </div>
           
           <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 md:mx-0 md:px-0">
             {categories.map((cat) => {
               const Icon = cat.icon;
               const isActive = selectedCategory === cat.name;
               
               return (
                 <button 
                   key={cat.name}
                   onClick={() => setSelectedCategory(cat.name)}
                   className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 whitespace-nowrap ${
                     isActive 
                       ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20 scale-105' 
                       : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-100 dark:border-white/5'
                   }`}
                 >
                   <Icon size={16} className={isActive ? 'text-white' : 'text-zinc-400'} />
                   {cat.name}
                 </button>
               );
             })}
           </div>
        </div>

        {/* Dynamic Section Rendering */}
        <motion.div
           key={selectedCategory}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.3 }}
        >
          {renderSection()}
        </motion.div>
      </section>
      
      {/* Footer Standard */}
      <footer className="px-5 py-12 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 grayscale opacity-50">
               <span className="font-extrabold text-xl tracking-tighter">{shopSettings?.shopName || 'ZUVO'}</span>
            </div>
            
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">
              © {new Date().getFullYear()} {shopSettings?.shopName || 'ZUVO Mobile Hub'} • Standards of Excellence
            </p>
            
            <div className="flex gap-4">
               {[Instagram, Twitter, Facebook].map((Social, i) => (
                 <Social key={i} size={18} className="text-zinc-400 hover:text-brand-primary cursor-pointer transition-colors" />
               ))}
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Home;
