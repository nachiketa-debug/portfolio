import { GlassCard } from './GlassCard';
import { experienceData } from '../data/portfolioData';

export const CertificationsCard = () => {
    const scrollToCertifications = () => {
        document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <GlassCard position={[4.5, -1, 0]} width="w-[32rem]">
            <div onClick={scrollToCertifications} className="cursor-pointer">
                <div className="text-xl opacity-50 mb-6 uppercase tracking-wider">Certifications</div>
                <div className="space-y-5">
                    {experienceData.certifications.map((cert) => (
                        <div key={cert.name} className="flex justify-between items-center">
                            <span className="text-base font-medium">{cert.provider}</span>
                            <span className="text-base opacity-50">{cert.year}</span>
                        </div>
                    ))}
                </div>
            </div>
        </GlassCard>
    );
};
