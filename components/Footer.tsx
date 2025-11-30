import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { SERVICES } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="block mb-6 group w-fit">
              <img 
                src="https://placehold.co/180x45/000000/FFC300/png?text=BURRELL+%26+CO." 
                alt="Burrell & Co. Logo" 
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
              Elevating car care to an art form. We bring the detail shop to your driveway with premium products and unmatched expertise.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-brand-gold transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-brand-gold transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-brand-gold transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif">Services</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-sans">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link to="/#services" className="hover:text-brand-gold transition-colors">{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-sans">
              <li><Link to="/" className="hover:text-brand-gold transition-colors">About Us</Link></li>
              <li><Link to="/#services" className="hover:text-brand-gold transition-colors">Our Process</Link></li>
              <li><Link to="/" className="hover:text-brand-gold transition-colors">Service Area</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-sans">
              <li>
                <a href="mailto:Shawn@Burrellnco.com" className="hover:text-brand-gold transition-colors">
                  Shawn@Burrellnco.com
                </a>
              </li>
              <li>
                <a href="tel:9517514278" className="hover:text-brand-gold transition-colors">
                  951-751-4278
                </a>
              </li>
              <li>
                <a href="tel:3109124666" className="hover:text-brand-gold transition-colors">
                  310-912-4666
                </a>
              </li>
              <li>
                <span className="block text-brand-gold mt-2 font-medium">Operating Hours:</span>
                24 hours 7 days a week
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs font-mono">© {new Date().getFullYear()} Burrell & Co. Mobile Detailing. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-slate-500 font-mono">
            <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};