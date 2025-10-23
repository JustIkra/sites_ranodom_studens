
import React from 'react';
import type { Service } from '../types';
import { services } from '../constants';
import ServiceCard from './ServiceCard';

interface ServicesProps {
    onServiceSelect: (service: Service) => void;
}

const Services: React.FC<ServicesProps> = ({ onServiceSelect }) => {
    return (
        <section id="services" className="py-20 bg-light-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-primary-dark">Для кого мы работаем</h2>
                    <p className="mt-4 text-lg text-gray-600">Мы предлагаем широкий спектр психологических услуг как для частных лиц, так и для организаций. И мы готовы оплатить до 100% стоимости выбранной вами услуги.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} onSelect={() => onServiceSelect(service)} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
