import { GlassCard } from './GlassCard';
import { experienceData } from '../data/portfolioData';

export const EducationCard = () => {
    const scrollToEducation = () => {
        document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
    };

    const mainEducation = experienceData.education[0];

    return (
        <GlassCard position={[-6.5, -3.7, 0]} width="w-[30rem]">
            <div onClick={scrollToEducation} className="cursor-pointer">
                <div className="text-xl opacity-50 mb-5 uppercase tracking-wider">Education</div>
                <div className="text-3xl font-bold mb-3">{mainEducation.field}</div>
                <div className="text-lg opacity-60 mb-2">{mainEducation.degree}</div>
                <div className="text-base opacity-50">{mainEducation.institution}</div>
            </div>
        </GlassCard>
    );
};
