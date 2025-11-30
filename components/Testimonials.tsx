import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 font-mono">Client Stories</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">Trusted by Luxury Owners</h3>
          </div>
          <div className="flex gap-1 text-brand-gold mt-4 md:mt-0">
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
            <span className="ml-2 text-white font-bold text-xl font-mono">5.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="bg-black p-8 rounded-2xl border border-white/5 relative hover:border-brand-gold/30 transition-colors">
              <Quote className="absolute top-8 right-8 text-brand-gold/20" size={48} />
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-gold/50"
                />
                <div>
                  <h4 className="text-white font-bold font-sans">{testimonial.name}</h4>
                  <p className="text-brand-gold text-xs uppercase tracking-wider font-mono">{testimonial.role}</p>
                </div>
              </div>

              <p className="text-gray-300 italic leading-relaxed font-serif">
                "{testimonial.content}"
              </p>
              
              <div className="mt-4 flex gap-1 text-brand-gold">
                 {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};