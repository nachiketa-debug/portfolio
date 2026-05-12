import { Suspense, useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Download } from "lucide-react";
import { Scene } from './components/Scene';
import { CustomLoader } from './components/CustomLoader';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { EduCertSection } from './components/sections/EduCertSection';
import { ContactSection } from './components/sections/ContactSection';
import { experienceData } from './data/portfolioData';

export default function App() {
    const [greeting, setGreeting] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const hours = now.getHours();

            let greetingText = '';
            if (hours >= 5 && hours < 12) {
                greetingText = 'Good morning';
            } else if (hours >= 12 && hours < 17) {
                greetingText = 'Good afternoon';
            } else if (hours >= 17 && hours < 21) {
                greetingText = 'Good evening';
            } else {
                greetingText = 'Good night';
            }

            setGreeting(greetingText);

            const day = now.getDate();
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const month = monthNames[now.getMonth()];
            setCurrentDate(`${day} ${month.toLowerCase()}`);

            const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            setCurrentTime(timeString);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Nachiketa_Verma_Resume.pdf'; // This name will be used for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
            {/* Hero 3D Section */}
            <div id="hero" className="w-full h-screen relative bg-gray-100">
                {/* Top Navigation */}
                {/* Top Navigation */}
                <nav className="absolute top-0 w-full p-6 md:p-8 flex justify-between items-start z-50 text-gray-800 pointer-events-none">
                    {/* Left/Center - Greeting and Date */}
                    {/* Mobile: Top Left, Desktop: Centered via absolute positioning trick or just balanced flex */}
                    <div className="flex flex-col items-start md:absolute md:left-[30%] md:items-start text-left md:text-left pointer-events-auto">
                        <div className="text-lg md:text-xl opacity-60 font-medium">{greeting || 'Good morning'}</div>
                        <div className="text-lg md:text-xl font-bold md:font-medium">{currentDate || '6 feb'}</div>
                    </div>

                    {/* Right - Resume Button and Time */}
                    <div className="flex flex-col items-end gap-2 md:gap-3 pointer-events-auto ml-auto">
                        <button
                            onClick={handleDownloadResume}
                            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all hover:scale-105 text-xs md:text-sm font-medium"
                        >
                            <Download size={14} className="md:w-4 md:h-4" />
                            <span>Resume</span>
                        </button>
                        <span className="text-xs md:text-sm opacity-60 font-medium">{currentTime || '11:30'}</span>
                    </div>
                </nav>

                {/* Name Display - Adjusted for Mobile Visibility */}
                <div className="absolute bottom-12 md:bottom-24 left-0 right-0 z-40 text-center text-gray-800 pointer-events-none px-6">
                    <h1 className="text-4xl md:text-7xl font-bold mb-2 tracking-tight leading-tight drop-shadow-sm">{experienceData.name}</h1>
                    <p className="text-base md:text-2xl font-light opacity-70 tracking-wide uppercase">Full Stack Developer</p>
                </div>

                {/* 3D Canvas */}
                <Canvas shadows dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={40} />
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>

                {/* Bottom Wave Decoration */}
                <div className="absolute bottom-0 left-0 w-full pointer-events-none z-10">
                    <svg viewBox="0 0 1440 320" className="w-full block" preserveAspectRatio="none" style={{ display: 'block' }}>
                        <path
                            fill="#e5e7eb"
                            fillOpacity="1"
                            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        />
                    </svg>
                </div>
            </div>

            {/* Scrollable Content Sections */}
            <div className="w-full bg-gray-100">
                <SkillsSection />
                <ExperienceSection />
                <ProjectsSection />
                <EduCertSection />
                <ContactSection />
            </div>
            <CustomLoader />
        </div>
    );
};