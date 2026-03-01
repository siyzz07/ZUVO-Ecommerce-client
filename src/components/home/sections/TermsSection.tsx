import { ShieldCheck } from 'lucide-react';

const TermsSection = () => {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-8 bg-zinc-50 dark:bg-zinc-900/50 p-10 rounded-[2.5rem] border border-zinc-100 dark:border-white/5">
      <div className="flex items-center gap-3 text-brand-primary">
        <ShieldCheck size={32} />
        <h2 className="m-0 font-black tracking-tighter uppercase text-3xl">Retail Standards</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-bold text-lg m-0 underline decoration-brand-primary underline-offset-4">Return Policy</h4>
          <p className="text-sm opacity-60 leading-relaxed font-medium">We offer a 7-day replacement guarantee on all manufacturing defects. Gadgets must be in original packaging with all documentation intact. Returns are not accepted for physiological wear or liquid damage.</p>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-lg m-0 underline decoration-brand-primary underline-offset-4">Shipping Info</h4>
          <p className="text-sm opacity-60 leading-relaxed font-medium">Standard shipping takes 3-5 business days. Express shipping is available for select metro cities. All items are shipped with tracking enabled.</p>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-lg m-0 underline decoration-brand-primary underline-offset-4">Privacy Terms</h4>
          <p className="text-sm opacity-60 leading-relaxed font-medium">Your data is secured with industry-standard encryption. We do not sell or share contact details with third-party vendors without explicitly stated consent.</p>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-lg m-0 underline decoration-brand-primary underline-offset-4">Warranty Scope</h4>
          <p className="text-sm opacity-60 leading-relaxed font-medium">Original brand warranties apply where applicable. Zuvo provides complementary tech assistance for the first 30 days of purchase.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsSection;
