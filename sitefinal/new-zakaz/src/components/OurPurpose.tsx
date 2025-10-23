import React from 'react';

const OurPurpose: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-light-bg p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200/60">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary-dark mb-6">Наша цель</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Наша цель — собирать средства и ресурсы, чтобы оплачивать услуги квалифицированных психологов и реализовывать программы по развитию осознанности, с помощью личной и групповой психотерапии.
            </p>
            <p>
              Мы хотим, чтобы каждый человек, независимо от его финансового положения и физического состояния, имел возможность получить поддержку в сложные периоды жизни, научиться справляться со стрессом и тревожностью, зависимостями, а также раскрыть свой потенциал.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPurpose;



