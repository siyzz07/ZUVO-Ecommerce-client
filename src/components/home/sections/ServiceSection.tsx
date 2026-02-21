import { Truck, ShieldCheck, MessageCircle, Zap, Globe, Star } from 'lucide-react';

const ServiceSection = () => {
  const services = [
    { title: 'Safe Delivery', desc: 'Secure packaging for all hardware.', icon: Truck },
    { title: 'Quality Assured', desc: 'Certified accessories only.', icon: ShieldCheck },
    { title: 'Tech Support', desc: 'Expert help for all gadgets.', icon: MessageCircle },
    { title: 'Flash Sales', desc: 'Exclusive weekly discounts.', icon: Zap },
    { title: 'Replacement', icon: Globe, desc: 'Easy 7-day returns/exchange.' },
    { title: 'Custom Orders', icon: Star, desc: 'Tailored mobile solutions.' }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {services.map((s, i) => (
        <div key={i} className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-white/5 flex flex-col items-start gap-4 hover:border-brand-primary transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-950 flex items-center justify-center text-brand-primary shadow-sm group-hover:scale-110 transition-transform">
            <s.icon size={24} />
          </div>
          <div>
            <h4 className="font-black text-lg tracking-tight mb-2 uppercase">{s.title}</h4>
            <p className="text-sm text-zinc-500 font-medium leading-relaxed">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceSection;
