import React, { useRef } from 'react';
import { SERVICES } from '../constants';
import { ServiceCard } from './ServiceCard';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      id="services" 
      ref={containerRef} 
      className="py-24 bg-brand-darker relative scroll-mt-24 overflow-hidden"
    >
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          style={{ y }}
          className="relative w-full h-[120%] -top-[10%]"
        >
          <div className="absolute inset-0 bg-brand-darker/95 z-10" />
          <img 
            src="https://picsum.photos/1920/1080?grayscale&blur=2" 
            alt="Background Texture" 
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 font-mono">Our Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Premium Detailing Packages</h3>
          <p className="text-slate-400 font-sans">
            Choose the perfect level of care for your vehicle. From quick refreshers to complete restoration and ceramic protection.
          </p>
        </div>

        {/* Mobile: Horizontal Scroll Snap | Desktop: Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-6 px-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:pb-0 md:mx-0 md:px-0 md:overflow-visible">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-center md:w-auto md:snap-align-none"
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};