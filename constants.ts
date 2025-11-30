import { ServicePackage, ServiceType, Testimonial } from './types';

export const SERVICES: ServicePackage[] = [
  {
    id: 'maintenance-wash',
    title: 'Maintenance Wash',
    type: ServiceType.MAINTENANCE,
    price: 65,
    pricingDetails: "Sedans: $65+ | SUVs/Trucks: $95+",
    duration: '1 - 1.5 Hours',
    description: 'Ideal for regular upkeep between full details or prepping for special occasions.',
    features: [
      'Exterior hand wash',
      'Full interior vacuum (including trunk)',
      'Tire and rim scrub with dressing',
      'Streak-free window cleaning',
      'Light interior wipe-down'
    ],
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'full-interior',
    title: 'Full Interior Detail',
    type: ServiceType.INTERIOR,
    price: 180,
    pricingDetails: "Sedan: $180+ | SUV/Truck: $200+",
    duration: '2.5 - 3.5 Hours',
    description: 'For a complete refresh inside your vehicle.',
    features: [
      'Full vacuum including trunk',
      'Deep clean of dashboard, vents, and panels',
      'Carpet & seat shampoo',
      'Leather or vinyl conditioning',
      'Steam sanitization',
      'Streak-free window cleaning'
    ],
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1000&auto=format&fit=crop',
    popular: true
  },
  {
    id: 'full-exterior',
    title: 'Full Exterior Detail',
    type: ServiceType.EXTERIOR,
    price: 250,
    pricingDetails: "Sedans: $250+ | SUVs/Trucks: $300+",
    duration: '3 - 4 Hours',
    description: 'Deep cleaning and decontamination for a glass-like finish.',
    features: [
      'Premium hand wash',
      'Iron fallout & clay bar treatment',
      'Wheel/tire cleaning & dressing',
      'Bug & tar removal',
      '3-month paint sealant',
      'Ideal prep before waxing or ceramic coating'
    ],
    image: 'https://images.unsplash.com/photo-1552930294-de5b0f175d8e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'engine-bay',
    title: 'Engine Bay Cleaning',
    type: ServiceType.ENGINE,
    price: 125,
    pricingDetails: "$125+",
    duration: '45 Mins',
    description: 'Detailed engine compartment cleaning.',
    features: [
      'Detailed engine compartment cleaning',
      'Safe degreasing and dressing',
      'Protects plastic and rubber components'
    ],
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1000&auto=format&fit=crop'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marcus Chen',
    role: 'Tesla Model S Owner',
    content: 'Burrell & Co. transformed my car. The maintenance wash keeps it looking fresh, and the mobile service is so convenient.',
    rating: 5,
    avatar: 'https://picsum.photos/100/100?random=5'
  },
  {
    id: 't2',
    name: 'Sarah Jenkins',
    role: 'Range Rover Owner',
    content: 'With two kids and a dog, my interior was a disaster. The Full Interior Detail performed a miracle. It looks brand new again.',
    rating: 5,
    avatar: 'https://picsum.photos/100/100?random=6'
  },
  {
    id: 't3',
    name: 'David Thorne',
    role: 'Porsche 911 Enthusiast',
    content: 'Professional, punctual, and meticulous. They treated my 911 with the respect it deserves during the exterior detail.',
    rating: 5,
    avatar: 'https://picsum.photos/100/100?random=7'
  }
];