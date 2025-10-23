
import React, { useState, useEffect } from 'react';
import { phoneNumber } from '../constants';
import Logo from './icons/Logo';
import PhoneIcon from './icons/PhoneIcon';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { href: '#about', label: 'О нас' },
    { href: '#services', label: 'Для кого мы' },
    { href: '#projects', label: 'Наши проекты' },
    { href: '#psychologists', label: 'Психологам' },
    { href: '#sponsors', label: 'Спонсорам и меценатам' },
  ];

  const NavLinksComponent: React.FC = () => (
    <>
      {navLinks.map((link) => (
        <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block md:inline-block px-4 py-2 text-gray-600 hover:text-primary font-semibold transition-colors duration-300">
          {link.label}
        </a>
      ))}
    </>
  );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="flex items-center space-x-2">
            <Logo className="h-10 w-10" />
            <span className="font-display font-extrabold text-2xl">
              <span className="text-green-700">М</span><span className="text-orange-500">Ы</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-2">
            <NavLinksComponent />
          </nav>

          <div className="flex items-center space-x-4">
             <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="hidden sm:flex items-center space-x-2 text-sm font-semibold text-primary-dark hover:text-primary">
              <PhoneIcon className="h-5 w-5" />
              <span>{phoneNumber}</span>
            </a>
            <button
              className="md:hidden text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Открыть меню"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col items-center py-4">
            <NavLinksComponent />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
