
import { useRef } from "react";
import { Float, Environment, useTexture } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { ProjectsCard } from './ProjectsCard';
import { AchievementsCard } from './AchievementsCard';
import { EducationCard } from './EducationCard';
import { SkillsCard } from './SkillsCard';
import { ContactCard } from './ContactCard';
import { HeroImage } from './HeroImage';

export const Scene = () => {
    const texture = useTexture("/hero.png");
    const { viewport } = useThree();
    const isMobile = viewport.width < 7.5;
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        if (isMobile) {
            // On mobile: keep image locked at center, no parallax drift
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.08);
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.08);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.08);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.08);
        } else {
            const { x, y } = state.mouse;
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x * 0.5, 0.05);
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y * 0.5, 0.05);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.05, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.05, 0.05);
        }
    });

    return (
        <>
            <Environment preset="apartment" />
            <ambientLight intensity={1.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />

            {/* Floating cards - desktop only (cards overlap image on mobile even at small scale) */}
            {!isMobile && (
                <Float speed={4} rotationIntensity={0.3} floatIntensity={0.5}>
                    <ProjectsCard />
                    <AchievementsCard />
                    <EducationCard />
                    <SkillsCard />
                    <ContactCard />
                </Float>
            )}

            {/* Image centered, no parallax on mobile */}
            <Float speed={2} rotationIntensity={0.15} floatIntensity={0.4}>
                <group ref={groupRef} scale={isMobile ? 1.0 : 1} position={[0, 0, 0]}>
                    <HeroImage texture={texture} />
                </group>
            </Float>

            {/* Subtle Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
                <planeGeometry args={[40, 40]} />
                <meshStandardMaterial color="#0a0a14" roughness={0.9} metalness={0.1} />
            </mesh>
        </>
    );
};
