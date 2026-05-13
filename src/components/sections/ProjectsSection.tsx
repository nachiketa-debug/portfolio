import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, ShieldCheck, Cpu, Globe } from 'lucide-react';
import { experienceData } from '../../data/portfolioData';

/* ── Types ── */
interface Project {
    name: string;
    client: string;
    category?: string;
    stack?: string[];
    description: string[];
    link?: string;
}

const PROJECTS = experienceData.projects as Project[];

/* ── Project Card Component ── */
const ProjectCard = ({ project, direction }: { project: Project; direction: number }) => {
    return (
        <motion.div
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
                width: '100%',
                maxWidth: '1000px',
                margin: '0 auto',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                borderRadius: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: 'clamp(1.25rem, 4vw, 4rem)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: 'clamp(1.25rem, 4vw, 3rem)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Glass Reflection */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                transform: 'skewX(-25deg)',
                animation: 'proj-reflection 6s infinite ease-in-out',
                zIndex: 1
            }} />
            {/* Background Accent */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '40%',
                height: '40%',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
                zIndex: 0
            }} />

            {/* Left Column: Info */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '6px 16px',
                    borderRadius: '99px',
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    color: '#818cf8',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '1.5rem'
                }}>
                    <Globe size={14} />
                    {project.category || 'Featured Project'}
                </div>

                <h3 style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    fontWeight: 900,
                    color: '#f8fafc',
                    lineHeight: 1.1,
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em'
                }}>
                    {project.name}
                </h3>
                
                <p style={{
                    fontSize: '1.1rem',
                    color: '#94a3b8',
                    fontWeight: 500,
                    marginBottom: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <span style={{ color: '#475569' }}>Developed for:</span> {project.client}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                    {project.stack?.map((tech) => (
                        <span key={tech} style={{
                            padding: '4px 12px',
                            borderRadius: '6px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#64748b',
                            fontSize: '0.8rem',
                            fontWeight: 600
                        }}>
                            {tech}
                        </span>
                    ))}
                </div>

                {project.link && (
                    <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                            color: '#fff',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)'
                        }}
                    >
                        View Live Project <ExternalLink size={16} />
                    </motion.a>
                )}
            </div>

            {/* Right Column: Details */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Challenge */}
                    <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#475569', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                            The Challenge
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{
                                minWidth: '32px', height: '32px', borderRadius: '8px',
                                background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444'
                            }}>
                                <Cpu size={16} />
                            </div>
                            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                {project.description[0]}
                            </p>
                        </div>
                    </div>

                    {/* Key Solutions */}
                    <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#475569', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                            Key Solutions
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {project.description.slice(1).map((desc, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{
                                        minWidth: '32px', height: '32px', borderRadius: '8px',
                                        background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399'
                                    }}>
                                        <ShieldCheck size={16} />
                                    </div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ── Main Section ── */
export const ProjectsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1); // Default to 1
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const el = sectionRef.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
        }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // Autoplay logic
    useEffect(() => {
        if (!visible || isHovered) return;
        
        const timer = setInterval(() => {
            nextProject();
        }, 5000); // 5 seconds

        return () => clearInterval(timer);
    }, [visible, isHovered, currentIndex]);

    const nextProject = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    };

    const prevProject = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    };

    return (
        <section
            id="projects"
            ref={sectionRef}
            style={{
                background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)',
                width: '100%',
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 'clamp(4rem, 10vw, 8rem) 0'
            }}
        >
            <style>{`
                @keyframes proj-shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                @keyframes proj-glow {
                    0%, 100% { opacity: 0.5; filter: blur(20px); }
                    50%      { opacity: 0.8; filter: blur(30px); }
                }
                @keyframes proj-reflection {
                    0%   { left: -100%; }
                    20%, 100% { left: 200%; }
                }
                @media (max-width: 768px) {
                    .proj-carousel-inner {
                        flex-direction: column !important;
                    }
                    .proj-nav-container { 
                        position: relative !important; 
                        order: 2;
                        margin-top: 3rem;
                        justify-content: center !important;
                        gap: 3rem;
                        width: 100% !important;
                        left: 0 !important;
                        right: 0 !important;
                        transform: none !important;
                    }
                    .proj-card-wrapper {
                        order: 1;
                    }
                    .proj-nav-btn {
                        width: 55px !important;
                        height: 55px !important;
                    }
                }
            `}</style>

            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '5rem',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease'
            }}>
                
                <h2 style={{
                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                    fontWeight: 950,
                    color: '#fff',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    margin: 0,
                    background: 'linear-gradient(to right, #fff, #94a3b8, #fff)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'proj-shimmer 8s linear infinite'
                }}>
                    Top 5 Projects
                </h2>
                <p style={{
                    color: '#64748b',
                    fontSize: '1.1rem',
                    marginTop: '1rem',
                    maxWidth: '600px',
                    margin: '1rem auto'
                }}>
                    Architecting high-performance systems for public and private sectors.
                </p>
            </div>

            {/* Carousel Container */}
            <div 
                className="proj-carousel-inner"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    width: '100%',
                    padding: '0 clamp(1rem, 5vw, 2rem)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Navigation Buttons */}
                <div 
                    className="proj-nav-container"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        maxWidth: '1200px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0 1rem',
                        zIndex: 10,
                        pointerEvents: 'none'
                    }}
                >
                    <motion.button
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevProject}
                        className="proj-nav-btn"
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <ChevronLeft size={30} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextProject}
                        className="proj-nav-btn"
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <ChevronRight size={30} />
                    </motion.button>
                </div>

                {/* Card Display */}
                <div className="proj-card-wrapper" style={{ width: '100%', maxWidth: '1000px', overflow: 'hidden' }}>
                    <AnimatePresence mode="wait" custom={direction}>
                        <ProjectCard 
                            key={currentIndex} 
                            project={PROJECTS[currentIndex]} 
                            direction={direction}
                        />
                    </AnimatePresence>
                </div>
            </div>

            {/* Pagination Indicators */}
            <div style={{
                display: 'flex',
                gap: '0.75rem',
                marginTop: '4rem'
            }}>
                {PROJECTS.map((_, i) => (
                    <motion.div
                        key={i}
                        onClick={() => {
                            setDirection(i > currentIndex ? 1 : -1);
                            setCurrentIndex(i);
                        }}
                        animate={{
                            width: i === currentIndex ? 40 : 10,
                            background: i === currentIndex ? '#6366f1' : 'rgba(255, 255, 255, 0.1)'
                        }}
                        style={{
                            height: '10px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>

            {/* Background Texture */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: -1
            }} />
        </section>
    );
};
