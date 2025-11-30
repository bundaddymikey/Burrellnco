import React, { useState, useEffect } from 'react';
import { SERVICES } from '../constants';
import { Button } from './Button';
import { CheckCircle, Calendar as CalendarIcon } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    serviceId: SERVICES[0].id,
    preferredDate: '',
    address: ''
  });

  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    setAvailableDates(dates);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]; 
    setFormData(prev => ({ ...prev, preferredDate: dateString }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.preferredDate) {
      alert("Please select a preferred date.");
      return;
    }
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-brand-dark p-8 border border-brand-gold/30 text-center py-16 rounded-2xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-gold/10 text-brand-gold mb-6">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-3xl font-serif font-bold text-white mb-4">Request Received</h3>
        <p className="text-gray-300 mb-8 font-sans">
          Thank you, {formData.name}. We have received your booking request for the <span className="text-brand-gold">{SERVICES.find(s => s.id === formData.serviceId)?.title}</span> on {formData.preferredDate}. 
          Our team will contact you at {formData.phone} shortly to confirm the details.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          Book Another Vehicle
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-brand-dark p-8 md:p-12 border border-white/5 shadow-2xl rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-sans"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-sans"
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-sans"
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400 uppercase tracking-wide flex items-center gap-2 font-mono">
            <CalendarIcon size={14} /> Preferred Date
          </label>
          <div className="hidden">
            <input 
              type="date" 
              name="preferredDate" 
              value={formData.preferredDate} 
              onChange={handleChange}
              required 
            />
          </div>
          <div className="bg-black border border-gray-700 rounded-lg p-2 max-h-48 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {availableDates.map((date) => {
                const isSelected = formData.preferredDate === date.toISOString().split('T')[0];
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                
                return (
                  <button
                    key={date.toString()}
                    type="button"
                    onClick={() => handleDateSelect(date)}
                    className={`
                      flex flex-col items-center justify-center p-2 rounded-md text-sm transition-all duration-200 border
                      ${isSelected 
                        ? 'bg-brand-gold text-black border-brand-gold shadow-[0_0_15px_rgba(255,195,0,0.4)]' 
                        : isWeekend 
                          ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/40 hover:bg-brand-gold/20' 
                          : 'bg-white/5 text-gray-300 border-transparent hover:bg-white/10 hover:border-gray-500'
                      }
                    `}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 font-mono">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className="text-lg font-bold font-mono">
                      {date.getDate()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1 font-mono">*Weekends fill up fast!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Vehicle Make</label>
          <input
            type="text"
            id="vehicleMake"
            name="vehicleMake"
            required
            value={formData.vehicleMake}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-sans"
            placeholder="e.g., BMW, Tesla"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Vehicle Model</label>
          <input
            type="text"
            id="vehicleModel"
            name="vehicleModel"
            required
            value={formData.vehicleModel}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-sans"
            placeholder="e.g., X5, Model 3"
          />
        </div>
      </div>

      <div className="mb-8 space-y-2">
        <label htmlFor="serviceId" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Select Service Package</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              onClick={() => setFormData(prev => ({ ...prev, serviceId: service.id }))}
              className={`cursor-pointer p-4 border rounded-lg transition-all ${formData.serviceId === service.id ? 'bg-brand-gold/10 border-brand-gold shadow-[0_0_10px_rgba(255,195,0,0.1)]' : 'bg-black border-gray-700 hover:border-gray-500'}`}
            >
              <div className="flex justify-between items-center">
                <span className={`font-bold font-serif ${formData.serviceId === service.id ? 'text-brand-gold' : 'text-white'}`}>{service.title}</span>
                <span className="text-gray-400 text-xs font-mono">From ${service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8 space-y-2">
        <label htmlFor="address" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Service Location Address</label>
        <textarea
          id="address"
          name="address"
          required
          rows={3}
          value={formData.address}
          onChange={handleChange}
          className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-sans"
          placeholder="123 Main St, City, Zip"
        />
      </div>

      <Button type="submit" fullWidth variant="primary" className="py-4 text-lg">
        Confirm Booking Request
      </Button>
    </form>
  );
};