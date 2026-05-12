import { useRef, useCallback } from 'react';

/**
 * useTilt – gives a card a CSS 3D tilt based on mouse position.
 * Usage:
 *   const { cardRef, onMouseMove, onMouseLeave } = useTilt();
 *   <div ref={cardRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ transformStyle: 'preserve-3d' }}>
 */
export const useTilt = (maxDeg = 12) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -maxDeg;
        const rotateY = ((x - cx) / cx) * maxDeg;
        el.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
        el.style.transition = 'transform 0.05s linear';
    }, [maxDeg]);

    const onMouseLeave = useCallback(() => {
        const el = cardRef.current;
        if (!el) return;
        el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        el.style.transition = 'transform 0.5s ease';
    }, []);

    return { cardRef, onMouseMove, onMouseLeave };
};
