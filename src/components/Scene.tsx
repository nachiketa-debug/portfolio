import { Float, Environment, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
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
            <Float speed={2.5} rotationIntensity={isMobile ? 0.05 : 0.15} floatIntensity={isMobile ? 0.2 : 0.35}>
                <group scale={isMobile ? 0.85 : 1} position={[0, isMobile ? -0.5 : 0, 0]}>
                    <HeroImage texture={texture} />
                </group>
            </Float>

            {/* Subtle Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
                <planeGeometry args={[40, 40]} />
                <meshStandardMaterial color="#d4d4d4" roughness={0.8} metalness={0.1} />
            </mesh>
        </>
    );
};
