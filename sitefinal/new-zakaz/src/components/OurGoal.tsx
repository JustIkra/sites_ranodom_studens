import React, { useEffect, useRef, useState } from 'react';

const OurGoal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="our-goal" 
      className={`py-20 bg-white relative transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-3xl md:text-4xl font-bold font-display text-primary-dark leading-tight mb-6">
              НАША ЦЕЛЬ-собирать средства и ресурсы, чтобы оплачивать услуги квалифицированных психологов и реализовывать программы по развитию осознанности, с помощью личной и групповой психотерапии.
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl mx-auto">
              <p>
                Мы хотим, чтобы каждый человек, независимо от его финансового положения и физического состояния, имел возможность получить поддержку в сложные периоды жизни, научиться справляться со стрессом и тревожностью, зависимостями, а также раскрыть свой потенциал.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurGoal;
