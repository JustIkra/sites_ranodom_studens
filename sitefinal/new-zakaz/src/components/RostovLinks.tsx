import React from 'react';

const RostovLinks: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-primary-dark leading-tight">
            Узнайте больше о наших специалистах и
            <br className="hidden sm:block" /> возможностях получения помощи
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Colleagues card */}
          <a
            href="#colleagues"
            className="block group rounded-2xl p-8 shadow-lg border border-emerald-100 bg-emerald-50/70 hover:bg-white hover:border-emerald-200 transition-colors duration-300"
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-600/10 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="3" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-center text-2xl font-bold font-display text-emerald-900 mb-3 group-hover:text-emerald-700">
              Наша команда в Ростове-на-Дону
            </h3>
            <p className="text-center text-gray-600 max-w-md mx-auto">
              Познакомьтесь с нашей командой квалифицированных психологов в Ростове-на-Дону. Каждый специалист имеет уникальную специализацию и многолетний опыт.
            </p>
            <div className="mt-6 text-center">
              <span className="inline-flex items-center gap-2 text-emerald-700 font-medium group-hover:text-emerald-800">
                Узнать больше
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
              </span>
            </div>
          </a>

          {/* Groups card */}
          <a
            href="#groups"
            className="block group rounded-2xl p-8 shadow-lg border border-purple-200 bg-purple-50/80 hover:bg-white hover:border-purple-300 transition-colors duration-300"
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-purple-600/10 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4h-2" />
                <circle cx="9" cy="7" r="3" />
                <circle cx="17" cy="7" r="3" />
              </svg>
            </div>
            <h3 className="text-center text-2xl font-bold font-display text-purple-900 mb-3 group-hover:text-purple-700">
              Группы в Ростове-на-Дону и онлайн
            </h3>
            <p className="text-center text-gray-600 max-w-md mx-auto">
              Присоединяйтесь к терапевтическим и группам поддержки в Ростове-на-Дону и онлайн. Найдите понимание и профессиональную помощь.
            </p>
            <div className="mt-6 text-center">
              <span className="inline-flex items-center gap-2 text-purple-700 font-medium group-hover:text-purple-800">
                Посмотреть группы
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default RostovLinks;


