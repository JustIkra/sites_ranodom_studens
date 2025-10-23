import React from 'react';

interface LogoProps { className?: string }

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <div className={`overflow-hidden rounded-lg bg-white ${className || ''}`}> 
            <img
                src="/images/Logo2.jpg"
                alt="Логотип МЫ"
                className="h-full w-full object-cover"
                style={{ objectPosition: '50% 35%' }}
            />
        </div>
    );
};

export default Logo;