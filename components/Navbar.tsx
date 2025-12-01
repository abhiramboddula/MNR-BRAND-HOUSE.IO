import React from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartCount }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Mobile Menu Trigger (Visual Only) */}
          <div className="flex items-center sm:hidden">
            <button className="text-gray-500 hover:text-mnr-black p-2">
              <Menu size={24} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center sm:justify-start w-full sm:w-auto">
            <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-serif text-2xl font-bold tracking-widest text-mnr-black">MNR</a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex space-x-8 items-center">
            <a href="#products" onClick={(e) => handleScroll(e, 'products')} className="text-sm font-medium text-gray-700 hover:text-mnr-gold transition-colors">New Arrivals</a>
            <a href="#products" onClick={(e) => handleScroll(e, 'products')} className="text-sm font-medium text-gray-700 hover:text-mnr-gold transition-colors">Shop All</a>
            <a href="#features" onClick={(e) => handleScroll(e, 'features')} className="text-sm font-medium text-gray-700 hover:text-mnr-gold transition-colors">Why MNR</a>
            <a href="#footer" onClick={(e) => handleScroll(e, 'footer')} className="text-sm font-medium text-gray-700 hover:text-mnr-gold transition-colors">Contact</a>
          </div>

          {/* Icons */}
          <div className="hidden sm:flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-mnr-gold transition-colors">
              <Search size={20} />
            </button>
            <button 
              onClick={onCartClick}
              className="p-2 text-gray-500 hover:text-mnr-gold transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-mnr-gold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          
          {/* Mobile Cart Icon */}
          <div className="flex items-center sm:hidden absolute right-4">
             <button 
              onClick={onCartClick}
              className="p-2 text-gray-500 hover:text-mnr-gold transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-mnr-gold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;