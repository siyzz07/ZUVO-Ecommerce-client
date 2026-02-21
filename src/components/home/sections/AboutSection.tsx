const AboutSection = () => {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-12 py-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tighter uppercase italic">Redefining Excellence <br /> <span className="text-brand-primary underline">Since 2018</span></h2>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg leading-relaxed">
          Ozaco Mobile was born out of a desire to bring the world's most innovative mobile accessories to your doorstep. We believe gadgets should not only be functional but also an extension of your personality.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 text-left">
        <div className="p-8 bg-brand-primary text-white rounded-[2rem] shadow-xl shadow-brand-primary/20">
          <h4 className="font-black text-xl mb-3 tracking-tighter uppercase">Our Vision</h4>
          <p className="text-sm font-medium opacity-90 leading-relaxed">To become the gold standard in mobile accessory retail, fostering a community of tech enthusiasts who value quality above all.</p>
        </div>
        <div className="p-8 bg-zinc-950 text-white rounded-[2rem]">
          <h4 className="font-black text-xl mb-3 tracking-tighter uppercase text-brand-secondary">Our Mission</h4>
          <p className="text-sm font-medium opacity-70 leading-relaxed">Bridge the gap between technology and lifestyle through curated product selections and unparalleled customer service.</p>
        </div>
      </div>

      <div className="flex justify-center gap-12 font-black uppercase tracking-widest text-xs opacity-40">
        <div className="flex flex-col gap-1 items-center">
          <span className="text-3xl text-zinc-900 dark:text-white">5K+</span>
          <span>Customers</span>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <span className="text-3xl text-zinc-900 dark:text-white">10+</span>
          <span>Brands</span>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <span className="text-3xl text-zinc-900 dark:text-white">100%</span>
          <span>Original</span>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
