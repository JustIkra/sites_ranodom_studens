import React, { useState } from 'react';
import type { Service } from '../types';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import OurMission from '../components/OurMission';
import OurGoal from '../components/OurGoal';
import Services from '../components/Services';
import RostovLinks from '../components/RostovLinks';
import ProjectsComponent from '../components/Projects';
import Donations from '../components/Donations';
import Community from '../components/Community';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

const ServiceModalContent: React.FC<{ service: Service }> = ({ service }) => {
    return (
        <div className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                    <service.icon className="w-12 h-12 text-primary" />
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-bold font-display text-primary mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.fullDescription.intro}</p>
                    <ul className="space-y-4 list-none mb-6">
                        {service.fullDescription.points.map((point, index) => (
                             <li key={index} className="flex items-start">
                                <span className="flex-shrink-0 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✔</span>
                                <span className="text-gray-700">{point}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="font-semibold text-gray-800 bg-primary/10 p-4 rounded-lg">{service.fullDescription.outro}</p>
                </div>
            </div>
        </div>
    );
};

interface ModalData {
  type: 'service';
  data: Service;
}

const MainPage: React.FC = () => {
    const [modalData, setModalData] = useState<ModalData | null>(null);

    const handleSelectService = (service: Service) => {
        setModalData({ type: 'service', data: service });
    };

    const closeModal = () => {
        setModalData(null);
    };

    return (
        <>
            <Header />
            <main>
                <Hero />
                <OurMission />
                <OurGoal />
                <About />
                <RostovLinks />
                <Services onServiceSelect={handleSelectService} />
                <ProjectsComponent />
                <Donations />
                <Community />
            </main>
            <Footer />

            <Modal isOpen={!!modalData} onClose={closeModal}>
                {modalData?.type === 'service' && <ServiceModalContent service={modalData.data} />}
            </Modal>
        </>
    );
};

export default MainPage;
