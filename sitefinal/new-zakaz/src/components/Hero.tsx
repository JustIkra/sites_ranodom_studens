
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative bg-light-bg pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white to-white"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-highlight-aqua/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold font-display text-primary-dark leading-tight mb-6">
                    Раскрытие потенциала каждого человека и всей страны
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10">
                    МЫ - всероссийский импакт-проект, который делает профессиональную психологическую поддержку доступной каждому человеку, независимо от его финансового положения и физического состояния.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="tel:88002342212" className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Получить консультацию
                    </a>
                    <a href="#donate" className="w-full sm:w-auto bg-white hover:bg-gray-100 text-primary font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border border-primary/20">
                        Поддержать проекты
                    </a>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero;
