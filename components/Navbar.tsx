import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, Variants, useScroll, useMotionValueEvent } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastYRef.current;
    const isScrollingDown = diff > 0;
    const isPastHeader = latest > 100;

    // Hide navbar if scrolling down and past header, show if scrolling up
    // Only apply hiding logic if menu is NOT open
    if (!isOpen) {
      if (isScrollingDown && isPastHeader) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }

    setScrolled(latest > 20);
    lastYRef.current = latest;
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    isOpen ? '' : `transform ${hidden ? '-translate-y-full' : 'translate-y-0'}`
  } ${
    scrolled ? 'bg-brand-darker/80 backdrop-blur-xl py-4 border-b border-white/5 shadow-lg' : 'bg-transparent py-6'
  }`;

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: "100%", 
      transition: {
        type: "tween",
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  // Helper component for Nav Links with centered underline animation
  const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <Link to={to} className="relative group py-1">
      <span className="text-sm font-medium text-slate-300 group-hover:text-brand-gold transition-colors uppercase tracking-widest relative z-10 font-mono">
        {children}
      </span>
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
    </Link>
  );

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
             <img 
              src="https://placehold.co/180x45/000000/FFC300/png?text=BURRELL+%26+CO." 
              alt="Burrell & Co. Logo" 
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/#services">Services</NavLink>
            <NavLink to="/#testimonials">Reviews</NavLink>
            <Link 
              to="/booking" 
              className="px-6 py-2.5 text-sm font-bold bg-brand-gold text-brand-darker rounded-full uppercase tracking-wider hover:bg-yellow-400 transition-all hover:shadow-[0_0_20px_rgba(255,195,0,0.3)] active:scale-95 font-sans"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white hover:text-brand-gold transition-colors p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden fixed inset-0 bg-brand-darker z-40 flex flex-col justify-end pb-32 items-center space-y-8"
          >
            <motion.div variants={linkVariants}>
              <Link to="/" onClick={() => setIsOpen(false)} className="text-3xl font-serif font-medium text-white hover:text-brand-gold transition-colors">Home</Link>
            </motion.div>
            <motion.div variants={linkVariants}>
              <Link to="/#services" onClick={() => setIsOpen(false)} className="text-3xl font-serif font-medium text-white hover:text-brand-gold transition-colors">Services</Link>
            </motion.div>
            <motion.div variants={linkVariants}>
              <Link to="/#testimonials" onClick={() => setIsOpen(false)} className="text-3xl font-serif font-medium text-white hover:text-brand-gold transition-colors">Testimonials</Link>
            </motion.div>
            <motion.div variants={linkVariants}>
              <Link to="/booking" onClick={() => setIsOpen(false)} className="text-3xl font-serif font-bold text-brand-gold hover:text-white transition-colors">Book Appointment</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};