
import React from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const percentage = project.donationInfo.goal > 0 ? Math.round((project.donationInfo.collected / project.donationInfo.goal) * 100) : 0;

    return (
        <a 
            href={`#project/${project.slug}`}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200/50 cursor-pointer transition-all duration-300 transform hover:-translate-y-2 flex flex-col no-underline"
        >
            <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold font-display text-primary-dark mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{project.shortDescription}</p>
                 <span className="font-semibold text-sm text-primary group-hover:underline">Узнать подробнее →</span>
            </div>
            <div className="px-6 pb-6">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
                <div className="text-xs flex justify-between">
                    <span className="font-semibold text-primary">{percentage}%</span>
                    <span className="text-gray-500">
                        {project.donationInfo.collected.toLocaleString('ru-RU')} ₽ / {project.donationInfo.goal.toLocaleString('ru-RU')} ₽
                    </span>
                </div>
            </div>
        </a>
    );
};

export default ProjectCard;
