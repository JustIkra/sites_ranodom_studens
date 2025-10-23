
import React from 'react';
import { phoneNumber } from '../constants';

const Footer: React.FC = () => {
    const legalInfo = {
        name: "ИП Почикаев Александр Сергеевич",
        activity: "Вид деятельности: 85.41",
        status: "Статус: 001",
        inn: "ИНН: 616271126667",
        ogrnip: "ОГРН/ОГРНИП: 325619600175156",
        regDate: "Дата регистрации: 2025-08-01",
        taxCode: "Код налогового органа: 6188",
        legalAddress: "Юридический адрес: Ростовская область, Р-Н Кагальницкий, СТ-ЦА Хомутовская, ул. Нижне-набережная, д. 47",
        factualAddress: "Фактический адрес: Ростов на дону, ул. Обороны, 24, кабинет 402",
        phone: "Телефон: 8800 234 2 212"
    };

    return (
        <footer className="bg-text-dark text-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-bold font-display text-white text-xl mb-4">МЫ</h3>
                        <p className="text-sm text-gray-400">Всероссийский импакт-проект в сфере психологии и осознанности.</p>
                    </div>
                    <div>
                        <h3 className="font-bold font-display text-white text-xl mb-4">Контакты</h3>
                        <p className="text-sm">Телефон для любых вопросов:</p>
                        <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="text-lg font-bold text-white hover:text-highlight-aqua transition-colors">{phoneNumber}</a>
                    </div>
                    <div>
                        <h3 className="font-bold font-display text-white text-xl mb-4">Реквизиты</h3>
                        <div className="space-y-1 text-sm text-gray-400">
                            <p>{legalInfo.name}</p>
                            <p>{legalInfo.legalAddress}</p>
                            <p>{legalInfo.factualAddress}</p>
                            <p>{legalInfo.inn}</p>
                            <p>{legalInfo.ogrnip}</p>
                            <p>{legalInfo.activity}</p>
                            <p>{legalInfo.status}</p>
                            <p>{legalInfo.regDate}</p>
                            <p>{legalInfo.taxCode}</p>
                            <p>{legalInfo.phone}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Проект "МЫ". Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
