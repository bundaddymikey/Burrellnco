import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { AboutUs } from './components/AboutUs';
import { Testimonials } from './components/Testimonials';
import { BookingForm } from './components/BookingForm';
import { ChatAssistant } from './components/ChatAssistant';
import { Footer } from './components/Footer';
import { AnimatePresence, motion } from 'framer-motion';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const HomePage: React.FC = () => (
  <PageWrapper>
    <Hero />
    <Services />
    <AboutUs />
    <Testimonials />
  </PageWrapper>
);

const BookingPage: React.FC = () => (
  <PageWrapper>
    <div className="pt-24 pb-12 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-white mb-4">Secure Your Appointment</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Select your package and preferred time. We come to your home or office fully equipped.
        </p>
      </div>
      <BookingForm />
    </div>
  </PageWrapper>
);

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-brand-darker text-white">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}