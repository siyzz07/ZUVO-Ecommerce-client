import { Phone, Mail, Clock, MapPin } from 'lucide-react';

interface ContactSectionProps {
  shopSettings: {
    phone?: string;
    email?: string;
    address?: string;
    shopName?: string;
    location?: { lat: number; lng: number };
  } | null;
}

const ContactSection = ({ shopSettings }: ContactSectionProps) => {
  const phone = shopSettings?.phone || '+91 12345 67890';
  const email = shopSettings?.email || 'support@store.com';
  const address = shopSettings?.address || '123 Premium Street, Hub Lane, Gadget City, India';
  const shopName = shopSettings?.shopName || 'Our Store';
  const lat = shopSettings?.location?.lat || 0;
  const lng = shopSettings?.location?.lng || 0;
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-white/5">
          <h4 className="font-black uppercase text-sm mb-4 tracking-tighter">Quick Connections</h4>
          <div className="space-y-4">
            <a href={`tel:${phone}`} className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-white/5 hover:border-brand-primary transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-zinc-400">Phone Number</p>
                <p className="font-bold">{phone}</p>
              </div>
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-white/5 hover:border-brand-primary transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-zinc-400">Email Address</p>
                <p className="font-bold">{email}</p>
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
            <p className="font-bold text-lg">Visit {shopName}</p>
            <p className="text-sm opacity-60">{address}</p>
            <a 
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-brand-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;

