import { Code2 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { experienceData } from '../data/portfolioData';

export const SkillsCard = () => {
    const scrollToSkills = () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    };


    const topSkills = [
        ...experienceData.skills.frontend.slice(0, 3),
        ...experienceData.skills.backend.slice(0, 2),
        ...experienceData.skills.devops.slice(0, 2)
    ];

    return (
        <GlassCard position={[4.5, 2.5, 0]} width="w-[32rem]">
            <div onClick={scrollToSkills} className="cursor-pointer">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="text-7xl font-bold mb-3">1+</div>
                        <div className="text-base opacity-50 uppercase tracking-wider">Years Experience</div>
                    </div>
                    <Code2 size={36} className="opacity-40" />
                </div>
                <div className="flex flex-wrap gap-3 mb-8">
                    {topSkills.map((skill) => (
                        <span key={skill} className="px-5 py-2 text-sm bg-gray-900/10 rounded-full border border-gray-900/20 font-medium">
                            {skill}
                        </span>
                    ))}
                </div>
                {/* Add certifications here */}
                <div className="pt-6 border-t border-gray-900/10">
                    <div className="text-sm opacity-50 mb-3 uppercase tracking-wider">Certifications</div>
                    <div className="flex flex-wrap gap-2">
                        {experienceData.certifications.map((cert) => (
                            <span key={cert.name} className="px-3 py-1.5 text-xs bg-yellow-100/50 rounded-full border border-yellow-200 font-medium">
                                {cert.provider}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </GlassCard>
    );
};
