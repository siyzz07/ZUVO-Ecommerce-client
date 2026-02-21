import { motion } from 'framer-motion';

const GallerySection = () => {
  const images = [
    'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?q=80&w=800',
    'https://images.unsplash.com/photo-1592892111425-15e04305f961?q=80&w=800',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800',
    'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=800',
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=800',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800'
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((img, i) => (
        <motion.div 
          whileHover={{ scale: 1.02 }}
          key={i} 
          className="aspect-square rounded-3xl overflow-hidden shadow-premium"
        >
          <img src={img} className="w-full h-full object-cover" alt="Gallery item" />
        </motion.div>
      ))}
    </div>
  );
};

export default GallerySection;
