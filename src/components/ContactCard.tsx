import { Github, Linkedin, Mail } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { experienceData } from '../data/portfolioData';

export const ContactCard = () => {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <GlassCard position={[6.5, -1.5, 0]} width="w-[32rem]">
            <div onClick={scrollToContact} className="cursor-pointer">
                <div className="text-xl opacity-50 mb-6 uppercase tracking-wider">Let's Connect</div>
                <div className="flex gap-5">
                    <div className="flex-1 p-6 bg-gray-900/5 rounded-2xl hover:bg-gray-900/10 transition-all flex items-center justify-center">
                        <Github size={32} />
                    </div>
                    <div className="flex-1 p-6 bg-gray-900/5 rounded-2xl hover:bg-gray-900/10 transition-all flex items-center justify-center">
                        <Linkedin size={32} />
                    </div>
                    <div className="flex-1 p-6 bg-gray-900/5 rounded-2xl hover:bg-gray-900/10 transition-all flex items-center justify-center">
                        <Mail size={32} />
                    </div>
                </div>
                <div className="mt-6 text-center text-base opacity-60">{experienceData.email}</div>
            </div>
        </GlassCard>
    );
};
