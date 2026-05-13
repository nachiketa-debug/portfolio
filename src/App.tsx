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
import { motion } from 'framer-motion';
import { useRef as reactRef } from 'react';
import { experienceData } from './data/portfolioData';

export default function App() {
    const scrollContainerRef = reactRef<HTMLDivElement>(null);
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

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
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
        <div ref={scrollContainerRef} className="w-full h-full overflow-y-auto overflow-x-hidden">
            {/* Hero 3D Section */}
            <div id="hero" className="w-full h-screen relative bg-[#0a0a0f]">
                {/* Top Navigation */}
                <nav className="absolute top-0 w-full px-4 py-3 md:px-8 md:py-6 flex justify-between items-center z-50 text-white pointer-events-none">
                    {/* Left - Greeting and Date */}
                    <div className="flex flex-col pointer-events-auto">
                        <div className="text-xs md:text-sm opacity-50 font-medium leading-tight">{greeting || 'Good morning'}</div>
                        <div className="text-sm md:text-base font-semibold leading-tight">{currentDate || '13 may'}</div>
                    </div>

                    {/* Right - Resume Button and Time */}
                    <div className="flex items-center gap-3 pointer-events-auto">
                        <span className="text-xs opacity-50 font-medium tabular-nums">{currentTime || '11:58'}</span>
                        <button
                            onClick={handleDownloadResume}
                            className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all hover:scale-105 text-xs md:text-sm font-semibold"
                        >
                            <Download size={12} className="md:w-4 md:h-4" />
                            <span>Resume</span>
                        </button>
                    </div>
                </nav>

                {/* Name Display - Adjusted for Mobile Visibility */}
                <div className="absolute bottom-10 md:bottom-16 left-0 right-0 z-40 text-center pointer-events-none px-6">
                    <style>{`
                        @keyframes name-shimmer {
                            0% { background-position: -200% center; }
                            100% { background-position: 200% center; }
                        }
                        .architect-name {
                            font-family: 'Inter', system-ui, -apple-system, sans-serif;
                            font-weight: 950;
                            letter-spacing: -0.04em;
                            line-height: 0.9;
                            margin-bottom: 0.5rem;
                            color: #ffffff;
                        }
                        .architect-name span {
                            display: block;
                            background: linear-gradient(
                                90deg, 
                                #ffffff 0%, 
                                #818cf8 25%, 
                                #c084fc 50%, 
                                #818cf8 75%, 
                                #ffffff 100%
                            );
                            background-size: 200% auto;
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            animation: name-shimmer 6s linear infinite;
                        }
                        .tech-tag {
                            display: inline-flex;
                            align-items: center;
                            gap: 1rem;
                            padding: 10px 24px;
                            background: rgba(255, 255, 255, 0.03);
                            border: 1px solid rgba(255, 255, 255, 0.08);
                            border-radius: 4px;
                            backdrop-filter: blur(12px);
                        }
                        .tech-tag-text {
                            color: #94a3b8;
                            font-weight: 700;
                            letter-spacing: 0.4em;
                            font-size: 0.7rem;
                            text-transform: uppercase;
                        }
                    `}</style>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="architect-name text-[clamp(2.5rem,12vw,7rem)]">
                            {experienceData.name.split(' ')[0]} <span>{experienceData.name.split(' ')[1]}</span>
                        </h1>
                        
                        <div className="flex items-center justify-center mt-6">
                            <div className="tech-tag">
                                <span className="tech-tag-text">Full Stack Developer</span>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
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
                            fill="#020617"
                            fillOpacity="1"
                            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        />
                    </svg>
                </div>
            </div>

            {/* Scrollable Content Sections */}
            <div className="w-full bg-[#020617]">
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