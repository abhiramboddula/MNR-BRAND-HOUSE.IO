import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative flex flex-col gap-2">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-sm overflow-hidden group-hover:opacity-90 transition-opacity lg:h-96 lg:aspect-none relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
        <button 
            onClick={() => onAddToCart(product)}
            className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-mnr-gold hover:text-white"
            aria-label="Add to cart"
        >
            <Plus size={20} />
        </button>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;