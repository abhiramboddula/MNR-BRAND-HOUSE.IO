import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-mnr-black text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-widest text-white">MNR</span>
            <p className="text-gray-400 text-sm max-w-xs">
              Modern essentials for the conscious individual. Crafted with care, designed for longevity.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-mnr-gold transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-mnr-gold transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-mnr-gold transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-mnr-gold tracking-wider uppercase">Shop</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">New Arrivals</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Best Sellers</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Accessories</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Sale</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-mnr-gold tracking-wider uppercase">Support</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Shipping & Returns</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Size Guide</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">FAQ</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-mnr-gold tracking-wider uppercase">Company</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">About MNR</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Sustainability</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Careers</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Press</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2024 MNR Brand Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;