export enum ServiceType {
  MAINTENANCE = 'Maintenance Wash',
  INTERIOR = 'Full Interior Detail',
  EXTERIOR = 'Full Exterior Detail',
  ENGINE = 'Engine Bay Cleaning'
}

export interface ServicePackage {
  id: string;
  title: string;
  type: ServiceType;
  price: number;
  pricingDetails?: string;
  duration: string;
  description: string;
  features: string[];
  image: string;
  popular?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}