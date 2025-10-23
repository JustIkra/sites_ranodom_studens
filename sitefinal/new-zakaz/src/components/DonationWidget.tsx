
import React, { useEffect, useRef, useState } from 'react';
import type { Project } from '../types';
import ChevronDownIcon from './icons/ChevronDownIcon';
import QRCode from './QRCode';

interface DonationWidgetProps {
    project: Project;
    isOpen: boolean;
    onToggle: () => void;
}

const DonationWidget: React.FC<DonationWidgetProps> = ({ project, isOpen, onToggle }) => {
    const { goal, collected, purpose } = project.donationInfo;
    const targetPercentage = Math.round((collected / goal) * 100);

    // Animated counters
    const [animatedCollected, setAnimatedCollected] = useState(0);
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isOpen) {
            // collapse → reset to 0 for next reveal animation
            setAnimatedCollected(0);
            setAnimatedPercentage(0);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            return;
        }

        const durationMs = 1200;
        const startTs = performance.now();

        const animate = (now: number) => {
            const elapsed = now - startTs;
            const t = Math.min(1, elapsed / durationMs);
            // easeOutCubic
            const ease = 1 - Math.pow(1 - t, 3);
            setAnimatedCollected(Math.round(collected * ease));
            setAnimatedPercentage(Math.round(targetPercentage * ease));
            if (t < 1) {
                rafRef.current = requestAnimationFrame(animate);
            }
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isOpen, collected, targetPercentage]);

    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center text-left p-6 hover:bg-gray-50 transition-colors"
            >
                <span className="text-lg font-bold font-display text-primary-dark">{project.title}</span>
                <ChevronDownIcon className={`w-6 h-6 text-primary transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-6 pt-0">
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                        <div className="md:col-span-2">
                            <p className="font-semibold text-gray-700 mb-2">Цель сбора:</p>
                            <p className="text-gray-600 mb-4">{purpose}</p>
                            <div className="w-full bg-gray-200 rounded-full h-4 mb-2 shadow-inner">
                                <div className="bg-gradient-to-r from-highlight-aqua to-primary h-4 rounded-full" style={{ width: `${animatedPercentage}%` }}></div>
                            </div>
                            <div className="text-sm flex justify-between font-semibold">
                                <span className="text-primary">{animatedCollected.toLocaleString('ru-RU')} ₽</span>
                                <span className="text-gray-500">{goal.toLocaleString('ru-RU')} ₽</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                           <QRCode size={150} />
                           <p className="text-xs text-gray-500 text-center mt-2">QR-код для поддержки проекта</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationWidget;
