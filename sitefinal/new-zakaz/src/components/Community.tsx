
import React from 'react';
import { phoneNumber } from '../constants';

const Community: React.FC = () => {
  return (
    <section id="community" className="py-20 bg-primary-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Сообщество «МЫ ТуТ»</h2>
          <p className="text-lg text-gray-200 mb-8">
            Чувствуете, что накопилось много невысказанного? В каждом городе мы создали открытые сообщества, где вы можете свободно высказаться, освободиться от груза и найти поддержку. Это место, где можно делиться опытом и чувствовать себя частью чего-то большего.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="w-full sm:w-auto bg-white hover:bg-gray-200 text-primary-dark font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                Узнать адрес и время
            </a>
            <a href="tel:88002342212" className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                Создать группу + в своем городе
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
