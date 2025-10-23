
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Фото слева */}
          <div className="flex justify-center">
            <img
              src="/images/alexander-white-sweater.jpg"
              alt="Александр Почикаев"
              className="w-full max-w-md rounded-2xl shadow-2xl object-cover"
            />
          </div>

          {/* Текст справа */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-primary-dark mb-3">
              О себе
            </h2>

            <button
              onClick={() => window.open('https://alexpochikaev.ru/', '_blank')}
              className="group text-left"
              aria-label="Перейти на сайт-визитку"
            >
              <span className="inline-block text-2xl md:text-3xl font-extrabold text-text-dark transition-all duration-300 group-hover:text-primary group-hover:tracking-wide">
                Александр Почикаев
              </span>
            </button>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Привет! Я Александр Почикаев, гештальт-терапевт, мне 36 лет. Я не просто помогаю людям, я сам прошел через этот путь. Через личную терапию и через лечение наркозависимости в закрытом реабилитационном центре. Этот опыт стал для меня отправной точкой к переменам. Теперь я свободен от установок, которые меня ограничивали, и не тащу за собой груз прошлого. Я живу полной, трезвой и осознанной жизнью, открыт новым возможностям и продолжаю раскрывать и реализовывать свой потенциал! И я знаю, что без психотерапии это было бы невозможно.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Два года назад у меня появилась мечта: помочь как можно большему числу людей раскрыть свой внутренний потенциал и сделать качественную психотерапию более доступной. Сегодня я с радостью представляю вам результат этой мечты – мой проект "МЫ". Ознакомиться с ним подробнее можно на нашем сайте <a href="https://my-russian-potencial.ru/" className="text-primary hover:underline">my-russian-potencial.ru</a>.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Для каждого человека проект "МЫ" открывает двери к личной или групповой терапии. Благодаря собранным средствам, любой человек сможет получить необходимую помощь, будь то путь к трезвости через терапию или реабилитационный центр, или же просто возможность обратиться к специалисту. Кроме того, любой человек может стать частью нашего сообщества, помогая другим через добровольные пожертвования.
            </p>

            {/* Социальные ссылки */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://rutube.ru/channel/68534018/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors">
                <span>RuTube</span>
              </a>
              <a href="https://vk.com/alexpochikaev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <span>VK</span>
              </a>
              <a href="http://t.me/PSYPochikaevAlexandr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
