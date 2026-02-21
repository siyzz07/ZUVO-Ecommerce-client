import { useState } from 'react';
import ProductCard from '../../ui/ProductCard';
import ProductDetailsModal from '../../ui/ProductDetailsModal';
import { Product } from '../../../types';

interface ProductsSectionProps {
  products: Product[];
}

const ProductsSection = ({ products }: ProductsSectionProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            {...product} 
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>

      <ProductDetailsModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductsSection;
