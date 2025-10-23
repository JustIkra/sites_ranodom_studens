import React, { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import ProjectPage from './pages/ProjectPage';
import ColleaguesPage from './pages/ColleaguesPage';
import GroupsPage from './pages/GroupsPage';
import PsychologistsPage from './pages/PsychologistsPage';
import SponsorsPage from './pages/SponsorsPage';

const App: React.FC = () => {
    const [route, setRoute] = useState(window.location.hash || '#');

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash || '#');
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    // Enhanced scroll handling for anchor links and page changes
    useEffect(() => {
        // If the hash is for a project page, colleagues page, groups page, psychologists page, or sponsors page, just scroll to the top.
        if (route.startsWith('#project/') || route === '#colleagues' || route === '#groups' || route === '#psychologists' || route === '#sponsors') {
            window.scrollTo(0, 0);
            return;
        }

        // If the hash is an anchor link (e.g., #services), try to scroll to it.
        // We handle '#' or empty hash separately to scroll to the top (hero section).
        if (route.length > 1 && route.startsWith('#')) {
            const id = route.substring(1);
            // Use a timeout to ensure the element is rendered, especially when navigating
            // from a project page back to an anchor on the main page.
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    // We want to scroll to the top of the section, taking the header height into account
                    const headerOffset = 80; // height of the sticky header
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else {
            // For the base URL or empty/default hash, scroll to top.
            window.scrollTo(0, 0);
        }
    }, [route]);

    let pageContent;

    if (route.startsWith('#project/')) {
        const projectSlug = route.substring('#project/'.length);
        pageContent = <ProjectPage projectSlug={projectSlug} />;
    } else if (route === '#colleagues') {
        pageContent = <ColleaguesPage />;
    } else if (route === '#groups') {
        pageContent = <GroupsPage />;
    } else if (route === '#psychologists') {
        pageContent = <PsychologistsPage />;
    } else if (route === '#sponsors') {
        pageContent = <SponsorsPage />;
    } else {
        pageContent = <MainPage />;
    }

    return <div className="bg-white">{pageContent}</div>;
};

export default App;
