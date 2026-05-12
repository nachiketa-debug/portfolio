import { GlassCard } from './GlassCard';
import { experienceData } from '../data/portfolioData';

export const AchievementsCard = () => {
    const scrollToSection = () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
    };

    const achievements = experienceData.experience[0].achievements.slice(0, 3);

    return (
        <GlassCard position={[-6.5, -1.2, 0]} width="w-[30rem]">
            <div onClick={scrollToSection} className="cursor-pointer">
                <div className="text-xl opacity-50 mb-6 uppercase tracking-wider">Key Achievements</div>
                <div className="space-y-5">
                    {achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                            <div className="w-4 h-4 rounded-full bg-blue-500 mt-1"></div>
                            <span className="text-base leading-relaxed">{achievement}</span>
                        </div>
                    ))}
                </div>
            </div>
        </GlassCard>
    );
};
