import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QRCode from '../components/QRCode';

const SponsorsPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="pt-12">
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold font-display text-primary-dark mb-8 text-center">
                Спонсорам и меценатам
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <div className="bg-light-bg p-8 rounded-2xl shadow-lg mb-8">
                  <h2 className="text-2xl font-bold font-display text-primary-dark mb-6">Здравствуйте!</h2>
                  
                  <p className="text-gray-700 mb-6">
                    Меня зовут <a href="https://alexpochikaev.ru/" className="text-primary hover:underline">Александр Почикаев, я психолог</a> работающий в гештальт-подходе, и основатель проекта "МЫ".
                  </p>
                  
                  <p className="text-gray-700 mb-6">
                    <a href="https://rutube.ru/channel/68534018/" className="text-primary hover:underline">МЫ.Подсветка.</a>
                  </p>
                  
                  <p className="text-gray-700 mb-6">
                    "МЫ" будем очень признательны, если вы решите стать нашим постоянным спонсором! Если же вы предпочитаете оказать разовую помощь или заинтересованы в размещении рекламы на сайте проекта "МЫ", мы также открыты к сотрудничеству.
                  </p>
                  
                  <p className="text-gray-700 mb-6">
                    Проект "МЫ" стремится к тому, чтобы помогать людям и способствовать развитию осознанности, раскрытия потенциала, укрепления здоровья и сохранения экологии нашей страны. Для реализации наших целей и расширения нашей деятельности нам необходима ваша поддержка.
                  </p>
                  
                  <p className="text-gray-700 mb-6">
                    Все собранные средства будут направлены на реализацию наших проектов и оказание помощи тем, кто в ней нуждается.
                  </p>
                  
                  <p className="text-gray-700 mb-6">
                    Если вам близки идеи и ценности проекта "МЫ", вы можете внести свой вклад, перейдя по QR-коду.
                  </p>
                  
                  <div className="text-center my-8">
                    <QRCode size={200} />
                    <p className="text-sm text-gray-500 mt-2">QR-код для поддержки проекта</p>
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    Благодарю вас за отзывчивость и готовность помочь!
                  </p>
                  
                  <p className="text-gray-700">
                    С уважением, Почикаев Александр.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border border-gray-200">
                  <h3 className="text-xl font-bold font-display text-primary-dark mb-4">Сотрудничество и предложения:</h3>
                  <p className="text-gray-700">
                    <a href="mailto:my-potencialrf@mail.ru" className="text-primary hover:underline">my-potencialrf@mail.ru</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SponsorsPage;