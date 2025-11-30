import React, { useRef, useState } from 'react';
import { Check, Clock } from 'lucide-react';
import { ServicePackage } from '../types';
import { Button } from './Button';

interface ServiceCardProps {
  service: ServicePackage;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative bg-brand-dark border ${service.popular ? 'border-brand-gold' : 'border-white/5'} flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:z-10 overflow-hidden rounded-2xl`}
    >
      
      {/* Spotlight Effect Overlay */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,195,0,0.1), transparent 40%)`
        }}
      />

      {service.popular && (
        <div className="absolute top-0 right-0 bg-brand-gold text-black text-xs font-bold px-4 py-1 uppercase tracking-wider z-10 rounded-bl-lg shadow-md font-mono">
          Most Popular
        </div>
      )}

      <div className="h-48 overflow-hidden relative group/image rounded-t-2xl z-10">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors z-10" />
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
         {/* Image Tooltip/Overlay */}
         <div className="absolute inset-0 z-20 flex items-center justify-center p-6 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
            <p className="text-white text-center font-medium text-sm leading-relaxed drop-shadow-md font-sans">
              {service.description}
            </p>
         </div>
      </div>

      <div className="p-6 flex-grow flex flex-col z-10 relative">
        <div className="flex justify-between items-start mb-4 gap-2">
          <div className="group/title relative">
            <h3 className="text-xl font-serif font-bold text-white cursor-help group-hover:text-brand-gold transition-colors">{service.title}</h3>
            {/* Title Tooltip */}
            <div className="absolute bottom-full left-0 w-64 mb-2 p-3 bg-black border border-brand-gold/30 text-gray-200 text-xs rounded-lg shadow-xl opacity-0 invisible group-hover/title:opacity-100 group-hover/title:visible transition-all duration-200 translate-y-1 group-hover/title:translate-y-0 pointer-events-none z-30 font-sans">
              {service.description}
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm mt-1 font-mono">
              <Clock size={14} />
              <span>{service.duration}</span>
            </div>
          </div>
          
          {/* Pricing Display */}
          <div className="flex flex-col items-end text-right font-mono">
            {service.pricingDetails ? (
               <div className="text-sm font-bold text-brand-gold whitespace-pre-line leading-tight">
                 {service.pricingDetails.split('|').map((line, i) => (
                   <div key={i}>{line.trim()}</div>
                 ))}
               </div>
            ) : (
               <div className="text-2xl font-bold text-brand-gold">${service.price}</div>
            )}
          </div>
        </div>

        <div className="relative group/tooltip mb-6">
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 group-hover:text-white transition-colors font-sans">
            {service.description}
          </p>
        </div>

        <div className="space-y-2 mb-8 flex-grow">
          {service.features.map((feature, idx) => (
            <div 
              key={idx} 
              className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-white/5 transition-all duration-300 group/feature cursor-default"
            >
              <div className="mt-1 flex-shrink-0 text-brand-gold group-hover/feature:scale-110 group-hover/feature:rotate-12 transition-transform duration-300">
                <Check size={16} />
              </div>
              <span className="text-sm text-gray-300 group-hover/feature:text-white group-hover/feature:translate-x-1 transition-all duration-300 font-sans">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <Button to="/booking" variant={service.popular ? 'primary' : 'outline'} fullWidth>
          Book This Package
        </Button>
      </div>
    </div>
  );
};