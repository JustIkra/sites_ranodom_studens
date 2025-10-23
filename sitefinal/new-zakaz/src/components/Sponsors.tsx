import React from 'react';

const Sponsors: React.FC = () => {
  return (
    <section id="sponsors" className="py-20 bg-light-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary-dark">Наши спонсоры</h2>
          <p className="mt-4 text-lg text-gray-600">Мы благодарим наших партнеров и спонсоров за поддержку проекта</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Заглушки для спонсоров */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200/50 text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500 font-bold">Лого</span>
            </div>
            <h3 className="font-bold text-primary-dark mb-2">Спонсор 1</h3>
            <p className="text-sm text-gray-600">Описание спонсора</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200/50 text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500 font-bold">Лого</span>
            </div>
            <h3 className="font-bold text-primary-dark mb-2">Спонсор 2</h3>
            <p className="text-sm text-gray-600">Описание спонсора</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200/50 text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500 font-bold">Лого</span>
            </div>
            <h3 className="font-bold text-primary-dark mb-2">Спонсор 3</h3>
            <p className="text-sm text-gray-600">Описание спонсора</p>
          </div>
        </div>

        {/* Секция для рекламы */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-primary/20 text-center">
          <h3 className="text-2xl font-bold font-display text-primary-dark mb-4">Место для рекламы</h3>
          <p className="text-gray-600 mb-6">Здесь может быть размещена ваша реклама</p>
          <div className="bg-gray-100 p-8 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">Рекламный блок</p>
            <p className="text-sm text-gray-400 mt-2">Размер: 300x250px</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
