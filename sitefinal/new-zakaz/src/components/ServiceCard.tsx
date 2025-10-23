
import React from 'react';
import type { Service } from '../types';

interface ServiceCardProps {
    service: Service;
    onSelect: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
    return (
        <div 
            onClick={onSelect} 
            className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200/50 cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
        >
            <div className="flex-shrink-0 mb-4 p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary">
                <service.icon className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold font-display text-primary-dark mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm mb-4">Нажмите, чтобы узнать больше о том, как мы можем помочь.</p>
            <span className="font-semibold text-primary group-hover:underline">Подробнее →</span>
        </div>
    );
};

export default ServiceCard;
