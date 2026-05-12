import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export const CustomLoader = () => {
    const { progress } = useProgress();
    const [visible, setVisible] = useState(true);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        if (progress === 100) {
            // Short delay so the 100% flash is visible
            const t1 = setTimeout(() => setFading(true), 400);
            const t2 = setTimeout(() => setVisible(false), 1100);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        }
    }, [progress]);

    if (!visible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                opacity: fading ? 0 : 1,
                transition: 'opacity 0.7s ease',
                pointerEvents: fading ? 'none' : 'all',
            }}
        >
            <style>{`
                @keyframes spin-arc {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes counter-spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(-360deg); }
                }
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.7; }
                    50%       { opacity: 1; }
                }
                .loader-arc { animation: spin-arc 1.4s linear infinite; }
                .loader-inner-arc { animation: counter-spin 2s linear infinite; }
                .loader-text { animation: pulse-glow 1.8s ease-in-out infinite; }
            `}</style>

            {/* Outer spinning arc */}
            <div style={{ position: 'relative', width: 180, height: 180 }}>
                {/* Spinning SVG arc */}
                <svg
                    className="loader-arc"
                    viewBox="0 0 180 180"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                >
                    <circle
                        cx="90" cy="90" r="78"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray="220 280"
                        strokeDashoffset="0"
                    />
                </svg>

                {/* Counter-spinning inner arc */}
                <svg
                    className="loader-inner-arc"
                    viewBox="0 0 180 180"
                    style={{ position: 'absolute', inset: 12, width: 'calc(100% - 24px)', height: 'calc(100% - 24px)' }}
                >
                    <circle
                        cx="78" cy="78" r="66"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="100 320"
                        strokeDashoffset="0"
                    />
                </svg>

                {/* Center text */}
                <div
                    className="loader-text"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                    }}
                >
                    <span style={{ color: '#1e293b', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1.4 }}>
                        NACHIKETA
                    </span>
                    <span style={{ color: '#1e293b', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1.4 }}>
                        VERMA
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginTop: 28, width: 160, height: 2, background: 'rgba(0,0,0,0.1)', borderRadius: 99, overflow: 'hidden' }}>
                <div
                    style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, #3b82f6, #f59e0b)',
                        borderRadius: 99,
                        transition: 'width 0.3s ease',
                    }}
                />
            </div>
            <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: 11, marginTop: 10, letterSpacing: '0.1em' }}>
                {Math.round(progress)}%
            </span>
        </div>
    );
};
