import { useEffect, useRef, useState, useCallback } from 'react';
import { Mail, Phone, Github, Linkedin, Send, ArrowRight, Sparkles } from 'lucide-react';
import { experienceData } from '../../data/portfolioData';

const useTilt = () => {
    const ref = useRef<HTMLDivElement>(null);
    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current; if (!el) return;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / (width / 2);
        const y = (e.clientY - top - height / 2) / (height / 2);
        el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.transition = 'transform 0.08s linear';
    }, []);
    const onMouseLeave = useCallback(() => {
        const el = ref.current; if (!el) return;
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        el.style.transition = 'transform 0.5s ease';
    }, []);
    return { ref, onMouseMove, onMouseLeave };
};

export const ContactSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);
    const { ref: cardRef, onMouseMove, onMouseLeave } = useTilt();

    useEffect(() => {
        const el = sectionRef.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
        obs.observe(el); return () => obs.disconnect();
    }, []);

    const contacts = [
        { icon: Mail, label: 'Email', value: experienceData.email, href: `mailto:${experienceData.email}`, color: '#6366f1' },
        { icon: Phone, label: 'Phone', value: experienceData.phone, href: `tel:${experienceData.phone}`, color: '#10b981' },
        { icon: Github, label: 'GitHub', value: 'github.com/Nachiketaverma', href: experienceData.github, color: '#f8fafc' },
        { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/nachiketa', href: experienceData.linkedin, color: '#0ea5e9' },
    ];

    return (
        <section
            id="contact"
            ref={sectionRef}
            style={{ 
                background: '#0f172a', 
                padding: '6rem 1.5rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <style>{`
                @keyframes _contactGlow {
                    0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.3; }
                    50% { transform: scale(1.2) translate(20px, -20px); opacity: 0.5; }
                }
                @keyframes _shimmerBtn {
                    0% { background-position: -100% 0; }
                    100% { background-position: 200% 0; }
                }
                .contact-glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 2rem;
                    padding: 3rem;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .contact-btn {
                    background: linear-gradient(90deg, #6366f1, #0ea5e9, #6366f1);
                    background-size: 200% auto;
                    transition: 0.5s;
                }
                .contact-btn:hover {
                    background-position: right center;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
                }
            `}</style>

            {/* Background Orbs */}
            <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', animation: '_contactGlow 10s infinite' }} />
            <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', animation: '_contactGlow 12s infinite reverse' }} />

            <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{ 
                        padding: '6px 16px', borderRadius: 99, background: 'rgba(99, 102, 241, 0.1)', 
                        color: '#a5b4fc', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
                        border: '1px solid rgba(99, 102, 241, 0.2)'
                    }}>LET'S TALK</span>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: '#f8fafc', marginTop: '1rem' }}>
                        Get In <span style={{ color: '#6366f1' }}>Touch</span>
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '0.5rem' }}>Have a project in mind? Let's build something amazing together.</p>
                </div>

                <div 
                    ref={cardRef}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    className="contact-glass"
                    style={{ 
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem',
                        opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'opacity 0.8s ease, transform 0.8s ease'
                    }}
                >
                    {/* Left Side: Contact Info */}
                    <div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <Sparkles size={24} color="#6366f1" /> Contact Info
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {contacts.map((c, i) => (
                                <a 
                                    key={i} 
                                    href={c.href}
                                    target={c.href.startsWith('http') ? '_blank' : '_self'}
                                    rel="noreferrer"
                                    style={{ 
                                        display: 'flex', alignItems: 'center', gap: '1rem', 
                                        padding: '1rem', borderRadius: '1.25rem',
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        transition: '0.3s', textDecoration: 'none'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'; }}
                                >
                                    <div style={{ width: 45, height: 45, borderRadius: '0.75rem', background: `${c.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <c.icon size={20} color={c.color} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>{c.label}</div>
                                        <div style={{ fontSize: 15, color: '#f8fafc', fontWeight: 500 }}>{c.value}</div>
                                    </div>
                                    <ArrowRight size={16} color="#475569" style={{ marginLeft: 'auto' }} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Quick Message CTA */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem' }}>Quick Message</h3>
                        <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '2rem' }}>
                            I'm currently available for freelance work or full-time positions. If you have a question or just want to say hi, my inbox is always open!
                        </p>
                        <a 
                            href={`mailto:${experienceData.email}`}
                            className="contact-btn"
                            style={{ 
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                padding: '1rem 2rem', borderRadius: '1rem', color: '#fff', 
                                fontWeight: 700, textDecoration: 'none', fontSize: '1.1rem'
                            }}
                        >
                            Send a Message <Send size={18} />
                        </a>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem', color: '#475569', fontSize: 13 }}>
                    © {new Date().getFullYear()} Nachiketa Verma. Made with passion & precision.
                </div>

            </div>
        </section>
    );
};
