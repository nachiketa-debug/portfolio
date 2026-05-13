
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
    const isMobile = viewport.width < 7.5; // Threshold for mobile/tablet portrait
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const { x, y } = state.mouse;
        // Subtle parallax follow
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x * 0.5, 0.05);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, (y * 0.5) + (isMobile ? -0.5 : 0), 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.05, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.05, 0.05);
    });

    return (
        <>
            <Environment preset="apartment" />
            <ambientLight intensity={1.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />

            {/* Only show floating cards on Desktop */}
            {!isMobile && (
                <Float speed={4} rotationIntensity={0.3} floatIntensity={0.5}>
                    {/* Left Side Cards - moved further left */}
                    <ProjectsCard />
                    <AchievementsCard />
                    <EducationCard />

                    {/* Right Side Cards */}
                    <SkillsCard />
                    <ContactCard />
                </Float>
            )}

            {/* Image with its own unique animation */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <group ref={groupRef} scale={isMobile ? 0.85 : 1}>
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
