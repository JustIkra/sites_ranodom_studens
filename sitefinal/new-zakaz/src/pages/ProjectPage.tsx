import React, { useState } from 'react';
import { projects as staticProjects, phoneNumber } from '../constants';
import { fetchDonations, mergeDonations } from '../utils/donations';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

const ProjectPage: React.FC<{ projectSlug: string }> = ({ projectSlug }) => {
    const [project, setProject] = useState(() => staticProjects.find(p => p.slug === projectSlug));
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

    // Load live donations
    React.useEffect(() => {
        const url = (import.meta as any).env?.VITE_DONATIONS_URL as string | undefined;
        console.log('ProjectPage VITE_DONATIONS_URL:', url);
        
        // Если переменная не установлена, используем дефолтный URL
        const apiUrl = url || 'http://127.0.0.1:8000/api/projects/rows/';
        console.log('ProjectPage Using API URL:', apiUrl);
        
        const loadDonations = () => {
            console.log('ProjectPage Loading donations from:', apiUrl);
            fetchDonations(apiUrl).then(rows => {
                console.log('ProjectPage Received donation data:', rows);
                const merged = mergeDonations(staticProjects, rows).find(p => p.slug === projectSlug);
                if (merged) {
                    console.log('ProjectPage Updated project:', merged);
                    setProject(merged);
                }
            }).catch(error => {
                console.error('ProjectPage Error loading donations:', error);
            });
        };
        
        // Загружаем сразу
        loadDonations();
        
        // Обновляем каждые 30 секунд
        const interval = setInterval(loadDonations, 30000);
        
        return () => clearInterval(interval);
    }, [projectSlug]);

    if (!project) {
        return (
            <>
                <Header />
                <main className="flex-grow">
                    <div className="container mx-auto py-20 text-center px-4">
                        <h1 className="text-4xl font-bold font-display text-primary-dark mb-4">Проект не найден</h1>
                        <p className="text-gray-600 mb-8">К сожалению, мы не смогли найти страницу по вашему запросу.</p>
                        <a href="#" className="bg-primary hover:bg-primary-dark text-white font-bold text-lg py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Вернуться на главную
                        </a>
                    </div>
                </main>
                <Footer />
            </>
        );
    }
    
    const { donationInfo, themes, approach } = project;
    const percentage = donationInfo.goal > 0 ? Math.min(100, Math.round((donationInfo.collected / donationInfo.goal) * 100)) : 0;

    const DonationWidgetContent: React.FC = () => (
         <>
            <h3 className="text-2xl font-bold font-display text-primary-dark mb-4 text-center">Поддержать проект</h3>
            <p className="font-semibold text-gray-700 mb-2">Цель сбора:</p>
            <p className="text-gray-600 mb-4 text-sm">{donationInfo.purpose}</p>

            <div className="w-full bg-gray-200 rounded-full h-4 mb-2 shadow-inner">
                <div className="bg-gradient-to-r from-highlight-aqua to-primary h-4 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="text-sm flex justify-between font-semibold mb-6">
                <span className="text-primary">{donationInfo.collected.toLocaleString('ru-RU')} ₽ ({percentage}%)</span>
                <span className="text-gray-500">{donationInfo.goal.toLocaleString('ru-RU')} ₽</span>
            </div>

            <div className="flex flex-col items-center">
                <img src="/images/QR.jpeg" alt={`QR-код для проекта ${project.title}`} className="rounded-lg shadow-md mb-2" />
                <p className="text-xs text-gray-500 text-center">Наведите камеру для пожертвования</p>
            </div>
        </>
    );


    return (
        <div className="flex flex-col min-h-screen bg-light-bg">
            <Header />
            <main className="flex-grow pb-24 lg:pb-0">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                     <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
                        <ol className="list-none p-0 inline-flex">
                            <li className="flex items-center">
                                <a href="#" className="hover:text-primary">Главная</a>
                                <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                            </li>
                            <li className="flex items-center">
                                <a href="#projects" className="hover:text-primary">Наши проекты</a>
                                <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569 9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                            </li>
                            <li>
                                <span className="font-semibold text-gray-700">{project.title}</span>
                            </li>
                        </ol>
                    </nav>

                    <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                        <div className="lg:col-span-8">
                             <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <section className="mb-12">
                                    <h1 className="text-4xl md:text-5xl font-extrabold font-display text-primary-dark leading-tight">{project.title}</h1>
                                    <p className="text-lg text-gray-600 mt-4 max-w-3xl">{project.shortDescription}</p>
                                </section>

                                <section className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line mb-12">
                                    <h2 className="text-3xl font-bold font-display !text-primary-dark mb-6">О проекте</h2>
                                    {project.fullDescription}
                                </section>
                                
                                {themes && themes.length > 0 && (
                                <section className="mb-12">
                                    <h2 className="text-3xl font-bold font-display text-primary-dark mb-6">Наши темы</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {themes.map((theme, index) => (
                                            <span key={index} className="bg-primary/10 text-primary-dark font-semibold px-4 py-2 rounded-full text-sm">
                                                {theme}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                                )}

                                {approach && approach.length > 0 && (
                                <section className="mb-12">
                                    <h2 className="text-3xl font-bold font-display text-primary-dark mb-6">Наш подход</h2>
                                    <div className="space-y-6">
                                        {approach.map((item, index) => (
                                            <div key={index} className="flex items-start gap-4 p-4 bg-light-bg rounded-lg">
                                                <div className="flex-shrink-0 bg-primary text-white rounded-full p-3">
                                                    <item.icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg text-primary-dark">{item.title}</h4>
                                                    <p className="text-gray-600">{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                                )}

                                <section className="mb-12">
                                    <h2 className="text-3xl font-bold font-display text-primary-dark mb-6">Галерея</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {(project.galleryImages && project.galleryImages.length > 0 ? project.galleryImages : [
                                            `https://picsum.photos/seed/${project.id}1/400/300`,
                                            `https://picsum.photos/seed/${project.id}2/400/300`,
                                            `https://picsum.photos/seed/${project.id}3/400/300`
                                        ]).map((src, idx) => (
                                            <img key={idx} src={src} className="rounded-lg shadow-md aspect-video object-cover" alt={`Иллюстрация для проекта ${project.title} ${idx + 1}`}/>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-3xl font-bold font-display text-primary-dark mb-6">Частые вопросы</h2>
                                    <div className="space-y-6 border-t border-gray-200 pt-6">
                                        <div className="bg-primary/5 p-4 rounded-lg">
                                            <h4 className="font-bold text-lg text-primary-dark mb-2">Как я могу принять участие в проекте?</h4>
                                            <p className="text-gray-600">Для участия в качестве волонтера или партнера, пожалуйста, свяжитесь с нами по телефону, указанному внизу страницы. Мы всегда рады новым знакомствам и идеям!</p>
                                        </div>
                                        <div className="bg-primary/5 p-4 rounded-lg">
                                            <h4 className="font-bold text-lg text-primary-dark mb-2">Куда именно идут собранные средства?</h4>
                                            <p className="text-gray-600">Все пожертвования направляются «{donationInfo.purpose}».</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <aside className="hidden lg:block lg:col-span-4">
                           <div className="sticky top-24">
                             <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200/60 transform transition-transform hover:scale-[1.02] duration-300">
                                <DonationWidgetContent />
                            </div>
                           </div>
                        </aside>
                    </div>
                </div>
                

                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] p-3 border-t border-gray-200 z-40">
                    <div className="flex items-center justify-between gap-4 container mx-auto">
                         <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-primary-dark truncate">{project.title}</p>
                             <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div className="bg-primary h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                         </div>
                         <button onClick={() => setIsDonationModalOpen(true)} className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-5 rounded-full transition-colors duration-300 shadow-sm flex-shrink-0">
                            Помочь
                        </button>
                    </div>
                </div>

                 <Modal isOpen={isDonationModalOpen} onClose={() => setIsDonationModalOpen(false)}>
                    <div className="p-6">
                        <DonationWidgetContent />
                    </div>
                </Modal>
                
                <section className="py-20 bg-primary-dark text-white mt-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold font-display mb-4">Хотите участвовать или нужна помощь?</h2>
                        <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                            Если вы хотите стать волонтером, партнером этого проекта или вам необходима помощь, свяжитесь с нами.
                        </p>
                        <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="bg-white hover:bg-gray-200 text-primary-dark font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-block">
                            Позвонить нам
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ProjectPage;
