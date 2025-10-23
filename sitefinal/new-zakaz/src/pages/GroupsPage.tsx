import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Group {
  id: string;
  title: string;
  description: string;
  schedule: string;
  duration: string;
  price: string;
  maxParticipants: number;
  currentParticipants: number;
  leader: string;
  type: 'therapy' | 'support' | 'development';
  level: 'beginner' | 'intermediate' | 'advanced';
  image: string;
}

const groups: Group[] = [
  {
    id: '1',
    title: 'Группы в Ростове на Дону и онлайн',
    description: 'Присоединяйтесь к нашим терапевтическим группам и группам поддержки в Ростове на Дону и онлайн. Мы предлагаем различные форматы работы: от групповой терапии до поддержки в сложных жизненных ситуациях.',
    schedule: 'Гибкий график',
    duration: 'По запросу',
    price: 'От 2000 руб./месяц',
    maxParticipants: 12,
    currentParticipants: 8,
    leader: 'Команда специалистов',
    type: 'support',
    level: 'beginner',
    image: '/images/group-therapy.jpg'
  },
  
];

const GroupsPage: React.FC = () => {
  // Убрали фильтрацию: показываем простой список карточек с фото, описанием и ценой

  const handleBackToMain = () => {
    window.location.hash = '#';
  };

  const handleCall = () => {
    window.location.href = 'tel:+78002342212';
  };

  // placeholder removed: unused handler

  const filteredGroups = groups;


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
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold font-display text-primary-dark mb-6">
                Группы в Ростове-на-Дону и онлайн
              </h1>
              <p className="text-lg text-gray-600">
                Присоединяйтесь к нашим терапевтическим группам и группам поддержки в Ростове-на-Дону и онлайн. 
                Здесь вы найдете понимание, поддержку единомышленников и профессиональную помощь психологов.
              </p>
            </div>

            {/* Groups grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className={`bg-white rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                    ''
                  }`}
                >
                  {(
                    // Обычная карточка группы
                    <>
                      <div>
                        <img
                          src={group.image}
                          alt={group.title}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-2xl font-bold font-display text-primary-dark mb-3">
                          {group.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {group.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-primary">
                            {group.price}
                          </div>
                          
                          <button 
                            onClick={handleCall}
                            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
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

            {filteredGroups.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Группы с выбранными параметрами не найдены.</p>
              </div>
            )}

            {/* Additional info */}
            <div className="mt-16 text-center bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto border border-primary/20">
              <h3 className="text-2xl font-bold font-display text-primary-dark mb-4">
                Как записаться в группу?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Выберите группу</h4>
                  <p className="text-gray-600 text-sm">Изучите описание групп и выберите подходящую для вас</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Свяжитесь с нами</h4>
                  <p className="text-gray-600 text-sm">Позвоните по телефону или оставьте заявку через сайт</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Начните терапию</h4>
                  <p className="text-gray-600 text-sm">После консультации присоединяйтесь к группе</p>
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

export default GroupsPage;

