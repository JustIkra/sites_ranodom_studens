import React, { useEffect, useRef, useState } from 'react';

const OurMission: React.FC = () => {
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
      id="our-mission" 
      className={`py-20 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Декоративные элементы для плавных переходов */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      {/* Мягкие тени по краям */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Основной текст слева - занимает 2 колонки */}
            <div className={`lg:col-span-2 space-y-6 transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-primary-dark leading-tight">
                Наша миссия — осознанное общество и доступная психологическая помощь
              </h3>
              
              <p className="text-gray-700 leading-relaxed text-lg">
                Мы хотим, чтобы каждый человек, независимо от его финансового положения и физического состояния, имел возможность получить поддержку в сложные периоды жизни, научиться справляться со стрессом и тревожностью, зависимостями, а также раскрыть свой потенциал.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                В нашей команде собраны лучшие и проверенные психологи и психотерапевты со всей страны. Мы не просто оказываем психологическую помощь, мы стремимся изменить отношение общества к психическому здоровью, сделать его более открытым и доступным.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Мы регулярно посещаем детские дома, тюрьмы, навещаем инвалидов, поддерживаем группы СВО и оказываем другие необходимые услуги. Мы верим, что каждый человек заслуживает внимания и поддержки, и стремимся быть рядом с теми, кто в этом особенно нуждается.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Для продолжения нашей работы нам необходима ваша помощь. Собранные средства пойдут на оплату услуг квалифицированных психологов, организацию групповых встреч, а также на организацию поездок в детские дома, тюрьмы, к инвалидам и другие места, где наша помощь так необходима.
              </p>
            </div>

            {/* Карточка с цитатой справа - занимает 1 колонку */}
            <div className={`lg:col-span-1 transform transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-300">
                {/* Фото Александра Почикаева */}
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-2 border-gray-300">
                  <img 
                    src="/images/alexander-black-sweater.jpg" 
                    alt="Александр Почикаев"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Имя маленькое */}
                <p className="text-sm text-gray-600 text-center mb-1">Александр Почикаев</p>
                
                {/* Имя большое */}
                <h4 className="text-xl font-bold text-primary-dark text-center mb-2">Александр Почикаев</h4>
                
                {/* Должность */}
                <p className="text-sm text-gray-600 text-center mb-6">Гештальт-терапевт, основатель проекта</p>
                
                {/* Цитата */}
                <blockquote className="text-gray-700 italic text-sm leading-relaxed">
                  "Я не просто помогаю людям, я сам прошел через этот путь. Я знаю, что без психотерапии раскрыть свой потенциал было бы невозможно. В 2022 году родилась идея – сделать эту помощь доступной каждому."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
