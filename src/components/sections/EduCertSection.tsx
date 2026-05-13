import { motion } from 'framer-motion';
import { experienceData } from '../../data/portfolioData';
import { GraduationCap, Award, MapPin, Calendar, BookOpen, ExternalLink, Sparkles } from 'lucide-react';

/* ── Education Item ── */
const EducationItem = ({ edu, index }: { edu: typeof experienceData.education[0]; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{
                position: 'relative',
                padding: '1.5rem',
                borderRadius: '1.25rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '1rem',
                transition: 'all 0.3s ease',
            }}
            whileHover={{ scale: 1.02, background: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(99, 102, 241, 0.3)' }}
        >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', flexShrink: 0
                }}>
                    <GraduationCap size={22} />
                </div>
                <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 4px' }}>
                        {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#818cf8', fontWeight: 600, margin: '0 0 8px' }}>
                        {edu.institution}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#64748b' }}>
                            <MapPin size={12} /> {edu.location}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#64748b' }}>
                            <Calendar size={12} /> {edu.period}
                        </span>
                        {edu.gpa && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#34d399', fontWeight: 700 }}>
                                <Award size={12} /> {edu.gpa} GPA
                            </span>
                        )}
                        {edu.percentage && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#34d399', fontWeight: 700 }}>
                                <Award size={12} /> {edu.percentage}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ── Certification Item ── */
const CertificationItem = ({ cert, index }: { cert: typeof experienceData.certifications[0]; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{
                padding: '1.25rem',
                borderRadius: '1.25rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
            }}
            whileHover={{ scale: 1.02, background: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(167, 139, 250, 0.3)' }}
        >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(167, 139, 250, 0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', flexShrink: 0
                }}>
                    <BookOpen size={18} />
                </div>
                <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9', margin: '0 0 2px' }}>
                        {cert.name}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                        {cert.provider} · {cert.year}
                    </p>
                </div>
            </div>
            <ExternalLink size={14} style={{ color: '#475569' }} />
        </motion.div>
    );
};

export const EduCertSection = () => {
    return (
        <section
            id="education-certifications"
            style={{
                background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
                padding: 'clamp(3rem, 8vw, 8rem) 0',
                width: '100%',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <style>{`
                @keyframes edu-shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
            `}</style>

            {/* Background Texture */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 0
            }} />

            <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '6px 16px',
                        borderRadius: '99px',
                        background: 'rgba(139, 92, 246, 0.12)',
                        border: '1px solid rgba(139, 92, 246, 0.35)',
                        color: '#a78bfa',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        marginBottom: '1.5rem'
                    }}>
                        <Sparkles size={14} />
                        Foundations
                    </div>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        fontWeight: 900,
                        color: '#fff',
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                        margin: 0,
                        background: 'linear-gradient(90deg, #fff 0%, #818cf8 50%, #fff 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'edu-shimmer 6s linear infinite'
                    }}>
                        Education & <span style={{ color: '#818cf8' }}>Credentials</span>
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
                    gap: 'clamp(2rem, 5vw, 4rem)',
                    alignItems: 'start'
                }}>
                    {/* Education Column */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1))' }} />
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.05em' }}>Education</h3>
                            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.1), transparent)' }} />
                        </div>
                        {experienceData.education.map((edu, i) => (
                            <EducationItem key={i} edu={edu} index={i} />
                        ))}
                    </div>

                    {/* Certifications Column */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1))' }} />
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.05em' }}>Certifications</h3>
                            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.1), transparent)' }} />
                        </div>
                        {experienceData.certifications.map((cert, i) => (
                            <CertificationItem key={i} cert={cert} index={i} />
                        ))}

                        {/* Learning Note */}
                        <div style={{
                            marginTop: '2rem',
                            padding: '1.5rem',
                            borderRadius: '1.25rem',
                            background: 'rgba(99, 102, 241, 0.03)',
                            border: '1px dashed rgba(99, 102, 241, 0.2)',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', fontStyle: 'italic', margin: 0 }}>
                                "I believe learning is a continuous journey. Currently exploring Advanced System Design & Cloud-Native Architectures."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
