import { Instagram, Twitter, Facebook } from 'lucide-react';

const SocialSection = () => {
  const socials = [
    { name: 'Instagram', label: '@ozaco_hub', icon: Instagram, color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600', link: '#' },
    { name: 'X (Twitter)', label: 'ozaco_mobile', icon: Twitter, color: 'bg-zinc-950', link: '#' },
    { name: 'Facebook', label: 'Ozaco Mobile Official', icon: Facebook, color: 'bg-blue-600', link: '#' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {socials.map((social, i) => (
        <a href={social.link} key={i} className="group p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-white/5 flex flex-col items-center text-center gap-6 hover:scale-105 transition-all shadow-premium">
          <div className={`w-20 h-20 flex items-center justify-center rounded-3xl text-white shadow-lg ${social.color} group-hover:rotate-6 transition-transform`}>
            <social.icon size={36} />
          </div>
          <div>
            <h4 className="font-black text-xl tracking-tighter uppercase">{social.name}</h4>
            <p className="text-zinc-500 font-bold text-xs tracking-widest uppercase mt-1 opacity-60">{social.label}</p>
          </div>
          <button className="bg-white dark:bg-zinc-950 px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest border border-zinc-200 dark:border-white/5 group-hover:bg-brand-primary group-hover:text-white transition-colors">Follow Us</button>
        </a>
      ))}
    </div>
  );
};

export default SocialSection;
