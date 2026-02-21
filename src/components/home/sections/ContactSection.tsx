import { Phone, Mail, Clock, MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-white/5">
          <h4 className="font-black uppercase text-sm mb-4 tracking-tighter">Quick Connections</h4>
          <div className="space-y-4">
            <a href="tel:+911234567890" className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-white/5 hover:border-brand-primary transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-zinc-400">Phone Number</p>
                <p className="font-bold">+91 12345 67890</p>
              </div>
            </a>
            <a href="mailto:contact@ozaco.com" className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-white/5 hover:border-brand-primary transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-zinc-400">Email Address</p>
                <p className="font-bold">support@ozaco.com</p>
              </div>
            </a>
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-white/5">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-zinc-400">Working Hours</p>
                <p className="font-bold">10:00 AM - 08:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl overflow-hidden min-h-[300px] relative">
        <div className="absolute inset-0 flex items-center justify-center text-center p-8">
          <div>
            <MapPin size={48} className="mx-auto text-brand-primary mb-4" />
            <p className="font-bold text-lg">Visit Our Store</p>
            <p className="text-sm opacity-60">123 Premium Street, Hub Lane, <br />Gadget City, India</p>
            <button className="mt-6 bg-brand-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm">Open in Google Maps</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
