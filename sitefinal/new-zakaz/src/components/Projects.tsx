import React, { useEffect, useState } from 'react';
import { projects as staticProjects } from '../constants';
import ProjectCard from './ProjectCard';
import { fetchDonations, mergeDonations } from '../utils/donations';

const ProjectsComponent: React.FC = () => {
    const [liveProjects, setLiveProjects] = useState(staticProjects);

    useEffect(() => {
        const url = (import.meta as any).env?.VITE_DONATIONS_URL as string | undefined;
        console.log('VITE_DONATIONS_URL:', url);
        
        // Если переменная не установлена, используем дефолтный URL
        const apiUrl = url || 'http://127.0.0.1:8000/api/projects/rows/';
        console.log('Using API URL:', apiUrl);
        
        const loadDonations = () => {
            console.log('Loading donations from:', apiUrl);
            fetchDonations(apiUrl).then(rows => {
                console.log('Received donation data:', rows);
                setLiveProjects(prev => mergeDonations(prev, rows));
            }).catch(error => {
                console.error('Error loading donations:', error);
            });
        };
        
        // Загружаем сразу
        loadDonations();
        
        // Обновляем каждые 30 секунд
        const interval = setInterval(loadDonations, 30000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="projects" className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-primary-dark">Наши проекты</h2>
                    <p className="mt-4 text-lg text-gray-600">Каждый проект направлен на решение конкретных социальных проблем и поддержку тех, кто в этом нуждается больше всего.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {liveProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsComponent;
