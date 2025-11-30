import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Loader2, History } from 'lucide-react';

const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1552930294-de5b0f175d8e?q=80&w=1000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1507138451611-31e51e23463e?q=80&w=1000&auto=format&fit=crop"
];

export const AboutUs: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [isMissionExpanded, setIsMissionExpanded] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); 
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  useEffect(() => {
    setIsImageLoading(true);
  }, [currentImageIndex]);

  useEffect(() => {
    const nextIndex = (currentImageIndex + 1) % CAROUSEL_IMAGES.length;
    const img = new Image();
    img.src = CAROUSEL_IMAGES[nextIndex];
  }, [currentImageIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCTA(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0, rootMargin: "0px" }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  const particles = useMemo(() => [...Array(25)].map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    sway: Math.random() * 30 - 15
  })), []);

  const goldDust = useMemo(() => [...Array(12)].map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 5 + 3,
    delay: Math.random() * 2
  })), []);

  return (
    <section id="about" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

         <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             rotate: [0, 45, 0],
             opacity: [0.03, 0.08, 0.03]
           }}
           transition={{ 
             duration: 15, 
             repeat: Infinity, 
             ease: "linear" 
           }}
           className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-brand-gold rounded-full blur-[100px]"
         />
         
         <motion.div 
            animate={{ 
             scale: [1, 1.3, 1],
             x: [0, -50, 0],
             opacity: [0.02, 0.06, 0.02]
           }}
           transition={{ 
             duration: 20, 
             repeat: Infinity, 
             ease: "easeInOut" 
           }}
           className="absolute -left-20 -bottom-20 w-[700px] h-[700px] bg-white rounded-full blur-[120px]"
         />

         {particles.map((p, i) => (
           <motion.div
             key={i}
             className="absolute rounded-full bg-brand-gold/40"
             initial={{ 
               left: `${p.left}%`, 
               top: `${p.top}%`, 
               opacity: 0 
             }}
             animate={{ 
               y: [0, -100],
               x: [0, p.sway],
               opacity: [0, 0.6, 0],
               scale: [0.5, 1, 0.5]
             }}
             transition={{ 
               duration: p.duration, 
               repeat: Infinity, 
               delay: p.delay,
               ease: "easeInOut" 
             }}
             style={{
               width: p.size,
               height: p.size,
             }}
           />
         ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
               {goldDust.map((p, i) => (
                  <motion.div
                    key={`text-${i}`}
                    className="absolute rounded-full bg-brand-gold blur-[1px]"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      y: [0, -20, 0],
                      opacity: [0, 0.4, 0],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{ 
                      duration: p.duration, 
                      repeat: Infinity, 
                      delay: p.delay,
                      ease: "easeInOut" 
                    }}
                    style={{
                      left: `${p.left}%`,
                      top: `${p.top}%`,
                      width: p.size,
                      height: p.size,
                    }}
                  />
               ))}
            </div>

            <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 font-mono">Our Story</h2>
            <motion.h3 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.1 }}
              className="text-3xl md:text-5xl font-serif font-bold text-white mb-6"
            >
              Who We Are.
            </motion.h3>
            
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-sans">
              <p>
                At <span className="text-white font-semibold">Burrell & Co.</span>, we believe every car deserves showroom level care, inside and out. We specialize in high quality professional detailing that brings back that fresh off the lot feel.
              </p>
              <p>
                Our team is passionate about precision and treats every vehicle like it is our own. Customer satisfaction is not a goal for us, it is the standard we work by.
              </p>
              <p>
                Whether it is a quick wash or a full interior restoration, we are here to deliver results that make you look twice.
              </p>

              <div className="mt-8 mb-6 bg-black/40 rounded-xl border-l-4 border-brand-gold backdrop-blur-sm overflow-hidden transition-colors hover:bg-black/50">
                <button 
                  onClick={() => setIsMissionExpanded(!isMissionExpanded)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                >
                  <h4 className="text-white font-serif font-bold text-xl group-hover:text-brand-gold transition-colors">Our Mission</h4>
                  {isMissionExpanded ? <ChevronUp className="text-brand-gold" /> : <ChevronDown className="text-brand-gold" />}
                </button>
                
                <AnimatePresence>
                  {isMissionExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-base text-slate-300">
                          To elevate the standard of mobile car care by combining convenience with uncompromising quality. We pledge to use premium, eco-conscious products and advanced techniques to protect your investment, ensuring every client feels the pride of driving a showroom-ready vehicle.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-serif font-bold text-brand-gold mb-1">100%</div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-mono">Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-brand-gold mb-1">24/7</div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-mono">Availability</div>
              </div>
            </div>

            <div className="mt-10" ref={buttonRef}>
              <Button to="/booking" variant="primary" className="w-full sm:w-auto shadow-lg hover:shadow-brand-gold/20">
                Experience the Difference - Book Now
              </Button>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="relative"
          >
            <div className="absolute -inset-10 pointer-events-none -z-10">
               {goldDust.map((p, i) => (
                  <motion.div
                    key={`img-${i}`}
                    className="absolute rounded-full bg-brand-gold blur-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      y: [0, -30, 0],
                      x: [0, 10, 0],
                      opacity: [0, 0.5, 0],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{ 
                      duration: p.duration + 2, 
                      repeat: Infinity, 
                      delay: p.delay,
                      ease: "easeInOut" 
                    }}
                    style={{
                      left: `${p.left}%`,
                      top: `${p.top}%`,
                      width: p.size * 1.5,
                      height: p.size * 1.5,
                    }}
                  />
               ))}
            </div>

            <div className="aspect-square relative z-10 group perspective-[1000px]">
              <motion.div
                className="w-full h-full relative transition-all duration-700"
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 12 }}
              >
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-brand-darker"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-brand-darker z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand-darker" />
                    
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5, 
                        ease: "linear" 
                      }}
                    />

                    <AnimatePresence>
                      {isImageLoading && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative z-10 flex flex-col items-center gap-3"
                        >
                          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-brand-gold"
                              initial={{ x: "-100%" }}
                              animate={{ x: "100%" }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                          </div>
                          <span className="text-xs text-brand-gold/70 tracking-widest uppercase font-mono">Loading Content</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <AnimatePresence>
                    <motion.img 
                      key={currentImageIndex}
                      src={CAROUSEL_IMAGES[currentImageIndex]}
                      alt="Burrell & Co Team Detailing" 
                      onLoad={() => setIsImageLoading(false)}
                      className="w-full h-full object-cover absolute inset-0 z-10"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        opacity: { duration: 1.2, ease: "easeInOut" }, 
                        scale: { duration: 8, ease: "easeOut" } 
                      }}
                    />
                  </AnimatePresence>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-lg">
                       <p className="text-white font-serif italic text-lg">
                         "Precision isn't just a requirement, it's our passion."
                       </p>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-between p-4 z-30 pointer-events-none">
                    <button 
                      onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                      className="p-3 bg-black/20 text-white/90 rounded-full hover:bg-brand-gold hover:text-black transition-all duration-300 backdrop-blur-sm pointer-events-auto border border-white/10 shadow-lg hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                      className="p-3 bg-black/20 text-white/90 rounded-full hover:bg-brand-gold hover:text-black transition-all duration-300 backdrop-blur-sm pointer-events-auto border border-white/10 shadow-lg hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </div>

                  <div className="absolute top-6 right-6 flex gap-2 z-30">
                    {CAROUSEL_IMAGES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${idx === currentImageIndex ? 'bg-brand-gold w-8' : 'bg-white/40 w-4 hover:bg-white/80'}`}
                        aria-label={`View image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/30 bg-brand-darker p-10 flex flex-col justify-center items-center text-center"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold/10 to-transparent opacity-40" />
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 bg-brand-gold/10 rounded-full flex items-center justify-center border border-brand-gold/20 text-brand-gold">
                      <History size={32} />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-4">Our Roots</h3>
                    <div className="w-12 h-1 bg-brand-gold mx-auto mb-6 rounded-full"></div>
                    <p className="text-slate-300 leading-relaxed text-lg font-sans">
                      Founded on the principle of perfection. What started as a passion project has grown into the region's premier mobile detailing service. Since 2018, we've treated every vehicle with the respect of a showroom masterpiece, defining what it means to have a true <span className="text-brand-gold font-serif italic">Burrell & Co.</span> shine.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="absolute top-6 -right-6 w-full h-full border-2 border-brand-gold/20 rounded-2xl -z-10 hidden md:block"></div>
          </motion.div>

        </div>
      </div>

      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-brand-darker/95 backdrop-blur-lg border-t border-brand-gold/20 z-50 flex justify-center md:justify-end md:pr-8 md:pb-6 md:bg-transparent md:border-none md:backdrop-blur-none pointer-events-none"
          >
             <div className="pointer-events-auto w-full md:w-auto shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <Button 
                  to="/booking" 
                  variant="primary" 
                  fullWidth 
                  className="shadow-[0_0_20px_rgba(255,195,0,0.4)] text-sm md:text-base py-4 md:py-3"
                >
                   Book Your Detail Now
                </Button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};