import { useEffect, useRef, useState } from 'react';
import { experienceData } from '../../data/portfolioData';
import { MapPin, Calendar, Zap, ArrowRight } from 'lucide-react';

/* ── Animated Counter ── */
const Counter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
    const [n, setN] = useState(0);
    const started = useRef(false);
    const spanRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const el = spanRef.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started.current) {
                started.current = true;
                let f = 0; const steps = 60;
                const run = () => {
                    f++;
                    setN(Math.round((1 - Math.pow(1 - f / steps, 3)) * target));
                    if (f < steps) requestAnimationFrame(run);
                };
                requestAnimationFrame(run);
                obs.disconnect();
            }
        }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [target]);
    return <span ref={spanRef}>{n}{suffix}</span>;
};

export const ExperienceSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);

    useEffect(() => {
        const el = sectionRef.current; if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
            { threshold: 0.05 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const job = experienceData.experience[0];

    const techStack = [
        ...experienceData.skills.frontend,
        ...experienceData.skills.backend.slice(0, 2),
        ...experienceData.skills.databases,
        ...experienceData.skills.devops.slice(0, 1),
    ];

    return (
        <section
            id="experience"
            ref={sectionRef}
            style={{
                background: 'linear-gradient(150deg,#080c18 0%,#0a0820 50%,#060614 100%)',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                padding: '6rem 0',
            }}
        >
            <style>{`
                @keyframes exp-float-orb {
                    0%,100% { transform:translate(0,0) scale(1); }
                    50%      { transform:translate(20px,-25px) scale(1.08); }
                }
                @keyframes exp-shimmer {
                    0%   { background-position:-200% center; }
                    100% { background-position: 200% center; }
                }
                .exp-heading {
                    background: linear-gradient(100deg,#ffffff 0%,#c4b5fd 40%,#818cf8 70%,#38bdf8 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: exp-shimmer 6s linear infinite;
                }
                @keyframes exp-line-grow {
                    from { transform:scaleX(0); }
                    to   { transform:scaleX(1); }
                }
                @keyframes exp-pulse-dot {
                    0%,100% { box-shadow:0 0 0 0 rgba(16,185,129,0.7); }
                    70%      { box-shadow:0 0 0 8px rgba(16,185,129,0); }
                }
                @media (max-width: 1024px) {
                    .exp-grid { grid-template-columns: 1fr !important; }
                    .exp-meta-side { margin-top: 2rem; }
                }
                @keyframes exp-slide-in {
                    from { opacity:0; transform:translateX(-24px); }
                    to   { opacity:1; transform:translateX(0); }
                }
                @keyframes exp-fade-up {
                    from { opacity:0; transform:translateY(20px); }
                    to   { opacity:1; transform:translateY(0); }
                }
                .exp-ach-row {
                    display:flex;
                    align-items:flex-start;
                    gap:1rem;
                    padding:1rem 1.25rem;
                    border-radius:0.75rem;
                    border:1px solid rgba(255,255,255,0.05);
                    transition: all 0.3s cubic-bezier(.22,1,.36,1);
                    cursor:default;
                }
                .exp-ach-row:hover {
                    background:rgba(129,140,248,0.07);
                    border-color:rgba(129,140,248,0.2);
                    transform:translateX(8px);
                }
                .exp-tech-pill {
                    padding:5px 13px;
                    border-radius:99px;
                    background:rgba(255,255,255,0.06);
                    border:1px solid rgba(255,255,255,0.1);
                    color:#94a3b8;
                    font-size:11px;
                    font-weight:600;
                    cursor:default;
                    transition:all 0.2s;
                    letter-spacing:0.02em;
                }
                .exp-tech-pill:hover {
                    background:rgba(99,102,241,0.15);
                    border-color:rgba(99,102,241,0.35);
                    color:#a78bfa;
                    transform:translateY(-2px);
                }
                @media (max-width: 900px) {
                    .exp-grid { grid-template-columns: 1fr !important; }
                    .exp-hero-text { font-size: 3rem !important; }
                }
            `}</style>

            {/* ── Animated gradient orbs ── */}
            <div aria-hidden style={{
                position:'absolute', top:'-10%', left:'-5%',
                width:550, height:500, borderRadius:'50%',
                background:'radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 65%)',
                filter:'blur(50px)',
                animation:'exp-float-orb 14s ease-in-out infinite',
                pointerEvents:'none',
            }}/>
            <div aria-hidden style={{
                position:'absolute', bottom:'5%', right:'0%',
                width:500, height:450, borderRadius:'50%',
                background:'radial-gradient(circle,rgba(14,165,233,0.1) 0%,transparent 65%)',
                filter:'blur(55px)',
                animation:'exp-float-orb 18s ease-in-out infinite reverse',
                pointerEvents:'none',
            }}/>

            {/* ── Subtle grid ── */}
            <div aria-hidden style={{
                position:'absolute', inset:0, pointerEvents:'none',
                backgroundImage:'linear-gradient(rgba(99,102,241,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.03) 1px,transparent 1px)',
                backgroundSize:'80px 80px',
            }}/>

            <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 2.5rem', position:'relative', zIndex:2 }}>

                {/* ── SECTION LABEL ── */}
                <div style={{
                    display:'flex', alignItems:'center', gap:'1rem',
                    marginBottom:'4rem',
                    opacity: vis ? 1 : 0,
                    transform: vis ? 'none' : 'translateY(16px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}>
                    <div style={{
                        display:'inline-flex', alignItems:'center', gap:8,
                        padding:'6px 16px', borderRadius:99,
                        background:'rgba(139,92,246,0.1)',
                        border:'1px solid rgba(139,92,246,0.3)',
                        color:'#a78bfa', fontSize:11, fontWeight:700,
                        letterSpacing:'0.14em', textTransform:'uppercase',
                    }}>
                        <span style={{
                            width:7, height:7, borderRadius:'50%',
                            background:'#a78bfa', display:'inline-block',
                        }}/>
                        Work Experience
                    </div>
                    <div style={{
                        flex:1, height:1,
                        background:'linear-gradient(90deg,rgba(139,92,246,0.4),transparent)',
                        transformOrigin:'left',
                        animation: vis ? 'exp-line-grow 1s 0.4s cubic-bezier(.22,1,.36,1) both' : 'none',
                    }}/>
                </div>

                {/* ── HERO TYPOGRAPHY ── */}
                <div style={{
                    marginBottom:'4rem',
                    opacity: vis ? 1 : 0,
                    transform: vis ? 'none' : 'translateY(24px)',
                    transition: 'opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease',
                }}>
                    <h2
                        className="exp-hero-text"
                        style={{
                            fontSize:'clamp(2.5rem, 8vw, 5.5rem)',
                            fontWeight:900,
                            lineHeight:1.1,
                            letterSpacing:'-0.03em',
                            margin:0,
                            color:'#ffffff',
                        }}
                    >
                        Building real
                        <br/>
                        <span className="exp-heading">government</span>
                        <br/>
                        products.
                    </h2>
                    <p style={{
                        color:'#94a3b8', fontSize:'1.1rem',
                        marginTop:'1.5rem', maxWidth:480, lineHeight:1.7,
                    }}>
                        {job.title} at <strong style={{color:'#c4b5fd'}}>{job.company}</strong> — crafting scalable web applications for enterprise and public-sector clients.
                    </p>
                </div>

                {/* ── MAIN GRID ── */}
                <div
                    className="exp-grid"
                    style={{
                        display:'grid',
                        gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))',
                        gap:'3rem',
                        alignItems:'start',
                    }}
                >
                    {/* LEFT: Achievements */}
                    <div>
                        {/* Role meta */}
                        <div style={{
                            display:'flex', flexWrap:'wrap', gap:'0.6rem',
                            marginBottom:'2rem',
                            opacity: vis ? 1 : 0,
                            transition:'opacity 0.6s 0.2s ease',
                        }}>
                            <div style={{
                                display:'inline-flex', alignItems:'center', gap:6,
                                padding:'6px 14px', borderRadius:99,
                                background:'rgba(16,185,129,0.1)',
                                border:'1px solid rgba(16,185,129,0.25)',
                                color:'#34d399', fontSize:12, fontWeight:600,
                            }}>
                                <span style={{
                                    width:8, height:8, borderRadius:'50%',
                                    background:'#10b981', display:'inline-block',
                                    animation:'exp-pulse-dot 2s ease-in-out infinite',
                                }}/>
                                Active · {job.period}
                            </div>
                            <div style={{
                                display:'inline-flex', alignItems:'center', gap:6,
                                padding:'6px 14px', borderRadius:99,
                                background:'rgba(255,255,255,0.05)',
                                border:'1px solid rgba(255,255,255,0.1)',
                                color:'#94a3b8', fontSize:12, fontWeight:600,
                            }}>
                                <MapPin size={12} style={{color:'#818cf8'}}/>
                                {job.location}
                            </div>
                        </div>

                        {/* Achievement list */}
                        <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                            {job.achievements.map((ach, idx) => (
                                <div
                                    key={idx}
                                    className="exp-ach-row"
                                    style={{
                                        opacity: vis ? 1 : 0,
                                        transform: vis ? 'none' : 'translateX(-24px)',
                                        transition:`opacity 0.55s ${0.25 + idx*0.07}s ease, transform 0.55s ${0.25+idx*0.07}s ease`,
                                    }}
                                >
                                    <div style={{
                                        minWidth:28, height:28, borderRadius:'0.5rem',
                                        background:'rgba(129,140,248,0.12)',
                                        border:'1px solid rgba(129,140,248,0.2)',
                                        display:'flex', alignItems:'center', justifyContent:'center',
                                        fontSize:11, fontWeight:800, color:'#818cf8',
                                        flexShrink:0,
                                    }}>
                                        {String(idx+1).padStart(2,'0')}
                                    </div>
                                    <div style={{display:'flex', alignItems:'flex-start', gap:8, flex:1}}>
                                        <ArrowRight size={13} style={{color:'#6366f1', flexShrink:0, marginTop:3}}/>
                                        <p style={{color:'#cbd5e1', fontSize:'0.88rem', lineHeight:1.7, margin:0}}>{ach}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Info card */}
                    <div style={{
                        opacity: vis ? 1 : 0,
                        transform: vis ? 'none' : 'translateY(28px)',
                        transition:'opacity 0.7s 0.3s ease, transform 0.7s 0.3s ease',
                    }}>
                        {/* Stats */}
                        <div style={{
                            display:'grid', gridTemplateColumns:'1fr 1fr',
                            gap:'1rem', marginBottom:'1.5rem',
                        }}>
                            {[
                                { value: 3, suffix: '+', label: 'Shipped Projects', color: '#818cf8' },
                                { value: 5, suffix: '+', label: 'Team Members',     color: '#38bdf8' },
                            ].map(s => (
                                <div key={s.label} style={{
                                    padding:'1.4rem 1.25rem',
                                    borderRadius:'1rem',
                                    background:'rgba(255,255,255,0.04)',
                                    border:'1px solid rgba(255,255,255,0.08)',
                                    textAlign:'center',
                                }}>
                                    <div style={{
                                        fontSize:'2.5rem', fontWeight:900,
                                        color:s.color, lineHeight:1,
                                        letterSpacing:'-0.04em',
                                        textShadow:`0 0 30px ${s.color}55`,
                                    }}>
                                        <Counter target={s.value} suffix={s.suffix}/>
                                    </div>
                                    <div style={{
                                        fontSize:11, fontWeight:600,
                                        color:'#64748b', marginTop:6,
                                        letterSpacing:'0.08em', textTransform:'uppercase',
                                    }}>
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stack card */}
                        <div style={{
                            padding:'1.5rem',
                            borderRadius:'1.25rem',
                            background:'rgba(255,255,255,0.03)',
                            border:'1px solid rgba(129,140,248,0.2)',
                            position:'relative', overflow:'hidden',
                        }}>
                            {/* Top gradient line */}
                            <div style={{
                                position:'absolute', top:0, left:0, right:0, height:2,
                                background:'linear-gradient(90deg,#6366f1,#0ea5e9,#10b981)',
                                borderRadius:'1.25rem 1.25rem 0 0',
                            }}/>

                            <div style={{
                                display:'flex', alignItems:'center', gap:8,
                                marginBottom:'1.1rem',
                            }}>
                                <Zap size={15} style={{color:'#f59e0b'}}/>
                                <span style={{
                                    fontSize:10, fontWeight:700, color:'#64748b',
                                    letterSpacing:'0.14em', textTransform:'uppercase',
                                }}>
                                    Tech Stack
                                </span>
                            </div>

                            <div style={{display:'flex', flexWrap:'wrap', gap:'0.45rem'}}>
                                {techStack.map((t, i) => (
                                    <span key={i} className="exp-tech-pill">{t}</span>
                                ))}
                            </div>

                            {/* Divider */}
                            <div style={{height:1, background:'rgba(255,255,255,0.06)', margin:'1.25rem 0'}}/>

                            {/* Company name */}
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <div>
                                    <p style={{fontSize:13, fontWeight:700, color:'#e2e8f0', margin:0}}>{job.company}</p>
                                    <p style={{fontSize:11, color:'#475569', margin:'2px 0 0', fontWeight:500}}>{job.title}</p>
                                </div>
                                <div style={{
                                    display:'flex', alignItems:'center', gap:5,
                                    padding:'4px 10px', borderRadius:99,
                                    background:'rgba(16,185,129,0.1)',
                                    border:'1px solid rgba(16,185,129,0.2)',
                                    color:'#34d399', fontSize:10, fontWeight:700,
                                }}>
                                    <Calendar size={9}/>
                                    {job.period.split('–')[0].trim()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
