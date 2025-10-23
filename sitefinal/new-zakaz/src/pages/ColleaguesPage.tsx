import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Psychologist {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  description: string;
  photo: string;
  contact: string;
  services?: string[];
  targetAudience?: string[];
  price?: string;
}

const psychologists: Psychologist[] = [
  {
    id: '1',
    name: 'Александр Почикаев',
    specialization: 'Гештальт-терапевт',
    experience: '8 лет',
    description: 'Гештальт-терапевт, основатель проекта. Специализируется на работе с тревожными расстройствами, депрессией, семейными конфликтами и зависимостями. Помогает людям раскрыть свой потенциал и найти путь к осознанной жизни.',
    photo: '/images/alexander-black-sweater.jpg',
    contact: '8 800 234 22 12',
    services: [
      'Индивидуальные консультации',
      'Семейная терапия',
      'Терапия тревожности',
      'Коучинг личностного роста',
      'Поддержка родителей',
      'Кризисная помощь',
      'Трезвая жизнь',
      'Встречи онлайн и на выезде'
    ],
    targetAudience: [
      'Со взрослыми',
      'С детьми и подростками',
      'С семьями и парами',
      'С участниками СВО, их родственниками и близкими',
      'Со спортсменами и командами',
      'С организациями и бизнесом'
    ],
    price: 'От 3500р'
  },
  
];

const ColleaguesPage: React.FC = () => {
  const handleBackToMain = () => {
    window.location.hash = '#';
  };

  const handleCall = () => {
    window.location.href = 'tel:+78002342212';
  };

  // placeholder removed: unused handler

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="py-20 bg-light-bg min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back button */}
            <div className="mb-8">
              <button
                onClick={handleBackToMain}
                className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Вернуться на главную
              </button>
            </div>

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-display text-primary-dark mb-6">
                Наша команда в Ростове-на-Дону
              </h1>
              <p className="text-lg text-gray-600">
                Наша команда состоит из квалифицированных психологов с многолетним опытом работы. 
                Каждый специалист имеет свою уникальную специализацию и подход к решению проблем.
              </p>
            </div>

            {/* Psychologists grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {psychologists.map((psychologist) => (
                <div
                  key={psychologist.id}
                  className={`bg-white rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                    ''
                  }`}
                >
                  {(
                    // Обычная карточка психолога
                    <>
                      <div className="relative">
                        <img
                          src={psychologist.photo}
                          alt={psychologist.name}
                          className="w-full h-80 object-cover"
                          style={{ objectPosition: 'center 20%' }}
                        />
                        
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-2xl font-bold font-display text-primary-dark mb-2">
                          {psychologist.name}
                        </h3>
                        
                        <div className="mb-4">
                          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                            {psychologist.specialization}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {psychologist.description}
                        </p>

                        {/* Что предлагаю и С кем я работаю - в две колонки */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          {/* Что предлагаю */}
                          {psychologist.services && psychologist.services.length > 0 && (
                            <div>
                              <h4 className="text-lg font-bold text-primary-dark mb-3">Что предлагаю:</h4>
                              <ol className="space-y-1">
                                {psychologist.services.map((service, index) => (
                                  <li key={index} className="text-gray-700 text-sm">
                                    {index + 1}. {service}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          )}

                          {/* С кем я работаю */}
                          {psychologist.targetAudience && psychologist.targetAudience.length > 0 && (
                            <div>
                              <h4 className="text-lg font-bold text-primary-dark mb-3">С кем я работаю:</h4>
                              <ol className="space-y-1">
                                {psychologist.targetAudience.map((audience, index) => (
                                  <li key={index} className="text-gray-700 text-sm">
                                    {index + 1}. {audience}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          )}
                        </div>

                        {/* Цена и кнопка в одной строке */}
                        <div className="flex items-center justify-between gap-4">
                          {psychologist.price && (
                            <div className="text-lg font-bold text-primary-dark">
                              {psychologist.price}
                            </div>
                          )}
                          <button 
                            onClick={handleCall}
                            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex-shrink-0"
                          >
                            Записаться
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Additional info */}
            <div className="mt-16 text-center bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto border border-primary/20">
              <h3 className="text-2xl font-bold font-display text-primary-dark mb-4">
                Почему выбирают наших специалистов?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Сертифицированные специалисты</h4>
                  <p className="text-gray-600 text-sm">Все наши психологи имеют высшее образование и регулярно повышают квалификацию</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Индивидуальный подход</h4>
                  <p className="text-gray-600 text-sm">Каждый клиент получает персональную программу терапии, адаптированную под его потребности</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Доступные цены</h4>
                  <p className="text-gray-600 text-sm">Мы предлагаем качественную психологическую помощь по доступным ценам</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ColleaguesPage;

