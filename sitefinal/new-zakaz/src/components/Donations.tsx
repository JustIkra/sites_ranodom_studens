
import React, { useState } from 'react';
import { projects } from '../constants';
import DonationWidget from './DonationWidget';
import QRCode from './QRCode';

const Donations: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>(projects[0]?.id || null);

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    return (
        <section id="donate" className="py-20 bg-light-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-primary-dark">Как помочь проекту</h2>
                    <p className="mt-4 text-lg text-gray-600">Ваша поддержка позволяет нам оплачивать услуги квалифицированных психологов и реализовывать наши программы. Даже небольшая сумма может сыграть важную роль.</p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
                        {projects.map(project => (
                            <DonationWidget 
                                key={project.id}
                                project={project} 
                                isOpen={openAccordion === project.id}
                                onToggle={() => toggleAccordion(project.id)}
                            />
                        ))}
                    </div>
                </div>
                 <div className="mt-16 text-center bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto border border-primary/20">
                    <h3 className="text-2xl font-bold font-display text-primary-dark mb-4">Общий вклад в развитие проекта</h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Если вы хотите поддержать всю нашу деятельность, вы можете сделать пожертвование по этому QR-коду. Все собранные средства будут реализованы на наши проекты, а так же помогут оплатить нуждающимся личную или групповую терапию.</p>
                    <div className="flex justify-center">
                        <QRCode size={200} />
                    </div>
                 </div>
            </div>
        </section>
    );
};

export default Donations;
